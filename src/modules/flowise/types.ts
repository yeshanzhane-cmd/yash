/** A single node or agentflow graph, as produced by the Flowise visual builder. */
export type ChatflowType = 'CHATFLOW' | 'AGENTFLOW' | 'MULTIAGENT';

export interface FlowiseFlowData {
  nodes: unknown[];
  edges: unknown[];
  viewport?: Record<string, unknown>;
}

/** A Flowise agent as returned by the API. `flowData` is stored server-side as a JSON string. */
export interface Chatflow {
  id: string;
  name: string;
  flowData: string;
  deployed: boolean;
  isPublic: boolean;
  type: ChatflowType;
  category?: string;
  apikeyid?: string;
  createdDate: string;
  updatedDate: string;
}

export interface CreateChatflowInput {
  name: string;
  flowData: FlowiseFlowData;
  type?: ChatflowType;
  deployed?: boolean;
  isPublic?: boolean;
  category?: string;
}

export interface UpdateChatflowInput {
  name?: string;
  flowData?: FlowiseFlowData;
  deployed?: boolean;
  isPublic?: boolean;
  category?: string;
}

export interface ChatMessageHistoryEntry {
  role: 'apiMessage' | 'userMessage';
  content: string;
}

export interface PredictionRequest {
  question: string;
  overrideConfig?: Record<string, unknown>;
  history?: ChatMessageHistoryEntry[];
  sessionId?: string;
}

export interface PredictionResponse {
  text: string;
  question?: string;
  chatId?: string;
  sessionId?: string;
  sourceDocuments?: unknown[];
}
