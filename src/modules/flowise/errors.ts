/**
 * Raised whenever the Flowise API responds with a non-2xx status. Carries the
 * HTTP status and the parsed response body so callers can distinguish, e.g.,
 * a 404 (agent not found) from a 401 (bad API key) without string-matching.
 */
export class FlowiseApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(`Flowise API error (${status}): ${message}`);
    this.name = 'FlowiseApiError';
    this.status = status;
    this.body = body;
  }
}
