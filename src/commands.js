/* ════════════════════════════════════════════
   COMMAND CENTER — Natural Language Parser
   Parses user commands and triggers agent/section workflows
════════════════════════════════════════════ */

const CommandCenter = (() => {

  const SECTION_MAP = {
    design:    { id: 'section-design',    statusId: 'statusDesign',    agentKey: 'design'    },
    creative:  { id: 'section-design',    statusId: 'statusDesign',    agentKey: 'design'    },
    dev:       { id: 'section-dev',       statusId: 'statusDev',       agentKey: 'dev'       },
    development:{ id: 'section-dev',      statusId: 'statusDev',       agentKey: 'dev'       },
    engineering:{ id: 'section-dev',      statusId: 'statusDev',       agentKey: 'dev'       },
    marketing: { id: 'section-marketing', statusId: 'statusMarketing', agentKey: 'marketing' },
    growth:    { id: 'section-marketing', statusId: 'statusMarketing', agentKey: 'marketing' },
    ceo:       { id: 'section-ceo',       statusId: 'statusCEO',       agentKey: 'ceo'       },
    executive: { id: 'section-ceo',       statusId: 'statusCEO',       agentKey: 'ceo'       },
    office:    { id: 'section-ceo',       statusId: 'statusCEO',       agentKey: 'ceo'       },
  };

  const PATTERNS = [
    {
      regex: /\b(call|summon|bring|get|send for|dispatch|deploy)\b.*\b(design|creative)\b.*\b(leader|head|director|chief|agent)\b/i,
      action: 'summon', agent: 'design', destination: 'command',
      respond: (dest) => `**INITIATING** · Design Leader en route to ${dest === 'ceo' ? 'CEO Office' : 'Command Center'}. ETA ~30 seconds.`,
    },
    {
      regex: /\b(call|summon|bring|get|send for|dispatch|deploy)\b.*\b(dev|development|engineering|tech)\b.*\b(leader|head|director|chief|agent)\b/i,
      action: 'summon', agent: 'dev', destination: 'command',
      respond: (dest) => `**INITIATING** · Development Leader deploying to ${dest === 'ceo' ? 'CEO Office' : 'Command Center'}.`,
    },
    {
      regex: /\b(call|summon|bring|get|send for|dispatch|deploy)\b.*\b(marketing|growth|brand)\b.*\b(leader|head|director|chief|agent)\b/i,
      action: 'summon', agent: 'marketing', destination: 'command',
      respond: (dest) => `**INITIATING** · Marketing Leader mobilized. Heading to ${dest === 'ceo' ? 'CEO Office' : 'Command Center'}.`,
    },
    {
      regex: /\b(call|summon|bring|get|send for|dispatch|deploy)\b.*\b(ops|operations|operational)\b.*\b(leader|head|director|chief|agent)\b/i,
      action: 'summon', agent: 'ops', destination: 'command',
      respond: (dest) => `**INITIATING** · Operations Leader mobilized to ${dest === 'ceo' ? 'CEO Office' : 'Command Center'}.`,
    },
    {
      regex: /\b(call|summon|bring|get|send for|dispatch)\b.*\bceo\b/i,
      action: 'summon', agent: 'ceo', destination: 'ceo',
      respond: () => `**PRIORITY COMMAND** · CEO summoned to Command Center. All stations stand by.`,
    },
    {
      regex: /\b(open|activate|unlock|access|show)\b.*\bceo\b.*\b(office|room|suite)\b/i,
      action: 'unlock', section: 'ceo',
      respond: () => `**ACCESS GRANTED** · CEO Office unlocked. Executive floor is now accessible.`,
    },
    {
      regex: /\b(open|activate|unlock|access|show)\b.*\b(ceo|executive)\b/i,
      action: 'unlock', section: 'ceo',
      respond: () => `**ACCESS GRANTED** · CEO Office activated.`,
    },
    {
      regex: /\b(activate|unlock|open|show|reveal|deploy)\b.*\b(design|creative)\b.*\b(section|division|department|unit)\b/i,
      action: 'unlock', section: 'design',
      respond: () => `**SECTION ACTIVATED** · Design Division is now online. Creative intelligence engaged.`,
    },
    {
      regex: /\b(activate|unlock|open|show|reveal|deploy)\b.*\b(dev|development|engineering)\b.*\b(section|division|department|unit)\b/i,
      action: 'unlock', section: 'dev',
      respond: () => `**SECTION ACTIVATED** · Development Division online. Engineering excellence deployed.`,
    },
    {
      regex: /\b(activate|unlock|open|show|reveal|deploy)\b.*\b(marketing|growth|brand)\b.*\b(section|division|department|unit)\b/i,
      action: 'unlock', section: 'marketing',
      respond: () => `**SECTION ACTIVATED** · Marketing Division online. Growth engines engaged.`,
    },
    {
      regex: /\b(activate|unlock|show|deploy)\b.*\ball\b.*\b(section|division|department|unit)s?\b/i,
      action: 'unlock_all',
      respond: () => `**FULL DEPLOYMENT** · All divisions activated simultaneously. Complete operational readiness achieved.`,
    },
    {
      regex: /\ball\b.*\b(agent|leader|head)s?\b.*\b(to|command|center|meeting|briefing)\b/i,
      action: 'summon_all', destination: 'command',
      respond: () => `**MASS MOBILIZATION** · All division leaders summoned to Command Center. Initiating full team briefing.`,
    },
    {
      regex: /\b(call|summon)\b.*\ball\b.*\b(to|ceo|office)\b/i,
      action: 'summon_all', destination: 'ceo',
      respond: () => `**EXECUTIVE BRIEFING** · All leaders summoned to CEO Office. Board meeting initiated.`,
    },
    {
      regex: /\b(return|send back|dismiss|stand down|release)\b.*\b(design|creative)\b/i,
      action: 'return', agent: 'design',
      respond: () => `**DISMISSED** · Design Leader returning to Design Division.`,
    },
    {
      regex: /\b(return|send back|dismiss|stand down|release)\b.*\b(dev|development)\b/i,
      action: 'return', agent: 'dev',
      respond: () => `**DISMISSED** · Development Leader returning to station.`,
    },
    {
      regex: /\b(return|send back|dismiss|stand down|release)\b.*\ball\b/i,
      action: 'return_all',
      respond: () => `**ALL DISMISSED** · All agents returning to their divisions. Command Center cleared.`,
    },
    {
      regex: /\b(scroll|go|navigate|take me)\b.*\b(command|center|room)\b/i,
      action: 'navigate', target: 'command-room',
      respond: () => `**NAVIGATING** · Scrolling to Command Room.`,
    },
    {
      regex: /\b(status|report|briefing|overview|dashboard)\b/i,
      action: 'status',
      respond: () => null,
    },
    {
      regex: /\b(help|what can you do|commands|options|available)\b/i,
      action: 'help',
      respond: () => null,
    },
    {
      regex: /\b(reset|clear|restart|new session)\b/i,
      action: 'reset',
      respond: () => `**RESET** · All agents dismissed. All sections locked. Starting fresh.`,
    },
  ];

  // Check if destination is CEO office in the full command text
  function extractDestination(text) {
    if (/\b(ceo|executive|office|headquarters|hq)\b/i.test(text)) return 'ceo';
    return 'command';
  }

  function process(rawText) {
    const text = rawText.trim();
    if (!text) return null;

    for (const pattern of PATTERNS) {
      if (pattern.regex.test(text)) {
        const dest = extractDestination(text);
        const response = pattern.respond ? pattern.respond(dest) : null;
        return execute({ ...pattern, destination: dest, response, rawText: text });
      }
    }

    // Fallback: try to detect agent mentions
    const agentMentions = detectAgentMentions(text);
    if (agentMentions.length > 0) {
      const dest = extractDestination(text);
      agentMentions.forEach(key => AgentSystem.summonAgent(key, dest));
      return {
        response: `**PARTIAL COMMAND PARSED** · Summoning ${agentMentions.map(k => AgentSystem.AGENT_CONFIG[k].name).join(', ')} to ${dest === 'ceo' ? 'CEO Office' : 'Command Center'}.`,
        actions: agentMentions.map(k => ({ type: 'summon', agent: k })),
      };
    }

    return {
      response: generateUnknownResponse(text),
      actions: [],
    };
  }

  function detectAgentMentions(text) {
    const found = [];
    const keywords = {
      design: /\b(design|creative|visual|art)\b/i,
      dev: /\b(dev|development|engineering|tech|code)\b/i,
      marketing: /\b(marketing|growth|brand|campaign)\b/i,
      ops: /\b(ops|operations|operational|logistics)\b/i,
      ceo: /\b(ceo|chief|executive|boss|founder)\b/i,
    };
    Object.entries(keywords).forEach(([key, rx]) => {
      if (rx.test(text)) found.push(key);
    });
    return found;
  }

  function execute(pattern) {
    const actions = [];
    const dest = pattern.destination || 'command';

    switch (pattern.action) {
      case 'summon':
        AgentSystem.summonAgent(pattern.agent, dest);
        AppState.incrementStat('commandsIssued');
        actions.push({ type: 'summon', agent: pattern.agent });
        if (dest === 'ceo') unlockSection('ceo');
        break;

      case 'summon_all':
        Object.keys(AgentSystem.AGENT_CONFIG).forEach(key => {
          AgentSystem.summonAgent(key, dest);
        });
        AppState.incrementStat('commandsIssued');
        actions.push({ type: 'summon_all' });
        break;

      case 'return':
        AgentSystem.returnAgent(pattern.agent);
        actions.push({ type: 'return', agent: pattern.agent });
        break;

      case 'return_all':
        Object.keys(AgentSystem.AGENT_CONFIG).forEach(key => AgentSystem.returnAgent(key));
        actions.push({ type: 'return_all' });
        break;

      case 'unlock':
        unlockSection(pattern.section);
        AppState.incrementStat('commandsIssued');
        actions.push({ type: 'unlock', section: pattern.section });
        break;

      case 'unlock_all':
        ['design', 'dev', 'marketing', 'ceo'].forEach(s => unlockSection(s));
        AppState.incrementStat('commandsIssued');
        actions.push({ type: 'unlock_all' });
        break;

      case 'navigate':
        scrollToSection(pattern.target);
        actions.push({ type: 'navigate', target: pattern.target });
        break;

      case 'status':
        return {
          response: generateStatusReport(),
          actions: [{ type: 'status' }],
        };

      case 'help':
        return {
          response: generateHelp(),
          actions: [{ type: 'help' }],
        };

      case 'reset':
        Object.keys(AgentSystem.AGENT_CONFIG).forEach(key => AgentSystem.returnAgent(key));
        ['design', 'dev', 'marketing', 'ceo'].forEach(s => lockSection(s));
        AppState.reset();
        actions.push({ type: 'reset' });
        break;
    }

    return { response: pattern.response, actions };
  }

  function unlockSection(key) {
    const map = SECTION_MAP[key] || Object.values(SECTION_MAP).find(m => m.agentKey === key);
    if (!map) return;
    const el = document.getElementById(map.id);
    if (!el) return;
    el.classList.add('unlocking');
    setTimeout(() => {
      el.classList.remove('locked', 'unlocking');
      el.classList.add('unlocked');
    }, 800);
    // Activate status bar indicator
    const statusEl = document.getElementById(map.statusId);
    if (statusEl) statusEl.classList.add('active');
    AppState.incrementStat('sectionsActive');
  }

  function lockSection(key) {
    const map = SECTION_MAP[key] || Object.values(SECTION_MAP).find(m => m.agentKey === key);
    if (!map) return;
    const el = document.getElementById(map.id);
    if (el) {
      el.classList.remove('unlocked', 'unlocking');
      el.classList.add('locked');
    }
    const statusEl = document.getElementById(map.statusId);
    if (statusEl) statusEl.classList.remove('active');
  }

  function generateStatusReport() {
    const stats = AppState.getStats();
    return `**SYSTEM STATUS REPORT**\n\n` +
      `Agents Deployed: ${stats.agentsDeployed}\n` +
      `Commands Issued: ${stats.commandsIssued}\n` +
      `Sections Active: ${stats.sectionsActive}/4\n\n` +
      `All systems operational. Command Center is live.`;
  }

  function generateHelp() {
    return `**AVAILABLE COMMANDS**\n\n` +
      `**Summon agents:**\n` +
      `• "call design leader to command center"\n` +
      `• "summon dev leader to CEO office"\n` +
      `• "bring all leaders to command center"\n\n` +
      `**Unlock sections:**\n` +
      `• "activate design section"\n` +
      `• "activate all sections"\n` +
      `• "open CEO office"\n\n` +
      `**Control:**\n` +
      `• "dismiss all agents"\n` +
      `• "status report"\n` +
      `• "reset"`;
  }

  function generateUnknownResponse(text) {
    const suggestions = [
      `Command not recognized. Try: <em>"call design leader to command center"</em>`,
      `Unknown directive. Example: <em>"activate design section"</em>`,
      `Parsing failed. Did you mean: <em>"summon all leaders to CEO office"</em>?`,
      `Command unclear. Type <em>"help"</em> to see available commands.`,
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  function fillAndSend(text) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = text;
      window.sendCommand && window.sendCommand();
    }
  }

  return { process, fillAndSend };
})();
