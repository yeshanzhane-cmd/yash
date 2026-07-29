export type OrbState = "idle" | "listening" | "thinking" | "speaking";

export type ConversationRole = "user" | "assistant";

export interface ConversationTurn {
  role: ConversationRole;
  text: string;
}
