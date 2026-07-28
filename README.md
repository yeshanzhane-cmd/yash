# Flowise Agent Manager

Node.js/TypeScript module for creating and running AI agents on [Flowise](https://flowiseai.com) — a self-hosted (or cloud) platform for building LLM agents/chatflows visually and exposing them over a REST API.

This project does **not** replace the Flowise UI. You still design an agent's flow graph (LLM, tools, memory, etc.) visually in Flowise. This module lets you:

- **Provision**: push, update, deploy, or delete agents in a Flowise instance from code/CI, instead of only through the UI.
- **Run**: send messages to a deployed agent from your own backend.

## Prerequisite: a running Flowise instance

You need Flowise deployed somewhere reachable before any of this works. Quickest path (Docker):

```bash
docker run -d --name flowise -p 3000:3000 flowiseai/flowise
```

Then open `http://localhost:3000`, sign in, and create an API key under **Settings -> API Keys**.

See the [Flowise docs](https://docs.flowiseai.com/getting-started) for other deployment options (npm global install, Docker Compose, cloud).

## Setup

```bash
npm install
cp .env.example .env
# edit .env: set FLOWISE_BASE_URL and FLOWISE_API_KEY
```

## Usage

### Provisioning an agent

Design the agent in the Flowise UI, then export it: chatflow menu -> **Export Chatflow** -> save the JSON. Then:

```ts
import { createFlowiseModule } from './src/index.js';
import { readFile } from 'node:fs/promises';

const flowise = createFlowiseModule(); // reads FLOWISE_BASE_URL / FLOWISE_API_KEY from env
const flowData = JSON.parse(await readFile('./my-agent.json', 'utf-8'));

const agent = await flowise.chatflows.create({
  name: 'Support Agent',
  flowData,
  deployed: true,
});
```

Other provisioning operations:

```ts
await flowise.chatflows.list();
await flowise.chatflows.get(agent.id);
await flowise.chatflows.update(agent.id, { name: 'Support Agent v2' });
await flowise.chatflows.deploy(agent.id);
await flowise.chatflows.undeploy(agent.id);
await flowise.chatflows.delete(agent.id);
```

### Talking to a deployed agent

```ts
const reply = await flowise.predictions.sendMessage(agent.id, {
  question: 'What are your support hours?',
  sessionId: 'user-42', // keep for multi-turn memory, per Flowise's session handling
});

console.log(reply.text);
```

### Runnable example

```bash
FLOW_DATA_PATH=./my-agent.json npm run dev
```

Creates the agent from your exported flow, deploys it, and sends a test message. See `examples/create-and-chat.ts`.

## Project structure

```
src/
  config/
    env.ts               # loads/validates FLOWISE_BASE_URL, FLOWISE_API_KEY
  modules/
    flowise/
      client.ts           # authenticated HTTP client
      chatflow.service.ts  # provisioning: create/get/list/update/delete/deploy
      prediction.service.ts # runtime: sendMessage
      types.ts
      errors.ts
      index.ts             # createFlowiseModule() factory + public exports
  index.ts
examples/
  create-and-chat.ts
tests/
  flowise/
```

## Commands

```bash
npm run build      # compile src/ to dist/
npm run typecheck  # type-check src, examples, and tests
npm test           # run unit tests (vitest)
npm run lint        # eslint
npm run format      # prettier --write
```

## Security notes

- Never commit `.env` or a real Flowise API key. `.gitignore` already excludes `.env`.
- Rotate a Flowise API key immediately if it's ever pasted into chat, a ticket, or a log — treat it as compromised the moment it leaves your secret manager/`.env`.
- `FlowiseApiError` carries the HTTP status and parsed response body so callers can branch on e.g. 401 (bad key) vs 404 (unknown agent) without string-matching messages.
