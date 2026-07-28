import { afterEach, describe, expect, it } from 'vitest';
import { loadFlowiseEnvConfig } from '../../src/config/env.js';

const ORIGINAL_ENV = { ...process.env };

describe('loadFlowiseEnvConfig', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns trimmed base URL and API key when both are set', () => {
    process.env.FLOWISE_BASE_URL = 'https://flowise.example.com/';
    process.env.FLOWISE_API_KEY = 'secret-key';

    expect(loadFlowiseEnvConfig()).toEqual({
      baseUrl: 'https://flowise.example.com',
      apiKey: 'secret-key',
    });
  });

  it('throws when FLOWISE_BASE_URL is missing', () => {
    delete process.env.FLOWISE_BASE_URL;
    process.env.FLOWISE_API_KEY = 'secret-key';

    expect(() => loadFlowiseEnvConfig()).toThrow(/FLOWISE_BASE_URL/);
  });

  it('throws when FLOWISE_BASE_URL has no protocol', () => {
    process.env.FLOWISE_BASE_URL = 'flowise.example.com';
    process.env.FLOWISE_API_KEY = 'secret-key';

    expect(() => loadFlowiseEnvConfig()).toThrow(/http/);
  });

  it('throws when FLOWISE_API_KEY is missing', () => {
    process.env.FLOWISE_BASE_URL = 'https://flowise.example.com';
    delete process.env.FLOWISE_API_KEY;

    expect(() => loadFlowiseEnvConfig()).toThrow(/FLOWISE_API_KEY/);
  });
});
