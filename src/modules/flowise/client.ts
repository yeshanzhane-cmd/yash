import type { FlowiseEnvConfig } from '../../config/env.js';
import { FlowiseApiError } from './errors.js';

/**
 * Thin authenticated HTTP client for the Flowise REST API. Holds no business
 * logic — that lives in the service classes that use it.
 */
export class FlowiseClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(config: FlowiseEnvConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });

    const rawText = await response.text();
    const parsedBody = rawText.length > 0 ? safeJsonParse(rawText) : undefined;

    if (!response.ok) {
      const message =
        (parsedBody && typeof parsedBody === 'object' && 'message' in parsedBody
          ? String((parsedBody as { message: unknown }).message)
          : undefined) ?? response.statusText;
      throw new FlowiseApiError(response.status, message, parsedBody);
    }

    return parsedBody as T;
  }
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
