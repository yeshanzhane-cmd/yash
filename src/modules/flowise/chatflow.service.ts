import type { FlowiseClient } from './client.js';
import type { Chatflow, CreateChatflowInput, UpdateChatflowInput } from './types.js';

const BASE_PATH = '/api/v1/chatflows';

/**
 * Provisioning API for Flowise agents (chatflows/agentflows). Lets you define
 * an agent's flow graph in code (or import one exported from the Flowise UI)
 * and push/promote/tear it down across environments instead of clicking
 * through the visual builder each time.
 */
export class ChatflowService {
  constructor(private readonly client: FlowiseClient) {}

  list(): Promise<Chatflow[]> {
    return this.client.get<Chatflow[]>(BASE_PATH);
  }

  get(chatflowId: string): Promise<Chatflow> {
    return this.client.get<Chatflow>(`${BASE_PATH}/${chatflowId}`);
  }

  create(input: CreateChatflowInput): Promise<Chatflow> {
    return this.client.post<Chatflow>(BASE_PATH, {
      name: input.name,
      flowData: JSON.stringify(input.flowData),
      type: input.type ?? 'CHATFLOW',
      deployed: input.deployed ?? false,
      isPublic: input.isPublic ?? false,
      category: input.category,
    });
  }

  update(chatflowId: string, input: UpdateChatflowInput): Promise<Chatflow> {
    return this.client.put<Chatflow>(`${BASE_PATH}/${chatflowId}`, {
      ...input,
      flowData: input.flowData ? JSON.stringify(input.flowData) : undefined,
    });
  }

  delete(chatflowId: string): Promise<void> {
    return this.client.delete<void>(`${BASE_PATH}/${chatflowId}`);
  }

  deploy(chatflowId: string): Promise<Chatflow> {
    return this.update(chatflowId, { deployed: true });
  }

  undeploy(chatflowId: string): Promise<Chatflow> {
    return this.update(chatflowId, { deployed: false });
  }
}
