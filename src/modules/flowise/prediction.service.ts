import type { FlowiseClient } from './client.js';
import type { PredictionRequest, PredictionResponse } from './types.js';

/**
 * Runtime API for talking to a deployed Flowise agent — the equivalent of
 * sending a message in the Flowise chat widget, but from your own backend.
 */
export class PredictionService {
  constructor(private readonly client: FlowiseClient) {}

  sendMessage(chatflowId: string, request: PredictionRequest): Promise<PredictionResponse> {
    return this.client.post<PredictionResponse>(`/api/v1/prediction/${chatflowId}`, request);
  }
}
