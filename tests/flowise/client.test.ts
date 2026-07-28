import { afterEach, describe, expect, it, vi } from 'vitest';
import { FlowiseClient } from '../../src/modules/flowise/client.js';
import { FlowiseApiError } from '../../src/modules/flowise/errors.js';

function mockFetchOnce(status: number, body: unknown): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      statusText: 'status text',
      text: async () => JSON.stringify(body),
    }),
  );
}

describe('FlowiseClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the API key as a bearer token and returns parsed JSON on success', async () => {
    mockFetchOnce(200, { id: 'abc123' });
    const client = new FlowiseClient({ baseUrl: 'https://flowise.example.com', apiKey: 'secret-key' });

    const result = await client.get<{ id: string }>('/api/v1/chatflows/abc123');

    expect(result).toEqual({ id: 'abc123' });
    expect(fetch).toHaveBeenCalledWith(
      'https://flowise.example.com/api/v1/chatflows/abc123',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ Authorization: 'Bearer secret-key' }),
      }),
    );
  });

  it('throws FlowiseApiError with status and parsed body on a non-2xx response', async () => {
    mockFetchOnce(404, { message: 'Chatflow not found' });
    const client = new FlowiseClient({ baseUrl: 'https://flowise.example.com', apiKey: 'secret-key' });

    await expect(client.get('/api/v1/chatflows/missing')).rejects.toMatchObject({
      name: 'FlowiseApiError',
      status: 404,
      message: expect.stringContaining('Chatflow not found'),
    } satisfies Partial<FlowiseApiError>);
  });

  it('serializes the request body as JSON for POST', async () => {
    mockFetchOnce(201, { id: 'new-id' });
    const client = new FlowiseClient({ baseUrl: 'https://flowise.example.com', apiKey: 'secret-key' });

    await client.post('/api/v1/chatflows', { name: 'My Agent' });

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: JSON.stringify({ name: 'My Agent' }) }),
    );
  });
});
