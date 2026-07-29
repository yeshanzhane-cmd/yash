import { ValidationError } from "../../middleware/errors";
import { askClaude } from "./claude.client";
import type { ChatRequestBody, ConversationTurn } from "./chat.types";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 20;

function validateBody(body: ChatRequestBody): {
  message: string;
  history: ConversationTurn[];
} {
  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    throw new ValidationError("message is required");
  }
  if (body.message.length > MAX_MESSAGE_LENGTH) {
    throw new ValidationError(`message must be under ${MAX_MESSAGE_LENGTH} characters`);
  }

  const history = Array.isArray(body.history) ? body.history : [];
  const validHistory = history.filter(
    (turn): turn is ConversationTurn =>
      (turn?.role === "user" || turn?.role === "assistant") &&
      typeof turn?.text === "string" &&
      turn.text.length <= MAX_MESSAGE_LENGTH
  );

  return {
    message: body.message.trim(),
    // Keep only the most recent turns — bounds both the request payload
    // and the tokens sent to Claude.
    history: validHistory.slice(-MAX_HISTORY_TURNS)
  };
}

// Application layer: orchestrates a single conversation turn. Owns no
// framework or LLM-vendor knowledge beyond calling the infrastructure client.
export async function handleChatTurn(body: ChatRequestBody): Promise<string> {
  const { message, history } = validateBody(body);
  return askClaude(history, message);
}
