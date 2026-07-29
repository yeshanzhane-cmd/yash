# Alpha X

A voice-first AI agent, in the spirit of JARVIS: talk to it, it listens, thinks, and talks back.

Pipeline: **browser microphone → Speech-to-Text → Claude → Text-to-Speech → speaker**.

## Architecture

```
alpha-x/
├── apps/
│   ├── web/      React + TypeScript frontend — the HUD interface, STT/TTS via the browser's
│   │              Web Speech API, talks to the backend over /api/chat
│   └── server/   Express + TypeScript backend — the only thing that holds your Claude API
│                  key; proxies conversation turns to Claude
```

The frontend never talks to Claude directly — your API key lives only in `apps/server/.env`,
never in browser-shipped code.

## Prerequisites

- Node.js 18+
- An Anthropic API key: https://console.anthropic.com/

## Setup

```bash
# 1. Install dependencies for both apps
npm install

# 2. Configure the backend
cp apps/server/.env.example apps/server/.env
# then edit apps/server/.env and set ANTHROPIC_API_KEY

# 3. Run both apps in dev mode
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:5173 (open this in your browser)

The frontend dev server proxies `/api/*` requests to the backend, so no CORS setup is
needed in development beyond what's already configured.

## Using Alpha X

1. Open http://localhost:5173 in a browser that supports the Web Speech API (Chrome/Edge
   have the best support; Firefox/Safari support varies).
2. Tap the mic button and grant microphone permission when prompted.
3. Speak — Alpha X transcribes what you say, sends it to Claude, and speaks the reply back.
4. Open Settings (gear icon) to pick a different system voice, mute spoken replies, or
   clear the conversation.

If your browser doesn't support `SpeechRecognition`, a text input appears automatically so
you can still chat with Alpha X by typing.

## Configuration

All backend configuration lives in `apps/server/.env` (see `.env.example`):

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | — | Your Claude API key. The server fails fast at startup if missing. |
| `PORT` | No | `3001` | Backend port |
| `CLAUDE_MODEL` | No | `claude-sonnet-5` | Model used for responses |
| `CORS_ORIGIN` | No | `http://localhost:5173` | Comma-separated list of origins allowed to call the API |

## Production build

```bash
npm run build
```

Builds the backend to `apps/server/dist` and the frontend to `apps/web/dist`. Serve the
backend behind your process manager of choice and the frontend's static build behind any
static file host / CDN, pointing `CORS_ORIGIN` at your deployed frontend's URL.

## Notes on this alpha

- **STT/TTS**: uses the browser's built-in Web Speech API for zero-setup, zero-cost voice
  I/O. Swap in Whisper (STT) or ElevenLabs (TTS) later for higher-quality voice — the
  `hooks/useSpeechRecognition.ts` and `hooks/useSpeechSynthesis.ts` boundaries in
  `apps/web/src/features/voice-assistant/` are where that swap would happen.
- **Rate limiting**: the backend caps requests per IP (30/min) as a default safeguard
  against runaway API costs — tune in `apps/server/src/server.ts`.
- **No auth, no persistence**: this alpha is a single-user personal tool. Conversation
  history lives only in memory in the browser tab.
