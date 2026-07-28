/**
 * Demonstrates the two things this module is for:
 *   1. Provisioning an agent (chatflow) in Flowise from a flowData export.
 *   2. Talking to it once deployed.
 *
 * flowData graphs are version-specific and normally authored visually, so
 * this script does not fabricate one. Build your agent in the Flowise UI,
 * use "Export Chatflow" to get its JSON, and point FLOW_DATA_PATH at it.
 *
 * Usage:
 *   FLOW_DATA_PATH=./my-agent.json npm run dev
 */
import { readFile } from 'node:fs/promises';
import { createFlowiseModule } from '../src/modules/flowise/index.js';
import type { FlowiseFlowData } from '../src/modules/flowise/types.js';

async function main(): Promise<void> {
  const flowDataPath = process.env.FLOW_DATA_PATH;
  if (!flowDataPath) {
    console.error(
      'Set FLOW_DATA_PATH to a chatflow JSON file exported from the Flowise UI ' +
        '(Chatflow -> ... menu -> Export Chatflow), then re-run: ' +
        'FLOW_DATA_PATH=./my-agent.json npm run dev',
    );
    process.exitCode = 1;
    return;
  }

  const flowData = JSON.parse(await readFile(flowDataPath, 'utf-8')) as FlowiseFlowData;
  const flowise = createFlowiseModule();

  const agent = await flowise.chatflows.create({
    name: 'Example Agent',
    flowData,
    deployed: true,
  });
  console.log(`Created agent "${agent.name}" (id: ${agent.id})`);

  const reply = await flowise.predictions.sendMessage(agent.id, {
    question: 'Hello! What can you help me with?',
  });
  console.log('Agent replied:', reply.text);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
