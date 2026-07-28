export interface FlowiseEnvConfig {
  baseUrl: string;
  apiKey: string;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable "${name}". Set it in your .env file (see .env.example).`,
    );
  }
  return value.trim();
}

/**
 * Loads and validates Flowise connection settings at startup so misconfiguration
 * fails immediately instead of surfacing as an opaque HTTP error later.
 */
export function loadFlowiseEnvConfig(): FlowiseEnvConfig {
  const baseUrl = readRequiredEnv('FLOWISE_BASE_URL').replace(/\/+$/, '');
  const apiKey = readRequiredEnv('FLOWISE_API_KEY');

  if (!/^https?:\/\//.test(baseUrl)) {
    throw new Error(
      `FLOWISE_BASE_URL must start with http:// or https:// (got "${baseUrl}").`,
    );
  }

  return { baseUrl, apiKey };
}
