export type ConversationRole = "user" | "assistant";

export interface ConversationTurn {
  role: ConversationRole;
  text: string;
}

export interface ChatRequestBody {
  message: string;
  history?: ConversationTurn[];
}

export interface ChatResponseBody {
  reply: string;
}
