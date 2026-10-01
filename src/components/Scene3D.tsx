import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sc } from "../lib/scroll";

const rnd = Math.random;

// ─────────────────────────────────────────────────────────────────
// Signature Angaar Flame 3D Volumetric Sculptor
// ─────────────────────────────────────────────────────────────────
function inFlame(x: number, y: number): boolean {
  if (y < -1.0 || y > 1.55 || Math.abs(x) > 1.0) return false;
  const t = (y + 1.0) / 2.55;
  // right wall — wide belly, tapers to sharp tip
  const right = 0.92 * Math.sin(Math.pow(t, 0.55) * Math.PI) + (1 - t) * 0.08;
  // left wall — characteristic inward notch at mid-height
  let left = -(0.84 * Math.sin(Math.pow(t, 0.60) * Math.PI) + (1 - t) * 0.08);
  if (t > 0.07 && t < 0.50) {
    const nt = (t - 0.07) / 0.43;
    left += Math.sin(nt * Math.PI) * 0.55; // notch bite
  }
  // tip leans right
  const lean = Math.pow(Math.max(0, t - 0.52) / 0.48, 2.2) * 0.20;
  return x >= left + lean * 0.35 && x <= right + lean;
}

function sampleFlameContour(n: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    let x = 0, y = 0;
    if (t < 0.44) {              // right flank (tip → base-right)
      const u = t / 0.44;
      y = 1.55 - u * 2.55;
      x = Math.sin(Math.pow(u, 0.58) * Math.PI * 0.92) * 0.92 + (1 - u) * 0.1;
    } else if (t < 0.68) {       // base arc (right → left)
      const u = (t - 0.44) / 0.24;
      y = -1.0 + u * 0.8;
      x = Math.cos(u * Math.PI) * 0.86;
    } else {                      // left notch tongue back to tip
      const u = (t - 0.68) / 0.32;
      y = -0.2 + u * 1.75;
      x = -0.62 + Math.sin(u * Math.PI) * 0.50 + u * 0.74;
    }
    pts.push([x, y]);
  }
  return pts;
}

function buildFlameCloud(n: number): { restPos: Float32Array; scatterPos: Float32Array } {
  const restPos = new Float32Array(n * 3);
  const scatterPos = new Float32Array(n * 3);
  let count = 0;

  // 38% on contour — crisp, sharp geometric flame silhouette
  const contourCount = Math.floor(n * 0.38);
  const contourPts = sampleFlameContour(contourCount);
  for (const [cx, cy] of contourPts) {
    if (count >= n) break;
    const zOffset = (rnd() - 0.5) * 0.24;
    restPos[count * 3]     = cx + (rnd() - 0.5) * 0.025;
    restPos[count * 3 + 1] = cy + (rnd() - 0.5) * 0.025;
    restPos[count * 3 + 2] = zOffset;
    count++;
  }

  // 62% volumetric interior — sculpted 3D dome with true depth
  let tries = 0;
  while (count < n && tries < n * 40) {
    tries++;
    const x = (rnd() - 0.5) * 2.1;
    const y = rnd() * 2.55 - 1.0;
    if (!inFlame(x, y)) continue;

    const normH = Math.max(0, Math.min(1, (y + 1.0) / 2.55));
    // Core has sculpted 3D thickness that tapers toward the edges and tip
    const maxZ = Math.sin(normH * Math.PI) * 0.55 + 0.10;
    const z = (rnd() - 0.5) * maxZ * (1.1 - Math.abs(x) * 0.7);

    restPos[count * 3]     = x;
    restPos[count * 3 + 1] = y;
    restPos[count * 3 + 2] = z;
    count++;
  }

  // Scatter positions (expansive cosmic ember galaxy on scroll)
  for (let i = 0; i < n; i++) {
    const angle = (rnd() - 0.5) * Math.PI * 2.4;
    const dist  = 1.2 + rnd() * 12.0;
    const rise  = rnd() * rnd() * 8.0;
    scatterPos[i * 3]     = Math.sin(angle) * dist;
    scatterPos[i * 3 + 1] = rise - 2.0 + (rnd() - 0.5) * 3.5;
    scatterPos[i * 3 + 2] = Math.cos(angle) * dist * 0.6 - 2.0 - rnd() * 4.5;
  }

  return { restPos, scatterPos };
}

// ─────────────────────────────────────────────────────────────────
// Professional Awwwards-Tier 3D Particle Flame Engine
// ─────────────────────────────────────────────────────────────────
export default function Scene3D({ onReady }: { onReady?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    let M = window.innerWidth < 768;
    const R = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    const updatePixelRatio = () => {
      M = window.innerWidth < 768;
      renderer.setPixelRatio(M ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    };
    updatePixelRatio();
    renderer.setClearColor(0x070605, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = M ? 6.4 : 7.0;

    const resize = () => {
      updatePixelRatio();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.z = window.innerWidth < 768 ? 6.4 : 7.0;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Particle Budget ───────────────────────────────────────────
    const N = M ? 5200 : 12000;

    // ── Generate 3D Rest & Scatter Coordinates ────────────────────
    const { restPos, scatterPos } = buildFlameCloud(N);

    // ── Per-particle attributes ───────────────────────────────────
    const aColor  = new Float32Array(N * 3);
    const aSize   = new Float32Array(N);
    const aPhase  = new Float32Array(N);
    const aSpeed  = new Float32Array(N);
    const aHeight = new Float32Array(N);

    const cWhiteHot = new THREE.Color(1.00, 0.98, 0.92);
    const cGold     = new THREE.Color(1.00, 0.82, 0.14);
    const cAmber    = new THREE.Color(1.00, 0.48, 0.02);
    const cEmber    = new THREE.Color(0.88, 0.18, 0.00);
    const cDeep     = new THREE.Color(0.52, 0.06, 0.00);

    for (let i = 0; i < N; i++) {
      const isContour = i < Math.floor(N * 0.38);
      const ry = restPos[i * 3 + 1];
      const h  = Math.max(0, Math.min(1, (ry + 1.0) / 2.55));
      aHeight[i] = h;

      const c = new THREE.Color();
      if      (h > 0.80) c.copy(cGold).lerp(cWhiteHot, (h - 0.80) / 0.20);
      else if (h > 0.50) c.copy(cAmber).lerp(cGold,    (h - 0.50) / 0.30);
      else if (h > 0.24) c.copy(cEmber).lerp(cAmber,   (h - 0.24) / 0.26);
      else               c.copy(cDeep).lerp(cEmber,    h / 0.24);

      if (isContour) c.lerp(cAmber, 0.22);

      aColor[i * 3]     = c.r;
      aColor[i * 3 + 1] = c.g;
      aColor[i * 3 + 2] = c.b;

      const belly = Math.sin(h * Math.PI);
      const baseScale = M ? 0.044 : 0.048;
      aSize[i]  = baseScale * (isContour ? 1.30 : 0.88) * (0.70 + belly * 0.65 + rnd() * 0.30);
      aPhase[i] = rnd() * Math.PI * 2;
      aSpeed[i] = 0.65 + rnd() * 1.25;
    }

    // ── GPU Geometry ──────────────────────────────────────────────
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position",    new THREE.BufferAttribute(restPos, 3));
    geo.setAttribute("aScatterPos", new THREE.BufferAttribute(scatterPos, 3));
    geo.setAttribute("aColor",      new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aSize",       new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aPhase",      new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute("aSpeed",      new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aHeight",     new THREE.BufferAttribute(aHeight, 1));

    // ── Custom 3D Shaders with Scroll & Velocity Morphing ─────────
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       { value: 0 },
        uPixelRatio: { value: M ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2) },
        uScatter:    { value: 0 },
        uScroll:     { value: 0 },
        uVelocity:   { value: 0 },
        uPerspective:{ value: M ? 220.0 : 260.0 },
      },
      vertexShader: /* glsl */`
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uScatter;
        uniform float uScroll;
        uniform float uVelocity;
        uniform float uPerspective;

        attribute vec3  aScatterPos;
        attribute vec3  aColor;
        attribute float aSize;
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aHeight;

        varying vec3  vColor;
        varying float vSparkle;
        varying float vAlpha;

        void main() {
          // Re-ignition collapse at bottom footer (scroll > 0.82)
          float reignite = smoothstep(0.82, 0.98, uScroll);
          vec3 starPos = position * 0.42;

          vec3 baseP = mix(position, aScatterPos, uScatter);
          vec3 p = mix(baseP, starPos, reignite);

          float flameness = (1.0 - uScatter) * (1.0 - reignite);
          float velBoost = clamp(abs(uVelocity) * 2.5, 0.0, 3.0);

          // 1) Dynamic upward rising flame tongues + velocity wind draft
          float riseAmp = (aHeight * aHeight * 0.065 + velBoost * 0.040) * (flameness + reignite * 0.7);
          p.y += sin(uTime * (aSpeed * 3.2 + velBoost) + aPhase) * riseAmp;

          // 2) 3D Volumetric helical swirl (swirls faster on scroll)
          float twist = p.y * 1.4 + uScroll * 4.5 + aPhase;
          float swayAmp = (0.88 - aHeight * 0.42) * 0.042 * (flameness + reignite * 0.6);
          p.x += sin(uTime * 2.4 + twist) * swayAmp;
          p.z += cos(uTime * 2.0 + twist) * (swayAmp * 0.85);

          // 3) Cosmic drift when exploded
          float scatterDrift = uScatter * (1.0 - reignite);
          p.y += sin(uTime * 0.8 + aPhase) * 0.15 * scatterDrift + uVelocity * 0.25;
          p.x += cos(uTime * 0.6 + aPhase * 1.3) * 0.12 * scatterDrift;
          p.z += sin(uTime * 0.5 + aPhase * 0.9) * 0.12 * scatterDrift;

          vec4 mvp = modelViewMatrix * vec4(p, 1.0);

          // 4) Diamond twinkle sparkle
          float s = sin(uTime * (2.8 + aSpeed * 3.5 + velBoost * 2.0) + aPhase * 6.28);
          vSparkle = clamp(s * s * s * s, 0.0, 1.0);

          // Dynamic color temperature
          vec3 activeCol = aColor;
          if (reignite > 0.0) {
            activeCol = mix(activeCol, vec3(1.0, 0.96, 0.82), reignite * 0.65);
          }
          vColor = activeCol;
          vAlpha = mix(1.0, 0.42 + aHeight * 0.45, uScatter * (1.0 - reignite * 0.85));

          float szMul = 1.0 + vSparkle * (2.2 + velBoost * 0.6);
          szMul *= mix(1.0, 0.72, uScatter * (1.0 - reignite));

          gl_PointSize = aSize * szMul * uPixelRatio * (uPerspective / -mvp.z);
          gl_Position  = projectionMatrix * mvp;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3  vColor;
        varying float vSparkle;
        varying float vAlpha;

        void main() {
          vec2  uv   = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;

          // Smooth radial intensity core
          float core = pow(1.0 - smoothstep(0.0, 0.50, dist), 1.6);

          // 4-point diamond sparkle spike
          float sH = max(0.0, 1.0 - abs(uv.y) * 18.0) * max(0.0, 1.0 - abs(uv.x) * 3.4);
          float sV = max(0.0, 1.0 - abs(uv.x) * 18.0) * max(0.0, 1.0 - abs(uv.y) * 3.4);
          float spike = (sH + sV) * vSparkle * 0.95;

          vec3 hotWhite = vec3(1.0, 0.98, 0.90);
          vec3 col = mix(vColor, hotWhite, vSparkle * 0.85 + spike * 0.60);
          float alpha = clamp((core * 1.15 + spike * 1.35) * vAlpha, 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    });

    const group = new THREE.Group();
    group.add(new THREE.Points(geo, mat));
    scene.add(group);

    // ── Ambient Drifting Cosmic Embers ────────────────────────────
    const EC = M ? 90 : 360;
    const ePos = new Float32Array(EC * 3);
    const eVel = new Float32Array(EC);
    const eWig = new Float32Array(EC);
    for (let i = 0; i < EC; i++) {
      ePos[i * 3]     = (rnd() - 0.5) * 26;
      ePos[i * 3 + 1] = rnd() * 22 - 11;
      ePos[i * 3 + 2] = 1 - rnd() * 32;
      eVel[i] = 0.010 + rnd() * 0.022;
      eWig[i] = rnd() * Math.PI * 2;
    }
    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(ePos, 3));
    const eMat = new THREE.PointsMaterial({
      size: M ? 0.040 : 0.038,
      color: 0xff8811,
      transparent: true,
      opacity: 0.60,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberMesh = new THREE.Points(eGeo, eMat);
    scene.add(emberMesh);

    // ── Interactive 3D Touch & Pointer Dynamics ───────────────────
    let mx = 0, my = 0, smx = 0, smy = 0;

    const onPtr = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mx = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        my = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };

    window.addEventListener("pointermove", onPtr, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });

    const clock = new THREE.Clock();
    let scrollCur = 0;
    let velCur = 0;
    let animId = 0;
    let firstFrameDone = false;

    const smooth = (x: number) => x * x * (3 - 2 * x);

    const loop = () => {
      animId = requestAnimationFrame(loop);
      const t = R ? 0 : clock.getElapsedTime();

      // Smooth scroll progress & velocity dampening
      scrollCur += (sc.p - scrollCur) * (R ? 1 : 0.075);
      velCur += (sc.v - velCur) * 0.18;
      sc.v *= 0.90; // natural friction decay

      mat.uniforms.uTime.value = t;
      mat.uniforms.uScroll.value = scrollCur;
      mat.uniforms.uVelocity.value = velCur;
      smx += (mx - smx) * 0.045;
      smy += (my - smy) * 0.045;

      const isMob = window.innerWidth < 768;

      // ── Scatter factor: explosion on scroll (starts early at 0.10) ──
      const scatterRaw = Math.max(0, Math.min(1, (scrollCur - 0.10) / 0.32));
      const scatter = smooth(scatterRaw);
      mat.uniforms.uScatter.value = scatter;

      // ── Full-Page Multi-Stage 3D Choreography ──────────────────
      let targetX = isMob ? 0.0 : 2.15;
      let targetY = isMob ? 0.36 : 0.0;
      let targetScale = isMob ? 1.55 : 2.85;

      // Stage 1 (Capabilities / Services, scroll 0.12 - 0.38): accelerates, shifts and sheds sparks
      if (scrollCur > 0.12 && scrollCur <= 0.38) {
        const u = (scrollCur - 0.12) / 0.26;
        targetX = isMob ? (Math.sin(u * Math.PI) * 0.25) : (2.15 - u * 1.5);
        targetY = isMob ? (0.36 - u * 0.25) : (-u * 0.25);
        targetScale *= (1 + Math.sin(u * Math.PI) * 0.18);
      }
      // Stage 2 (Flagship Showcase, scroll 0.38 - 0.72): expansive 3D cosmic background field
      else if (scrollCur > 0.38 && scrollCur <= 0.72) {
        const u = (scrollCur - 0.38) / 0.34;
        targetX = isMob ? 0.0 : 0.4;
        targetY = isMob ? (0.1 - u * 0.2) : 0.0;
        targetScale *= 1.30;
      }
      // Stage 3 (CTA & Re-ignition, scroll > 0.72): collapses into glowing white-hot star at bottom
      else if (scrollCur > 0.72) {
        const u = (scrollCur - 0.72) / 0.28;
        targetX = 0.0;
        targetY = isMob ? (-0.35 * u) : (-0.25 * u);
        targetScale = isMob ? (1.55 * (1 + u * 0.35)) : (2.85 * (1 + u * 0.25));
      }

      const posX  = targetX + smx * (isMob ? 0.22 : 0.38);
      const posY  = targetY - smy * (isMob ? 0.18 : 0.28) + (velCur * 0.12);
      const scale = targetScale * (1 + Math.sin(t * 1.5) * 0.020 + Math.min(0.2, Math.abs(velCur) * 0.04));

      // Multi-axis 3D continuous rotation fueled by scroll + time + pointer tilt
      const scrollRotation = scrollCur * Math.PI * 2.8;
      const rotY  = (isMob ? Math.sin(t * 0.6) * 0.22 : t * 0.16) + scrollRotation * 0.6 + smx * (isMob ? 0.48 : 0.30);
      const rotX  = -smy * (isMob ? 0.30 : 0.14) + Math.sin(t * 0.8 + scrollCur * 4.0) * 0.08 - (velCur * 0.06);
      const rotZ  = Math.sin(t * 0.7 + scrollCur * 2.0) * 0.05 + scrollCur * 0.25;

      group.position.set(posX, posY, 0);
      group.scale.setScalar(scale);
      group.rotation.set(rotX, rotY, rotZ);

      // ── Ambient Rising Embers (Accelerates with scroll velocity) ──
      const ep = eGeo.attributes.position.array as Float32Array;
      const emberVelMultiplier = 1 + Math.abs(velCur) * 3.5 + scatter * 2.0;
      for (let i = 0; i < EC; i++) {
        ep[i * 3 + 1] += eVel[i] * emberVelMultiplier;
        ep[i * 3]     += Math.sin(t * 0.9 + eWig[i]) * 0.004;
        if (ep[i * 3 + 1] > 11) ep[i * 3 + 1] = -11;
      }
      eGeo.attributes.position.needsUpdate = true;
      eMat.opacity = 0.45 + scatter * 0.40 + Math.min(0.3, Math.abs(velCur) * 0.2);

      // ── Camera Subtle 3D Perspective Parallax on Scroll ──────
      const camZ = isMob ? (6.4 - scrollCur * 1.0) : (7.0 - scrollCur * 1.2);
      camera.position.set(
        smx * (isMob ? 0.18 : 0.32) + Math.sin(scrollCur * Math.PI) * 0.35,
        -smy * (isMob ? 0.14 : 0.24) - scrollCur * 0.4,
        camZ
      );
      camera.rotation.set(-smy * 0.016, -smx * 0.020, scrollCur * 0.6);
      renderer.render(scene, camera);

      if (!firstFrameDone) {
        firstFrameDone = true;
        setVisible(true);
        onReady?.();
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPtr);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
      geo.dispose();
      eGeo.dispose();
      mat.dispose();
      eMat.dispose();
      renderer.dispose();
    };
  }, [onReady]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1.0s ease",
      }}
    />
  );
}


