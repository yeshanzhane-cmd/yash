import "dotenv/config";

interface AppConfig {
  port: number;
  anthropicApiKey: string;
  claudeModel: string;
  corsOrigins: string[];
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and fill it in.`
    );
  }
  return value;
}

export const config: AppConfig = {
  port: Number(process.env.PORT ?? 3001),
  anthropicApiKey: requireEnv("ANTHROPIC_API_KEY"),
  claudeModel: process.env.CLAUDE_MODEL ?? "claude-sonnet-5",
  corsOrigins: (process.env.CORS_ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
};
