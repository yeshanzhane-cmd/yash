import { describe, expect, it, vi } from 'vitest';
import { PredictionService } from '../../src/modules/flowise/prediction.service.js';
import type { FlowiseClient } from '../../src/modules/flowise/client.js';

function createMockClient(): FlowiseClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as FlowiseClient;
}

describe('PredictionService', () => {
  it('posts the question to the chatflow-specific prediction endpoint', async () => {
    const client = createMockClient();
    vi.mocked(client.post).mockResolvedValue({ text: 'Hi there!' });
    const service = new PredictionService(client);

    const result = await service.sendMessage('agent-1', { question: 'Hello' });

    expect(client.post).toHaveBeenCalledWith('/api/v1/prediction/agent-1', { question: 'Hello' });
    expect(result).toEqual({ text: 'Hi there!' });
  });

  it('forwards session/history options unchanged', async () => {
    const client = createMockClient();
    vi.mocked(client.post).mockResolvedValue({ text: 'ok', sessionId: 'sess-1' });
    const service = new PredictionService(client);

    await service.sendMessage('agent-1', {
      question: 'Continue',
      sessionId: 'sess-1',
      history: [{ role: 'userMessage', content: 'Hello' }],
    });

    expect(client.post).toHaveBeenCalledWith('/api/v1/prediction/agent-1', {
      question: 'Continue',
      sessionId: 'sess-1',
      history: [{ role: 'userMessage', content: 'Hello' }],
    });
  });
});
