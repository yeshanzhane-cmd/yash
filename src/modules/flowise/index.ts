import { loadFlowiseEnvConfig, type FlowiseEnvConfig } from '../../config/env.js';
import { FlowiseClient } from './client.js';
import { ChatflowService } from './chatflow.service.js';
import { PredictionService } from './prediction.service.js';

export interface FlowiseModule {
  chatflows: ChatflowService;
  predictions: PredictionService;
}

/**
 * Builds the Flowise module (provisioning + runtime services) from explicit
 * config, or from FLOWISE_BASE_URL / FLOWISE_API_KEY env vars if no config
 * is passed.
 */
export function createFlowiseModule(config?: FlowiseEnvConfig): FlowiseModule {
  const client = new FlowiseClient(config ?? loadFlowiseEnvConfig());
  return {
    chatflows: new ChatflowService(client),
    predictions: new PredictionService(client),
  };
}

export { FlowiseClient } from './client.js';
export { ChatflowService } from './chatflow.service.js';
export { PredictionService } from './prediction.service.js';
export { FlowiseApiError } from './errors.js';
export * from './types.js';
