import type { ConversationTurn } from "../types";

export class ChatApiError extends Error {}

// The only module in the frontend allowed to know about the backend's
// HTTP contract. Never calls the Claude API directly — the API key must
// stay server-side.
export async function sendChatMessage(
  message: string,
  history: ConversationTurn[]
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history })
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ChatApiError(
      typeof body?.error === "string" ? body.error : `Request failed (${res.status})`
    );
  }

  const data = (await res.json()) as { reply: string };
  return data.reply;
}
