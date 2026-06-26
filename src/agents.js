/* ════════════════════════════════════════════
   THREE.JS AGENT SYSTEM
   3D humanoid agents that walk into the command center
════════════════════════════════════════════ */

const AgentSystem = (() => {
  let scene, camera, renderer, animFrameId;
  const clock = new THREE.Clock();
  const agents = {};
  const SEAT_POSITIONS = {
    design:    { x: -3,  y: 0, z: -2 },
    dev:       { x:  3,  y: 0, z: -2 },
    marketing: { x: -3,  y: 0, z:  2 },
    ops:       { x:  3,  y: 0, z:  2 },
    ceo:       { x:  0,  y: 0, z: -4 },
  };
  const SPAWN_POSITIONS = {
    design:    { x: -14, y: 0, z:  8 },
    dev:       { x:  14, y: 0, z:  8 },
    marketing: { x: -14, y: 0, z:  8 },
    ops:       { x:  14, y: 0, z:  8 },
    ceo:       { x:  0,  y: 0, z: 14 },
  };

  const AGENT_CONFIG = {
    design:    { name: 'Design Leader',    color: 0xa78bfa, accent: 0xddd6fe },
    dev:       { name: 'Dev Leader',       color: 0x34d399, accent: 0x6ee7b7 },
    marketing: { name: 'Marketing Leader', color: 0x60a5fa, accent: 0x93c5fd },
    ops:       { name: 'Ops Leader',       color: 0xfbbf24, accent: 0xfde68a },
    ceo:       { name: 'CEO',              color: 0xff6b1a, accent: 0xffaa44 },
  };

  function init() {
    const canvas = document.getElementById('agentCanvas');
    const container = document.getElementById('threeViewport');
    if (!canvas || !container) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030201);
    scene.fog = new THREE.FogExp2(0x030201, 0.04);

    // Camera
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 10, 14);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    buildScene();
    animate();

    window.addEventListener('resize', () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    });
  }

  function buildScene() {
    // Floor grid
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0604,
      roughness: 0.9,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid lines overlay
    const gridHelper = new THREE.GridHelper(40, 40, 0x1a0a00, 0x0f0700);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Command table (hexagonal center piece)
    buildCommandTable();

    // Ambient + directional light
    const ambient = new THREE.AmbientLight(0x110806, 2);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xfff0e0, 1.5);
    sunLight.position.set(5, 12, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    scene.add(sunLight);

    // Fire accent point light
    const fireLight = new THREE.PointLight(0xff6b1a, 3, 15);
    fireLight.position.set(0, 4, 0);
    scene.add(fireLight);

    // Rim lights per seat
    Object.entries(SEAT_POSITIONS).forEach(([key, pos]) => {
      const cfg = AGENT_CONFIG[key];
      const rimLight = new THREE.PointLight(cfg.color, 0, 6);
      rimLight.position.set(pos.x, 3, pos.z);
      rimLight._agentKey = key;
      rimLight._baseIntensity = 0;
      scene.add(rimLight);
    });

    // Spawn all agent base models (at spawn position, inactive)
    Object.keys(AGENT_CONFIG).forEach(key => createAgent(key));
  }

  function buildCommandTable() {
    // Central hexagonal table
    const tableGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.15, 6);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1a0a00,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x220800,
      emissiveIntensity: 0.5,
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = 0.9;
    table.castShadow = true;
    table.receiveShadow = true;
    scene.add(table);

    // Glowing rim on table
    const rimGeo = new THREE.TorusGeometry(2.5, 0.04, 8, 6);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xff6b1a,
      emissive: 0xff6b1a,
      emissiveIntensity: 2,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = 0.97;
    rim.rotation.x = Math.PI / 2;
    scene.add(rim);

    // Holographic center column
    const colGeo = new THREE.CylinderGeometry(0.06, 0.06, 3, 8);
    const colMat = new THREE.MeshStandardMaterial({
      color: 0xff6b1a,
      emissive: 0xff8c42,
      emissiveIntensity: 3,
      transparent: true,
      opacity: 0.7,
    });
    const col = new THREE.Mesh(colGeo, colMat);
    col.position.y = 2.4;
    scene.add(col);

    // Hologram sphere at top
    const holoGeo = new THREE.OctahedronGeometry(0.5, 1);
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0xff6b1a,
      emissive: 0xff6b1a,
      emissiveIntensity: 2,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const holo = new THREE.Mesh(holoGeo, holoMat);
    holo.position.y = 4;
    holo._isHolo = true;
    scene.add(holo);

    // Chair placeholders at each seat
    Object.entries(SEAT_POSITIONS).forEach(([, pos]) => {
      const chairGeo = new THREE.BoxGeometry(0.6, 0.06, 0.6);
      const chairMat = new THREE.MeshStandardMaterial({
        color: 0x1a0a00, roughness: 0.5, metalness: 0.5
      });
      const chair = new THREE.Mesh(chairGeo, chairMat);
      chair.position.set(pos.x, 0.5, pos.z);
      chair.receiveShadow = true;
      scene.add(chair);
    });
  }

  function createAgent(key) {
    const cfg = AGENT_CONFIG[key];
    const spawn = SPAWN_POSITIONS[key];
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.5, 0.8, 0.25);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      roughness: 0.4,
      metalness: 0.6,
      emissive: cfg.color,
      emissiveIntensity: 0.15,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.9;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const headMat = new THREE.MeshStandardMaterial({
      color: cfg.accent,
      roughness: 0.3,
      metalness: 0.7,
      emissive: cfg.accent,
      emissiveIntensity: 0.3,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.5;
    head.castShadow = true;
    group.add(head);

    // Eyes (glowing dots)
    const eyeGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 3,
    });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.07, 1.52, 0.16);
    group.add(eyeL);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.07;
    group.add(eyeR);

    // Left arm
    const armGeo = new THREE.BoxGeometry(0.12, 0.6, 0.12);
    const armL = new THREE.Mesh(armGeo, bodyMat.clone());
    armL.position.set(-0.35, 0.85, 0);
    armL.castShadow = true;
    group.add(armL);
    const armR = armL.clone();
    armR.position.x = 0.35;
    group.add(armR);

    // Left leg
    const legGeo = new THREE.BoxGeometry(0.18, 0.7, 0.18);
    const legL = new THREE.Mesh(legGeo, bodyMat.clone());
    legL.position.set(-0.14, 0.35, 0);
    legL.castShadow = true;
    group.add(legL);
    const legR = legL.clone();
    legR.position.x = 0.14;
    group.add(legR);

    // Role badge glow ring
    const ringGeo = new THREE.TorusGeometry(0.22, 0.025, 8, 20);
    const ringMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      emissiveIntensity: 2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 2.0;
    group.add(ring);

    group.position.set(spawn.x, 0, spawn.z);
    group.visible = false;

    // Store references for animation
    group._key = key;
    group._armL = armL;
    group._armR = armR;
    group._legL = legL;
    group._legR = legR;
    group._head = head;
    group._ring = ring;
    group._walkTime = 0;
    group._state = 'idle'; // 'idle' | 'walking' | 'seated' | 'exiting'
    group._targetPos = null;
    group._walkSpeed = 3.5;

    scene.add(group);
    agents[key] = group;
  }

  function summonAgent(key, destination) {
    const agent = agents[key];
    if (!agent) return;

    const seat = destination === 'ceo'
      ? SEAT_POSITIONS.ceo
      : SEAT_POSITIONS[key];

    const targetPos = destination === 'ceo'
      ? { ...SEAT_POSITIONS.ceo, x: SEAT_POSITIONS.ceo.x + (key === 'design' ? -1.5 : 1.5), z: SEAT_POSITIONS.ceo.z + 2 }
      : seat;

    // Show agent at spawn
    const spawn = SPAWN_POSITIONS[key];
    agent.position.set(spawn.x, 0, spawn.z);
    agent.visible = true;
    agent._state = 'walking';
    agent._targetPos = new THREE.Vector3(targetPos.x, 0, targetPos.z);
    agent._walkTime = 0;
    agent._destination = destination;

    // Activate rim light for this agent
    activateRimLight(key);

    // Add badge to viewport
    addAgentBadge(key, AGENT_CONFIG[key].name);

    // Update roster
    updateRosterItem(key, 'walking');
  }

  function returnAgent(key) {
    const agent = agents[key];
    if (!agent) return;
    const spawn = SPAWN_POSITIONS[key];
    agent._state = 'exiting';
    agent._targetPos = new THREE.Vector3(spawn.x, 0, spawn.z);
    updateRosterItem(key, 'returning');
  }

  function activateRimLight(key) {
    scene.children.forEach(child => {
      if (child._agentKey === key) {
        child._baseIntensity = 4;
      }
    });
  }

  function addAgentBadge(key, name) {
    const container = document.getElementById('agentBadges');
    if (!container) return;
    const existing = document.getElementById(`badge-${key}`);
    if (existing) return;
    const badge = document.createElement('div');
    badge.className = 'agent-badge';
    badge.id = `badge-${key}`;
    badge.textContent = `● ${name.toUpperCase()} · ARRIVING`;
    container.appendChild(badge);
    setTimeout(() => {
      badge.textContent = `● ${name.toUpperCase()} · AT COMMAND CENTER`;
    }, 3200);
  }

  function updateRosterItem(key, state) {
    const item = document.getElementById(`roster-${key}`);
    if (!item) return;
    const statusEl = item.querySelector('.agent-status-text');
    if (!statusEl) return;

    item.classList.remove('active', 'walking');

    switch (state) {
      case 'walking':
        statusEl.textContent = 'EN ROUTE';
        item.classList.add('walking');
        break;
      case 'seated':
        statusEl.textContent = 'AT CENTER';
        statusEl.classList.add('at-center');
        item.classList.add('active');
        break;
      case 'returning':
        statusEl.textContent = 'RETURNING';
        break;
      default:
        statusEl.textContent = 'STANDBY';
        statusEl.classList.remove('at-center');
    }
  }

  function animate() {
    animFrameId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Rotate hologram
    scene.children.forEach(child => {
      if (child._isHolo) {
        child.rotation.y += delta * 1.2;
        child.rotation.x += delta * 0.5;
        child.position.y = 4 + Math.sin(elapsed * 2) * 0.15;
      }
    });

    // Pulse fire light
    scene.children.forEach(child => {
      if (child.isPointLight && !child._agentKey) {
        child.intensity = 3 + Math.sin(elapsed * 3) * 0.8;
      }
      if (child.isPointLight && child._agentKey) {
        const target = child._baseIntensity || 0;
        child.intensity += (target - child.intensity) * 0.05;
      }
    });

    // Animate agents
    Object.values(agents).forEach(agent => animateAgent(agent, delta, elapsed));

    renderer.render(scene, camera);
  }

  function animateAgent(agent, delta, elapsed) {
    if (!agent.visible) return;

    if (agent._state === 'walking' || agent._state === 'exiting') {
      const target = agent._targetPos;
      const dir = target.clone().sub(agent.position);
      const dist = dir.length();

      if (dist < 0.15) {
        agent.position.copy(target);
        if (agent._state === 'walking') {
          agent._state = 'seated';
          updateRosterItem(agent._key, 'seated');
          AppState.incrementStat('agentsDeployed');
        } else {
          agent.visible = false;
          agent._state = 'idle';
          updateRosterItem(agent._key, 'standby');
          deactivateRimLight(agent._key);
          const badge = document.getElementById(`badge-${agent._key}`);
          if (badge) badge.remove();
        }
      } else {
        dir.normalize();
        const speed = agent._walkSpeed;
        agent.position.addScaledVector(dir, speed * delta);

        // Face direction of travel
        const angle = Math.atan2(dir.x, dir.z);
        agent.rotation.y = angle;

        // Walk animation
        agent._walkTime += delta * 8;
        const swing = Math.sin(agent._walkTime) * 0.35;
        agent._legL.rotation.x = swing;
        agent._legR.rotation.x = -swing;
        agent._armL.rotation.x = -swing * 0.6;
        agent._armR.rotation.x = swing * 0.6;

        // Head bob
        agent._head.position.y = 1.5 + Math.abs(Math.sin(agent._walkTime)) * 0.04;
      }
    }

    if (agent._state === 'seated') {
      // Idle breathing animation
      const breathe = Math.sin(elapsed * 2 + agent._key.length) * 0.03;
      agent._head.position.y = 1.5 + breathe;

      // Ring glow pulse
      if (agent._ring) {
        agent._ring.material.emissiveIntensity = 1.5 + Math.sin(elapsed * 3) * 0.8;
      }
    }
  }

  function deactivateRimLight(key) {
    scene.children.forEach(child => {
      if (child._agentKey === key) {
        child._baseIntensity = 0;
      }
    });
  }

  function buildRoster() {
    const list = document.getElementById('agentList');
    if (!list) return;
    list.innerHTML = '';
    Object.entries(AGENT_CONFIG).forEach(([key, cfg]) => {
      const item = document.createElement('div');
      item.className = 'agent-item';
      item.id = `roster-${key}`;
      item.innerHTML = `
        <div class="agent-color" style="background:#${cfg.color.toString(16).padStart(6,'0')}"></div>
        <span class="agent-name">${cfg.name}</span>
        <span class="agent-status-text">STANDBY</span>
      `;
      item.addEventListener('click', () => {
        window.CommandCenter && CommandCenter.fillAndSend(`call ${cfg.name.toLowerCase()} to command center`);
      });
      list.appendChild(item);
    });
  }

  return { init, buildRoster, summonAgent, returnAgent, AGENT_CONFIG };
})();
