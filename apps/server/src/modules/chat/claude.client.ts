import Anthropic from "@anthropic-ai/sdk";
import { config } from "../../config/env";
import { ExternalServiceError } from "../../middleware/errors";
import { ALPHA_X_SYSTEM_PROMPT } from "./persona";
import type { ConversationTurn } from "./chat.types";

const anthropic = new Anthropic({ apiKey: config.anthropicApiKey });

const MAX_RESPONSE_TOKENS = 512;

// Infrastructure layer: the only module allowed to know about the Claude
// API. Domain/application code talks to this function, never the SDK.
export async function askClaude(
  history: ConversationTurn[],
  message: string
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: config.claudeModel,
      max_tokens: MAX_RESPONSE_TOKENS,
      system: ALPHA_X_SYSTEM_PROMPT,
      messages: [
        ...history.map((turn) => ({
          role: turn.role,
          content: turn.text
        })),
        { role: "user" as const, content: message }
      ]
    });

    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new ExternalServiceError("Claude returned no text response");
    }
    return textBlock.text;
  } catch (err) {
    if (err instanceof ExternalServiceError) throw err;
    console.error("[claude.client] request failed", err);
    throw new ExternalServiceError("Alpha X's reasoning service is unavailable right now");
  }
}
