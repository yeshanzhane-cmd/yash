import { describe, expect, it, vi } from 'vitest';
import { ChatflowService } from '../../src/modules/flowise/chatflow.service.js';
import type { FlowiseClient } from '../../src/modules/flowise/client.js';
import type { Chatflow } from '../../src/modules/flowise/types.js';

function createMockClient(): FlowiseClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as FlowiseClient;
}

const sampleChatflow: Chatflow = {
  id: 'agent-1',
  name: 'Support Agent',
  flowData: '{"nodes":[],"edges":[]}',
  deployed: false,
  isPublic: false,
  type: 'CHATFLOW',
  createdDate: '2026-01-01T00:00:00.000Z',
  updatedDate: '2026-01-01T00:00:00.000Z',
};

describe('ChatflowService', () => {
  it('stringifies flowData and applies defaults on create', async () => {
    const client = createMockClient();
    vi.mocked(client.post).mockResolvedValue(sampleChatflow);
    const service = new ChatflowService(client);

    const result = await service.create({
      name: 'Support Agent',
      flowData: { nodes: [], edges: [] },
    });

    expect(client.post).toHaveBeenCalledWith('/api/v1/chatflows', {
      name: 'Support Agent',
      flowData: JSON.stringify({ nodes: [], edges: [] }),
      type: 'CHATFLOW',
      deployed: false,
      isPublic: false,
      category: undefined,
    });
    expect(result).toEqual(sampleChatflow);
  });

  it('lists chatflows via GET /api/v1/chatflows', async () => {
    const client = createMockClient();
    vi.mocked(client.get).mockResolvedValue([sampleChatflow]);
    const service = new ChatflowService(client);

    const result = await service.list();

    expect(client.get).toHaveBeenCalledWith('/api/v1/chatflows');
    expect(result).toEqual([sampleChatflow]);
  });

  it('deploy() updates only the deployed flag', async () => {
    const client = createMockClient();
    vi.mocked(client.put).mockResolvedValue({ ...sampleChatflow, deployed: true });
    const service = new ChatflowService(client);

    await service.deploy('agent-1');

    expect(client.put).toHaveBeenCalledWith('/api/v1/chatflows/agent-1', {
      deployed: true,
      flowData: undefined,
    });
  });

  it('delete() calls DELETE on the chatflow id', async () => {
    const client = createMockClient();
    vi.mocked(client.delete).mockResolvedValue(undefined);
    const service = new ChatflowService(client);

    await service.delete('agent-1');

    expect(client.delete).toHaveBeenCalledWith('/api/v1/chatflows/agent-1');
  });
});
