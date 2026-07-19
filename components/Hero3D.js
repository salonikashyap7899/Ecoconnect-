'use client';

import { useEffect, useRef } from 'react';

// Animated luxury "capability core" — a glowing gold wireframe icosahedron
// wrapped in three tilted orbit rings and an ambient particle field. Rendered
// with three.js on a canvas layered behind hero content. Pauses off-screen and
// when the tab is hidden; honours prefers-reduced-motion.
export default function Hero3D({ className = '' }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let alive = true;
    let raf = null;
    let tPrev = 0;
    let three = null;
    let ro = null;
    let io = null;
    let onWinResize = null;
    let onMouseMove = null;
    let onVis = null;
    const state = { visible: true, docVisible: document.visibilityState === 'visible', mouse: { x: 0, y: 0 } };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function makeGlowTexture(THREE) {
      const size = 128;
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.35, 'rgba(216,190,145,0.85)');
      g.addColorStop(1, 'rgba(216,190,145,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }

    function resize() {
      const host = hostRef.current;
      if (!host || !three) return;
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      three.camera.aspect = w / h;
      three.camera.updateProjectionMatrix();
      three.renderer.setSize(w, h, false);
    }

    function renderFrame(dt) {
      if (!three) return;
      three.group.rotation.y += dt * 0.09;
      three.core.rotation.x += dt * 0.05;
      three.coreInner.rotation.y -= dt * 0.04;
      three.rings.forEach((r) => { r.rotation.z += dt * r.userData.speed; });
      const targetTiltX = state.mouse.y * 0.35;
      const targetTiltY = state.mouse.x * 0.5;
      three.camera.position.x += (targetTiltY * 3 - three.camera.position.x) * Math.min(dt * 2, 1);
      three.camera.position.y += (-targetTiltX * 2 - three.camera.position.y) * Math.min(dt * 2, 1);
      three.camera.lookAt(0, 0, 0);
      three.renderer.render(three.scene, three.camera);
    }

    function tick(t) {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      if (!state.visible || !state.docVisible) return;
      const dt = Math.min((t - (tPrev || t)) / 1000, 0.05);
      tPrev = t;
      renderFrame(dt);
    }

    async function init() {
      const THREE = await import('three');
      if (!alive) return;
      const host = hostRef.current;
      const canvas = canvasRef.current;
      if (!host || !canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 11);

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const group = new THREE.Group();
      scene.add(group);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.5, 1),
        new THREE.MeshBasicMaterial({ color: 0x9fd6b8, wireframe: true, transparent: true, opacity: 0.36 }),
      );
      group.add(core);

      const coreInner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.5, 0),
        new THREE.MeshBasicMaterial({ color: 0x1b6b4a, wireframe: true, transparent: true, opacity: 0.22 }),
      );
      group.add(coreInner);

      const glowTex = makeGlowTexture(THREE);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x9fd6b8, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.scale.set(8.5, 8.5, 1);
      group.add(glow);

      const rings = [];
      const ringDefs = [
        { radius: 4.0, tiltX: 0.5, tiltY: 0.2, count: 7, speed: 0.05, color: 0x9fd6b8, size: 0.13 },
        { radius: 4.9, tiltX: -0.75, tiltY: 0.35, count: 5, speed: -0.037, color: 0x7cc4a0, size: 0.1 },
        { radius: 5.8, tiltX: 1.1, tiltY: -0.3, count: 9, speed: 0.028, color: 0xd9e9df, size: 0.075 },
      ];
      ringDefs.forEach((def) => {
        const ringGroup = new THREE.Group();
        ringGroup.rotation.x = def.tiltX;
        ringGroup.rotation.y = def.tiltY;
        const nodeMat = new THREE.SpriteMaterial({ map: glowTex, color: def.color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
        for (let i = 0; i < def.count; i++) {
          const a = (i / def.count) * Math.PI * 2;
          const node = new THREE.Sprite(nodeMat);
          node.position.set(Math.cos(a) * def.radius, Math.sin(a) * def.radius, 0);
          node.scale.set(def.size, def.size, 1);
          ringGroup.add(node);
        }
        const ringLine = new THREE.Mesh(
          new THREE.RingGeometry(def.radius - 0.006, def.radius + 0.006, 96),
          new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.13, side: THREE.DoubleSide }),
        );
        ringGroup.add(ringLine);
        ringGroup.userData.speed = def.speed;
        group.add(ringGroup);
        rings.push(ringGroup);
      });

      const fieldCount = 80;
      const fieldPos = new Float32Array(fieldCount * 3);
      for (let i = 0; i < fieldCount; i++) {
        const r = 7.5 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        fieldPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        fieldPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        fieldPos[i * 3 + 2] = r * Math.cos(phi);
      }
      const fieldGeo = new THREE.BufferGeometry();
      fieldGeo.setAttribute('position', new THREE.BufferAttribute(fieldPos, 3));
      const field = new THREE.Points(fieldGeo, new THREE.PointsMaterial({ map: glowTex, color: 0xffffff, size: 0.09, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
      group.add(field);

      three = { scene, camera, renderer, group, rings, core, coreInner };

      onMouseMove = (e) => {
        state.mouse.x = e.clientX / window.innerWidth - 0.5;
        state.mouse.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener('pointermove', onMouseMove, { passive: true });

      resize();
      if (window.ResizeObserver) {
        ro = new ResizeObserver(() => resize());
        ro.observe(host);
      } else {
        onWinResize = () => resize();
        window.addEventListener('resize', onWinResize);
      }

      io = new IntersectionObserver((entries) => { state.visible = entries[0].isIntersecting; }, { threshold: 0.01 });
      io.observe(host);

      onVis = () => { state.docVisible = document.visibilityState === 'visible'; };
      document.addEventListener('visibilitychange', onVis);

      if (reduced) renderFrame(0);
      else raf = requestAnimationFrame(tick);
    }

    init().catch(() => {});

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (onWinResize) window.removeEventListener('resize', onWinResize);
      if (io) io.disconnect();
      if (onMouseMove) window.removeEventListener('pointermove', onMouseMove);
      if (onVis) document.removeEventListener('visibilitychange', onVis);
      if (three) {
        three.scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (obj.material.map) obj.material.map.dispose();
            obj.material.dispose();
          }
        });
        three.renderer.dispose();
      }
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
