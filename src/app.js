/* ════════════════════════════════════════════
   MAIN APPLICATION
   Video parallax, chat UI, state management, boot
════════════════════════════════════════════ */

/* ─── State ──────────────────────────────── */
const AppState = (() => {
  const state = {
    agentsDeployed: 0,
    commandsIssued: 0,
    sectionsActive: 0,
    chatOpen: true,
  };

  function incrementStat(key) {
    if (key in state) {
      state[key]++;
      const el = document.getElementById(key);
      if (el) {
        el.textContent = state[key];
        el.style.transform = 'scale(1.4)';
        el.style.color = '#ffaa44';
        setTimeout(() => {
          el.style.transform = 'scale(1)';
          el.style.color = '';
        }, 300);
      }
    }
  }

  function getStats() {
    return { ...state };
  }

  function reset() {
    state.agentsDeployed = 0;
    state.commandsIssued = 0;
    state.sectionsActive = 0;
    ['agentsDeployed', 'commandsIssued', 'sectionsActive'].forEach(key => {
      const el = document.getElementById(key);
      if (el) el.textContent = '0';
    });
  }

  return { incrementStat, getStats, reset };
})();

/* ─── Custom cursor ──────────────────────── */
function initCursor() {
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    document.documentElement.style.setProperty('--cx', cx + 'px');
    document.documentElement.style.setProperty('--cy', cy + 'px');
  });
}

/* ─── Hero video parallax ────────────────── */
function initParallax() {
  const video = document.getElementById('heroVideo');
  const heroContent = document.getElementById('heroContent');
  const heroTitle = document.getElementById('heroTitle');
  const heroSub = document.getElementById('heroSub');
  if (!video) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function raf() {
    requestAnimationFrame(raf);
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    // Video shifts opposite to mouse — 3D depth feel
    const vx = currentX * -14;
    const vy = currentY * -10;
    video.style.transform = `translate(${vx}px, ${vy}px) scale(1.12)`;

    // Content floats with mouse — subtle lift
    if (heroContent) {
      heroContent.style.transform = `translate(calc(-50% + ${currentX * 6}px), calc(-50% + ${currentY * 4}px))`;
    }
    if (heroTitle) {
      heroTitle.style.transform = `translate(${currentX * 10}px, ${currentY * 6}px)`;
    }
    if (heroSub) {
      heroSub.style.transform = `translate(${currentX * -4}px, ${currentY * -3}px)`;
    }
  }
  raf();
}

/* ─── Particle canvas (hero) ─────────────── */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.6 - 0.2,
    alpha: Math.random() * 0.5 + 0.1,
    life: Math.random(),
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life += 0.004;
      if (p.y < -10 || p.life > 1) {
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + 10;
        p.life = 0;
        p.alpha = Math.random() * 0.5 + 0.1;
      }
      const fade = Math.sin(p.life * Math.PI);
      ctx.globalAlpha = p.alpha * fade;
      ctx.fillStyle = Math.random() > 0.7 ? '#ff6b1a' : '#ffaa44';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ─── Scroll reveal ──────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.card, .section-header, .agent-roster, .ceo-desk, .ceo-info');
  els.forEach(el => el.classList.add('fade-in-up'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
}

/* ─── Video switching on section change ──── */
function initVideoSwitcher() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  const sources = ['videos/fire-to-flavor-1.mp4', 'videos/fire-to-flavor-2.mp4'];
  let current = 0;

  setInterval(() => {
    current = (current + 1) % sources.length;
    video.style.transition = 'opacity 1.2s ease';
    video.style.opacity = '0';
    setTimeout(() => {
      // Remove any <source> children so setting .src takes effect
      while (video.firstChild) video.removeChild(video.firstChild);
      video.src = sources[current];
      video.load();
      video.play().catch(() => {});
      video.style.opacity = '1';
    }, 1200);
  }, 18000);
}

/* ─── Chat UI ────────────────────────────── */
let isChatOpen = true;

function toggleChat() {
  const sidebar = document.getElementById('chatSidebar');
  isChatOpen = !isChatOpen;
  sidebar.classList.toggle('collapsed', !isChatOpen);
}

function openChat() {
  const sidebar = document.getElementById('chatSidebar');
  isChatOpen = true;
  sidebar.classList.remove('collapsed');
  document.getElementById('chatInput').focus();
}

function clearChat() {
  const messages = document.getElementById('chatMessages');
  messages.innerHTML = '';
  appendSystemMessage('Chat cleared. Command Center ready for new directives.');
}

function fillCommand(text) {
  const input = document.getElementById('chatInput');
  input.value = text;
  input.focus();
  autoResize(input);
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function handleInputKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendCommand();
  }
}

async function sendCommand() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';

  appendUserMessage(text);
  showTypingIndicator();

  // Simulate processing delay for dramatic effect
  const delay = 600 + Math.random() * 600;

  setTimeout(() => {
    removeTypingIndicator();
    const result = CommandCenter.process(text);
    if (result) {
      if (result.response) {
        appendSystemMessage(formatResponse(result.response));
      }
      if (result.actions && result.actions.length > 0) {
        result.actions.forEach(action => {
          setTimeout(() => appendActionMessage(action), 400);
        });
      }
    }
  }, delay);
}

function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

function appendUserMessage(text) {
  const messages = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'message user-message';
  msg.innerHTML = `
    <div class="message-avatar user-avatar">YOU</div>
    <div class="message-content">
      <div class="message-label">COMMANDER</div>
      <div class="message-text">${escapeHtml(text)}</div>
    </div>
  `;
  messages.appendChild(msg);
  scrollMessages();
}

function appendSystemMessage(html) {
  const messages = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'message system-message';
  msg.innerHTML = `
    <div class="message-avatar system-avatar">⌘</div>
    <div class="message-content">
      <div class="message-label">COMMAND CENTER</div>
      <div class="message-text">${html}</div>
    </div>
  `;
  messages.appendChild(msg);
  scrollMessages();
}

function appendActionMessage(action) {
  const messages = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'message';
  const icon = getActionIcon(action.type);
  const label = getActionLabel(action);
  msg.innerHTML = `
    <div class="message-content" style="max-width:100%">
      <div class="action-message">
        <span class="action-icon">${icon}</span>
        <span>${label}</span>
      </div>
    </div>
  `;
  messages.appendChild(msg);
  scrollMessages();
}

function getActionIcon(type) {
  const icons = {
    summon: '🤖', summon_all: '🚀', return: '↩', return_all: '↩',
    unlock: '🔓', unlock_all: '🔓', navigate: '📍', status: '📊',
    help: '❓', reset: '↺',
  };
  return icons[type] || '⚡';
}

function getActionLabel(action) {
  const cfg = action.agent && AgentSystem.AGENT_CONFIG[action.agent];
  switch (action.type) {
    case 'summon': return `${cfg?.name || 'Agent'} → Walking to Command Center`;
    case 'summon_all': return 'All Leaders → Mobilizing to Command Center';
    case 'return': return `${cfg?.name || 'Agent'} → Returning to division`;
    case 'return_all': return 'All agents dismissed';
    case 'unlock': return `Section unlocked → ${action.section?.toUpperCase()}`;
    case 'unlock_all': return 'All sections activated';
    case 'navigate': return `Navigating → ${action.target}`;
    default: return 'Command executed';
  }
}

function showTypingIndicator() {
  const messages = document.getElementById('chatMessages');
  const indicator = document.createElement('div');
  indicator.className = 'message system-message';
  indicator.id = 'typingIndicator';
  indicator.innerHTML = `
    <div class="message-avatar system-avatar">⌘</div>
    <div class="message-content">
      <div class="message-label">COMMAND CENTER</div>
      <div class="message-text">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;
  messages.appendChild(indicator);
  scrollMessages();
}

function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function scrollMessages() {
  const messages = document.getElementById('chatMessages');
  messages.scrollTop = messages.scrollHeight;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ─── Monitor CEO monitor screen ─────────── */
function initCEOMonitor() {
  const screen = document.getElementById('ceoMonitorScreen');
  if (!screen) return;

  const messages = [
    'AWAITING DIRECTIVES',
    'ANALYZING MARKET DATA',
    'Q4 REVENUE: +127%',
    'ALL SYSTEMS OPERATIONAL',
    'AGENT NETWORK ACTIVE',
    'PROCESSING COMMANDS...',
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % messages.length;
    screen.innerHTML = `<span class="monitor-text">${messages[i]}</span>`;
  }, 4000);
}

/* ─── Boot sequence ──────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParallax();
  initParticles();
  initScrollReveal();
  initVideoSwitcher();
  initCEOMonitor();

  AgentSystem.init();
  AgentSystem.buildRoster();

  // Auto-play video
  const video = document.getElementById('heroVideo');
  if (video) {
    video.play().catch(() => {
      // Fallback if autoplay blocked — show gradient bg
      document.getElementById('hero').style.background =
        'linear-gradient(135deg, #0a0200 0%, #1a0800 50%, #080808 100%)';
    });
  }

  // Boot message sequence
  setTimeout(() => {
    appendSystemMessage(`System boot complete. <em>${new Date().toLocaleTimeString()}</em>`);
  }, 1200);

  setTimeout(() => {
    appendSystemMessage(`Tip: Try <em>"call design section leader to CEO office"</em> to see agents walk in.`);
  }, 3000);
});
