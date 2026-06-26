/* ════════════════════════════════════════════
   THREE.JS AGENT SYSTEM
   3D humanoid agents that walk into the command center
════════════════════════════════════════════ */

const AgentSystem = (() => {
  let scene, camera, renderer;
  // Clock used manually — avoid getDelta+getElapsedTime double-call bug
  let previousTime = 0;
  let startTime = 0;

  const agents = {};

  // Direct references to animated scene objects (avoid per-frame children scan)
  let holoMesh = null;
  let fireLight = null;
  const rimLights = {};

  const SEAT_POSITIONS = {
    design:    { x: -3,   y: 0, z: -2 },
    dev:       { x:  3,   y: 0, z: -2 },
    marketing: { x: -2.5, y: 0, z:  2.2 },
    ops:       { x:  2.5, y: 0, z:  2.2 },
    ceo:       { x:  0,   y: 0, z: -4 },
  };
  const SPAWN_POSITIONS = {
    design:    { x: -14, y: 0, z: 12 },
    dev:       { x:  14, y: 0, z: 12 },
    marketing: { x: -14, y: 0, z: 12 },
    ops:       { x:  14, y: 0, z: 12 },
    ceo:       { x:  0,  y: 0, z: 14 },
  };

  const AGENT_CONFIG = {
    design:    { name: 'Design Leader',    color: 0xa78bfa, accent: 0xddd6fe },
    dev:       { name: 'Dev Leader',       color: 0x34d399, accent: 0x6ee7b7 },
    marketing: { name: 'Marketing Leader', color: 0x60a5fa, accent: 0x93c5fd },
    ops:       { name: 'Ops Leader',       color: 0xfbbf24, accent: 0xfde68a },
    ceo:       { name: 'CEO',              color: 0xff6b1a, accent: 0xffaa44 },
  };

  function now() {
    return performance.now() / 1000;
  }

  function init() {
    const canvas = document.getElementById('agentCanvas');
    const container = document.getElementById('threeViewport');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030201);
    scene.fog = new THREE.FogExp2(0x030201, 0.04);

    const w = container.clientWidth || 800;
    const h = container.clientHeight || 500;
    camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 10, 14);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    buildScene();

    startTime = now();
    previousTime = startTime;
    animate();

    window.addEventListener('resize', () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      if (!w2 || !h2) return;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    });
  }

  function buildScene() {
    // Floor
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a0604, roughness: 0.9, metalness: 0.1 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.GridHelper(40, 40, 0x1a0a00, 0x0f0700));

    buildCommandTable();

    scene.add(new THREE.AmbientLight(0x110806, 2));

    const sun = new THREE.DirectionalLight(0xfff0e0, 1.5);
    sun.position.set(5, 12, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -15;
    sun.shadow.camera.right = 15;
    sun.shadow.camera.top = 15;
    sun.shadow.camera.bottom = -15;
    scene.add(sun);

    // Fire accent light — store reference for animation
    fireLight = new THREE.PointLight(0xff6b1a, 3, 15);
    fireLight.position.set(0, 4, 0);
    scene.add(fireLight);

    // Per-seat rim lights — store in map for O(1) access
    Object.entries(SEAT_POSITIONS).forEach(([key, pos]) => {
      const cfg = AGENT_CONFIG[key];
      const light = new THREE.PointLight(cfg.color, 0, 6);
      light.position.set(pos.x, 3, pos.z);
      scene.add(light);
      rimLights[key] = light;
    });

    Object.keys(AGENT_CONFIG).forEach(key => createAgent(key));
  }

  function buildCommandTable() {
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1a0a00, roughness: 0.3, metalness: 0.8,
      emissive: 0x220800, emissiveIntensity: 0.5,
    });
    const table = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.15, 6), tableMat);
    table.position.y = 0.9;
    table.castShadow = true;
    table.receiveShadow = true;
    scene.add(table);

    // Glowing rim
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xff6b1a, emissive: 0xff6b1a, emissiveIntensity: 2 });
    const rim = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.04, 8, 6), rimMat);
    rim.position.y = 0.97;
    rim.rotation.x = Math.PI / 2;
    scene.add(rim);

    // Holographic column
    const colMat = new THREE.MeshStandardMaterial({
      color: 0xff6b1a, emissive: 0xff8c42, emissiveIntensity: 3,
      transparent: true, opacity: 0.7,
    });
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3, 8), colMat);
    col.position.y = 2.4;
    scene.add(col);

    // Hologram — store reference
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0xff6b1a, emissive: 0xff6b1a, emissiveIntensity: 2,
      wireframe: true, transparent: true, opacity: 0.6,
    });
    holoMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 1), holoMat);
    holoMesh.position.y = 4;
    scene.add(holoMesh);

    // Chair pads at seats
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x1a0a00, roughness: 0.5, metalness: 0.5 });
    Object.values(SEAT_POSITIONS).forEach(pos => {
      const chair = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 0.6), chairMat);
      chair.position.set(pos.x, 0.5, pos.z);
      chair.receiveShadow = true;
      scene.add(chair);
    });
  }

  function createAgent(key) {
    const cfg = AGENT_CONFIG[key];
    const spawn = SPAWN_POSITIONS[key];
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: cfg.color, roughness: 0.4, metalness: 0.6,
      emissive: cfg.color, emissiveIntensity: 0.15,
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 0.25), bodyMat);
    body.position.y = 0.9;
    body.castShadow = true;
    group.add(body);

    const headMat = new THREE.MeshStandardMaterial({
      color: cfg.accent, roughness: 0.3, metalness: 0.7,
      emissive: cfg.accent, emissiveIntensity: 0.3,
    });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), headMat);
    head.position.y = 1.5;
    head.castShadow = true;
    group.add(head);

    // Glowing eyes
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 3 });
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), eyeMat);
    eyeL.position.set(-0.07, 1.52, 0.16);
    group.add(eyeL);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.07;
    group.add(eyeR);

    // Arms
    const armMat = bodyMat.clone();
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), armMat);
    armL.position.set(-0.35, 0.85, 0);
    armL.castShadow = true;
    group.add(armL);
    const armR = armL.clone();
    armR.position.x = 0.35;
    group.add(armR);

    // Legs
    const legMat = bodyMat.clone();
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.7, 0.18), legMat);
    legL.position.set(-0.14, 0.35, 0);
    legL.castShadow = true;
    group.add(legL);
    const legR = legL.clone();
    legR.position.x = 0.14;
    group.add(legR);

    // Badge ring
    const ringMat = new THREE.MeshStandardMaterial({ color: cfg.color, emissive: cfg.color, emissiveIntensity: 2 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.025, 8, 20), ringMat);
    ring.position.y = 2.0;
    group.add(ring);

    group.position.set(spawn.x, 0, spawn.z);
    group.visible = false;

    group._key = key;
    group._armL = armL;
    group._armR = armR;
    group._legL = legL;
    group._legR = legR;
    group._head = head;
    group._ring = ring;
    group._walkTime = 0;
    group._state = 'idle';
    group._targetPos = null;
    group._walkSpeed = 3.5;

    scene.add(group);
    agents[key] = group;
  }

  function summonAgent(key, destination) {
    const agent = agents[key];
    if (!agent) return;

    // Compute target seat position
    let targetPos;
    if (destination === 'ceo') {
      const ceoSeat = SEAT_POSITIONS.ceo;
      const offset = (key === 'design' || key === 'marketing') ? -1.5 : 1.5;
      targetPos = new THREE.Vector3(ceoSeat.x + offset, 0, ceoSeat.z + 2.5);
    } else {
      const seat = SEAT_POSITIONS[key] || SEAT_POSITIONS.design;
      targetPos = new THREE.Vector3(seat.x, 0, seat.z);
    }

    const spawn = SPAWN_POSITIONS[key];
    agent.position.set(spawn.x, 0, spawn.z);
    agent.visible = true;
    agent._state = 'walking';
    agent._targetPos = targetPos;
    agent._walkTime = 0;

    // Reset limbs so idle pose is clean
    agent._armL.rotation.x = 0;
    agent._armR.rotation.x = 0;
    agent._legL.rotation.x = 0;
    agent._legR.rotation.x = 0;

    rimLights[key].intensity = 0;
    rimLights[key]._targetIntensity = 4;

    addAgentBadge(key, AGENT_CONFIG[key].name);
    updateRosterItem(key, 'walking');
  }

  function returnAgent(key) {
    const agent = agents[key];
    if (!agent || !agent.visible) return; // skip if never summoned
    const spawn = SPAWN_POSITIONS[key];
    agent._state = 'exiting';
    agent._targetPos = new THREE.Vector3(spawn.x, 0, spawn.z);
    rimLights[key]._targetIntensity = 0;
    updateRosterItem(key, 'returning');
  }

  function addAgentBadge(key, name) {
    const container = document.getElementById('agentBadges');
    if (!container) return;
    if (document.getElementById(`badge-${key}`)) return;
    const badge = document.createElement('div');
    badge.className = 'agent-badge';
    badge.id = `badge-${key}`;
    badge.textContent = `● ${name.toUpperCase()} · ARRIVING`;
    container.appendChild(badge);
    setTimeout(() => {
      if (badge.parentNode) badge.textContent = `● ${name.toUpperCase()} · AT COMMAND CENTER`;
    }, 3200);
  }

  function updateRosterItem(key, state) {
    const item = document.getElementById(`roster-${key}`);
    if (!item) return;
    const statusEl = item.querySelector('.agent-status-text');
    if (!statusEl) return;
    item.classList.remove('active', 'walking');
    statusEl.classList.remove('at-center');
    switch (state) {
      case 'walking':    statusEl.textContent = 'EN ROUTE'; item.classList.add('walking'); break;
      case 'seated':     statusEl.textContent = 'AT CENTER'; statusEl.classList.add('at-center'); item.classList.add('active'); break;
      case 'returning':  statusEl.textContent = 'RETURNING'; break;
      default:           statusEl.textContent = 'STANDBY';
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    const t = now();
    const elapsed = t - startTime;
    const delta = Math.min(t - previousTime, 0.1); // clamp to 100ms max
    previousTime = t;

    // Animate hologram
    if (holoMesh) {
      holoMesh.rotation.y += delta * 1.2;
      holoMesh.rotation.x += delta * 0.5;
      holoMesh.position.y = 4 + Math.sin(elapsed * 2) * 0.15;
    }

    // Pulse fire light
    if (fireLight) {
      fireLight.intensity = 3 + Math.sin(elapsed * 3) * 0.8;
    }

    // Smoothly lerp rim lights to their target intensity
    Object.entries(rimLights).forEach(([key, light]) => {
      const target = light._targetIntensity || 0;
      light.intensity += (target - light.intensity) * 0.07;
    });

    // Animate each agent
    Object.values(agents).forEach(agent => animateAgent(agent, delta, elapsed));

    renderer.render(scene, camera);
  }

  function animateAgent(agent, delta, elapsed) {
    if (!agent.visible) return;

    if (agent._state === 'walking' || agent._state === 'exiting') {
      const target = agent._targetPos;
      const dir = target.clone().sub(agent.position);
      const dist = dir.length();

      if (dist < 0.12) {
        agent.position.copy(target);
        // Reset limb swing
        agent._legL.rotation.x = 0;
        agent._legR.rotation.x = 0;
        agent._armL.rotation.x = 0;
        agent._armR.rotation.x = 0;

        if (agent._state === 'walking') {
          agent._state = 'seated';
          updateRosterItem(agent._key, 'seated');
          if (typeof AppState !== 'undefined') AppState.incrementStat('agentsDeployed');
        } else {
          agent.visible = false;
          agent._state = 'idle';
          updateRosterItem(agent._key, 'standby');
          const badge = document.getElementById(`badge-${agent._key}`);
          if (badge) badge.remove();
        }
      } else {
        dir.normalize();
        agent.position.addScaledVector(dir, agent._walkSpeed * delta);

        // Face direction of travel
        agent.rotation.y = Math.atan2(dir.x, dir.z);

        // Walk cycle
        agent._walkTime += delta * 8;
        const swing = Math.sin(agent._walkTime) * 0.35;
        agent._legL.rotation.x = swing;
        agent._legR.rotation.x = -swing;
        agent._armL.rotation.x = -swing * 0.6;
        agent._armR.rotation.x = swing * 0.6;
        agent._head.position.y = 1.5 + Math.abs(Math.sin(agent._walkTime)) * 0.04;
      }
    }

    if (agent._state === 'seated') {
      const breathe = Math.sin(elapsed * 2 + agent._key.length) * 0.03;
      agent._head.position.y = 1.5 + breathe;
      if (agent._ring) {
        agent._ring.material.emissiveIntensity = 1.5 + Math.sin(elapsed * 3) * 0.8;
      }
    }
  }

  function buildRoster() {
    const list = document.getElementById('agentList');
    if (!list) return;
    list.innerHTML = '';
    Object.entries(AGENT_CONFIG).forEach(([key, cfg]) => {
      const hex = cfg.color.toString(16).padStart(6, '0');
      const item = document.createElement('div');
      item.className = 'agent-item';
      item.id = `roster-${key}`;
      item.innerHTML = `
        <div class="agent-color" style="background:#${hex}"></div>
        <span class="agent-name">${cfg.name}</span>
        <span class="agent-status-text">STANDBY</span>
      `;
      item.addEventListener('click', () => {
        if (typeof CommandCenter !== 'undefined') {
          CommandCenter.fillAndSend(`call ${cfg.name.toLowerCase()} to command center`);
        }
      });
      list.appendChild(item);
    });
  }

  return { init, buildRoster, summonAgent, returnAgent, AGENT_CONFIG };
})();
