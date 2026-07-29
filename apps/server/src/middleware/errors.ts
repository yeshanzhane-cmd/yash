import type { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {
  readonly statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ExternalServiceError extends Error {
  readonly statusCode = 502;
  constructor(message: string) {
    super(message);
    this.name = "ExternalServiceError";
  }
}

function isKnownError(
  err: unknown
): err is ValidationError | ExternalServiceError {
  return err instanceof ValidationError || err instanceof ExternalServiceError;
}

// Centralized error handler: known errors return a safe message + correct
// status; anything unexpected is logged with context and hidden from the
// client to avoid leaking internals (per CLAUDE.md security standards).
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (isKnownError(err)) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error(
    `[unhandled-error] ${req.method} ${req.path}`,
    err instanceof Error ? err.stack : err
  );
  res.status(500).json({ error: "Internal server error" });
}
