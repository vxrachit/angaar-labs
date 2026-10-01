import { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Eye, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";


// Direct static ES imports for Solena images
import s01 from "../../assets/solena/01_frame_008_enhanced.jpg";
import s02 from "../../assets/solena/02_frame_009_enhanced.jpg";
import s03 from "../../assets/solena/03_frame_013_enhanced.jpg";
import s04 from "../../assets/solena/04_frame_015_enhanced.jpg";
import s05 from "../../assets/solena/05_frame_020_enhanced.jpg";
import s06 from "../../assets/solena/06_frame_023_enhanced.jpg";
import s07 from "../../assets/solena/07_frame_025_enhanced.jpg";
import s08 from "../../assets/solena/08_frame_029_enhanced.jpg";
import s09 from "../../assets/solena/09_frame_030_enhanced.jpg";
import s10 from "../../assets/solena/10_frame_033_enhanced.jpg";
import s11 from "../../assets/solena/11_frame_038_enhanced.jpg";
import s12 from "../../assets/solena/12_frame_039_enhanced.jpg";

const solenaFrames = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12];

// Direct static ES imports for Hillwood images
import h01 from "../../assets/hillwood/01_frame_001_enhanced.jpg";
import h02 from "../../assets/hillwood/02_frame_004_enhanced.jpg";
import h03 from "../../assets/hillwood/03_frame_007_enhanced.jpg";
import h04 from "../../assets/hillwood/04_frame_010_enhanced.jpg";
import h05 from "../../assets/hillwood/05_frame_013_enhanced.jpg";
import h06 from "../../assets/hillwood/06_frame_016_enhanced.jpg";
import h07 from "../../assets/hillwood/07_frame_018_enhanced.jpg";
import h08 from "../../assets/hillwood/08_frame_021_enhanced.jpg";
import h09 from "../../assets/hillwood/09_frame_024_enhanced.jpg";
import h10 from "../../assets/hillwood/10_frame_027_enhanced.jpg";
import h11 from "../../assets/hillwood/11_frame_030_enhanced.jpg";
import h12 from "../../assets/hillwood/12_frame_033_enhanced.jpg";

const hillwoodFrames = [h01, h02, h03, h04, h05, h06, h07, h08, h09, h10, h11, h12];

gsap.registerPlugin(ScrollTrigger);

// ─── 3D Spatial Holographic Cinema Viewport ──────────────────────────────────
function Futuristic3DViewport({
  frames,
  title,
  domain,
  accent,
  projectIdx,
}: {
  frames: string[];
  title: string;
  domain: string;
  accent: string;
  projectIdx: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [mode, setMode] = useState<"stream" | "scrub">("stream");
  const [speed, setSpeed] = useState<number>(48);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  const animYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  // Reactive mobile detection — handles initial render AND orientation changes
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && (window.innerWidth < 768 || navigator.maxTouchPoints > 0)
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload frames for instantaneous rendering
  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  // Smooth continuous auto-scroll loop (desktop RAF / mobile CSS animation)
  useEffect(() => {
    if (isMobile) return; // Mobile uses CSS animation — no RAF needed

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (mode === "stream" && !isHovered && scrollTrackRef.current && cardRef.current) {
        const totalHeight = scrollTrackRef.current.scrollHeight;
        const viewHeight = cardRef.current.clientHeight || 440;
        const maxScroll = Math.max(1, totalHeight - viewHeight);

        animYRef.current += speed * dt;
        if (animYRef.current > maxScroll) animYRef.current = 0;
        scrollTrackRef.current.style.transform = `translate3d(0, -${animYRef.current}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mode, isHovered, speed, isMobile]);

  // 3D Spatial Tilt Physics — desktop only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 18, glareX: Math.round(px * 100), glareY: Math.round(py * 100) });
    if (scrollTrackRef.current && mode === "stream") {
      const totalHeight = scrollTrackRef.current.scrollHeight;
      const viewHeight = cardRef.current.clientHeight || 440;
      const targetY = py * Math.max(1, totalHeight - viewHeight);
      animYRef.current = targetY;
      scrollTrackRef.current.style.transform = `translate3d(0, -${targetY}px, 0)`;
    } else if (scrollTrackRef.current && mode === "scrub") {
      setActiveFrameIndex(Math.min(frames.length - 1, Math.floor((y / rect.height) * frames.length)));
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: isMobile ? "none" : "1200px" }}
    >
      {/* Dynamic 3D Spatial Hologram Rig */}
      <div
        ref={cardRef}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative w-full rounded-[20px] sm:rounded-[28px] p-2 sm:p-3 transition-transform duration-200 ease-out cursor-ns-resize"
        style={{
          transform: isMobile ? "none" : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${isHovered ? "20px" : "0px"})`,
          transformStyle: isMobile ? "flat" : "preserve-3d",
          background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(20,16,13,0.95) 40%, rgba(8,6,5,0.98) 100%)`,
          boxShadow: `0 20px 60px -15px rgba(0,0,0,0.9), 0 0 40px -15px ${accent}40, inset 0 1px 1px rgba(255,255,255,0.2)`,
        }}
      >
        {/* Holographic Chamfered Corner Fins */}
        <div
          className="pointer-events-none absolute -top-2 -left-2 h-7 w-7 border-t-2 border-l-2 rounded-tl-xl transition-all duration-300"
          style={{ borderColor: accent, boxShadow: `-2px -2px 10px ${accent}` }}
        />
        <div
          className="pointer-events-none absolute -top-2 -right-2 h-7 w-7 border-t-2 border-r-2 rounded-tr-xl transition-all duration-300"
          style={{ borderColor: accent, boxShadow: `2px -2px 10px ${accent}` }}
        />
        <div
          className="pointer-events-none absolute -bottom-2 -left-2 h-7 w-7 border-b-2 border-l-2 rounded-bl-xl transition-all duration-300"
          style={{ borderColor: accent, boxShadow: `-2px 2px 10px ${accent}` }}
        />
        <div
          className="pointer-events-none absolute -bottom-2 -right-2 h-7 w-7 border-b-2 border-r-2 rounded-br-xl transition-all duration-300"
          style={{ borderColor: accent, boxShadow: `2px 2px 10px ${accent}` }}
        />

        {/* Dynamic Specular Glare Overlay — desktop only */}
        {!isMobile && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* ── Futuristic Cockpit Header ── */}
        <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-[20px] sm:rounded-t-[22px]"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          {/* Telemetry Status Lights */}
          <div className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full animate-pulse"
              style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
            />
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/90 font-bold uppercase tracking-wider">
              <span>{domain}</span>
            </div>
          </div>

          {/* Soundwave Telemetry Simulator */}
          <div className="hidden sm:flex items-center gap-1">
            <span className="h-3 w-0.5 rounded-full bg-flame animate-pulse" />
            <span className="h-4 w-0.5 rounded-full bg-amber-400" />
            <span className="h-2 w-0.5 rounded-full bg-flame/60" />
            <span className="h-5 w-0.5 rounded-full bg-flame" />
            <span className="h-3 w-0.5 rounded-full bg-amber-300" />
          </div>

          {/* Mode Switcher & Speed Dial */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(mode === "stream" ? "scrub" : "stream")}
              className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white transition-all hover:border-flame hover:text-flame hover:bg-flame/10"
            >
              <Layers size={10} />
              <span>{mode === "stream" ? "STREAM" : "GALLERY"}</span>
            </button>

            <button
              onClick={() => setSpeed(speed === 48 ? 110 : speed === 110 ? 0 : 48)}
              className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-bold text-muted-light hover:text-white"
              title="Toggle Scroll Velocity"
            >
              {speed === 0 ? "PAUSE" : speed === 110 ? "WARP" : "1X"}
            </button>
          </div>
        </div>

        {/* ── Main Viewport Chassis ── */}
        <div className="relative h-[260px] sm:h-[380px] md:h-[460px] lg:h-[480px] w-full overflow-hidden bg-[#050403] rounded-b-[20px] sm:rounded-b-[22px]">
          {/* Subtle Cyber Vignettes & Scanlines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-black/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

          {/* Mode 1: Continuous Smooth High-FPS Website Stream */}
          {mode === "stream" ? (
            <div
              ref={scrollTrackRef}
              className="w-full will-change-transform"
              style={{
                transition: isHovered ? "transform 50ms linear" : "none",
                // Mobile: CSS animation on duplicated frames for seamless -50% loop
                ...(isMobile ? {
                  animation: `mobileScroll ${frames.length * 2.8}s linear infinite`,
                } : {}),
              }}
            >
              {/* Render frames twice on mobile so the CSS -50% loop is seamless */}
              {(isMobile ? [...frames, ...frames] : frames).map((src, idx) => (
                <div key={idx} className="relative w-full border-b border-white/5 bg-[#080605]">
                  <img
                    src={src}
                    alt={`${title} - View ${idx % frames.length + 1}`}
                    className="w-full object-cover block"
                    loading={idx < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Mode 2: Keyframe Gallery Mode */
            <div className="relative h-full w-full">
              {frames.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    activeFrameIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${title} - Keyframe ${idx + 1}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Laser Progress Gauge (Right Rail) */}
          <div className="pointer-events-none absolute right-3 top-4 bottom-16 z-30 w-1 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
            <div
              className="w-full rounded-full transition-all duration-100"
              style={{
                background: `linear-gradient(180deg, ${accent} 0%, #FF5500 100%)`,
                boxShadow: `0 0 12px ${accent}`,
                height: mode === "stream" ? "22%" : `${100 / frames.length}%`,
                transform:
                  mode === "stream"
                    ? `translateY(${Math.min(400, (animYRef.current / (frames.length * 350)) * 400)}%)`
                    : `translateY(${activeFrameIndex * 100}%)`,
              }}
            />
          </div>

          {/* Floating HUD Live Indicator Capsule */}
          <div className="pointer-events-none absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-3 z-30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-black/85 px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-mono font-semibold text-white backdrop-blur-md shadow-xl">
              <Eye size={11} className="text-flame animate-pulse" />
              <span className="hidden sm:inline">
                {isHovered ? "3D SPATIAL SCRUB" : mode === "stream" ? "AUTOPILOT" : `FRAME ${activeFrameIndex + 1}/${frames.length}`}
              </span>
              <span className="sm:hidden">{mode === "stream" ? "LIVE" : `${activeFrameIndex + 1}/${frames.length}`}</span>
            </div>

            <div
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border px-2 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] font-bold backdrop-blur-md shadow-lg"
              style={{ color: accent, borderColor: `${accent}50`, background: `${accent}15` }}
            >
              <Sparkles size={10} />
              <span>{frames.length} FRAMES</span>
            </div>
          </div>
        </div>

        {/* ── Keyframe Thumbnails Hex Rail ── */}
        <div className="relative z-20 flex items-center justify-between border-t border-white/10 bg-black/70 px-3 sm:px-4 py-2 rounded-b-[20px] sm:rounded-b-[22px] backdrop-blur-xl gap-2">
          <span className="font-mono text-[10px] text-muted-light uppercase tracking-wider shrink-0">
            Scrub:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar min-w-0">
            {frames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setMode("scrub"); setActiveFrameIndex(idx); }}
                onMouseEnter={() => { if (mode === "scrub") setActiveFrameIndex(idx); }}
                className={`h-5 min-w-[18px] sm:min-w-5 rounded border px-1 sm:px-1.5 font-mono text-[8px] sm:text-[9px] font-bold transition-all shrink-0 ${
                  mode === "scrub" && activeFrameIndex === idx
                    ? "border-flame bg-flame text-black shadow-[0_0_10px_#FF7A1A]"
                    : "border-white/10 bg-white/5 text-muted-light hover:border-white/30 hover:text-white"
                }`}
              >
                {(idx + 1).toString().padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Flagship Projects Database ──────────────────────────────────────────────
const FLAGSHIPS = [
  {
    slug: "solena",
    index: "01",
    tagline: "3D Spatial Architecture & Walkthrough",
    title: "Solena Architectural Sanctuary",
    domain: "solena.sanctuary.design",
    description: "A cinematic spatial flagship and real-time 3D walkthrough engineered for an ultra-luxury coastal estate. Integrates dynamic sunlight orientation shaders, buttery WebGL frame transitions, and bespoke acoustic engineering.",
    accent: "#FF7A1A",
    accentLight: "#FFA04D",
    kpi: "+480% Inbound Growth",
    metrics: [
      { label: "Pipeline Surge", value: "+480%" },
      { label: "WebGL FPS", value: "120 FPS" },
      { label: "Core Web Vitals", value: "100/100" },
    ],
    tags: ["Three.js", "WebGL Shaders", "Spatial Audio", "GSAP ScrollTrigger", "Vite"],
    frames: solenaFrames,
  },
  {
    slug: "hillwood",
    index: "02",
    tagline: "Bespoke Estates & Spatial Commerce",
    title: "Hillwood Luxury Living",
    domain: "hillwood.living.estates",
    description: "High-fashion lifestyle platform with fluid editorial visual storytelling, full-bleed interactive room tours, micro-inertia physics, and sub-second page rendering for high-net-worth real estate buyers.",
    accent: "#FFC83B",
    accentLight: "#FFE082",
    kpi: "+390% Engagement Lift",
    metrics: [
      { label: "Dwell Time", value: "5m 42s" },
      { label: "Conversion Lift", value: "+390%" },
      { label: "First Paint", value: "0.32s" },
    ],
    tags: ["React 19", "Headless CMS", "Interactive Canvas", "Lenis Smooth Scroll"],
    frames: hillwoodFrames,
  },
];

export default function Work() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const secRef = useRef<HTMLElement>(null);
  const activeProj = FLAGSHIPS[activeProjectIdx];

  return (
    <section
      id="work"
      ref={secRef}
      className="relative flex flex-col justify-center overflow-hidden py-16 sm:py-24 md:py-36"
    >
      {/* ── Ambient Glowing Atmospheric Plasma ── */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/4 h-[650px] w-[650px] rounded-full opacity-25 blur-[220px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeProj.accent} 0%, #FF5500 45%, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute left-10 bottom-1/4 h-[550px] w-[550px] rounded-full opacity-15 blur-[180px]"
        style={{ background: "radial-gradient(circle, #FFC83B 0%, #8B2200 50%, transparent 75%)" }}
      />

      {/* Cyber Grid Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,122,26,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,122,26,.8) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Section Header ── */}
      <div className="shell mb-8 sm:mb-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-flame shadow-[0_0_8px_#FF7A1A]" />
                <p className="eyebrow !text-flame">02 — Selected Works & Flagships</p>
              </div>
              <h2 className="h-display mt-4 text-[clamp(2rem,7vw,5.8rem)] leading-[0.93]">
                Selected <span className="ember-text">Flagships.</span>
              </h2>
            </div>

            {/* Project Selector Cockpit HUD */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl shadow-2xl">
              {FLAGSHIPS.map((p, idx) => (
                <button
                  key={p.slug}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-all duration-300 ${
                    activeProjectIdx === idx
                      ? "border border-flame/60 bg-flame/20 text-white shadow-[0_0_20px_-5px_#FF7A1A]"
                      : "text-muted-light hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: activeProjectIdx === idx ? p.accent : "rgba(255,255,255,0.3)",
                      boxShadow: activeProjectIdx === idx ? `0 0 8px ${p.accent}` : "none",
                    }}
                  />
                  <span>{p.index} // {p.title.split(" ")[0].toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Active 3D Spatial Hologram Stage ── */}
      <div className="shell">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start lg:items-center">
          
          {/* Left Column: 3D Spatial Viewport Rig (Span 7) */}
          <div className="lg:col-span-7 w-full">
            <Futuristic3DViewport
              key={activeProj.slug}
              frames={activeProj.frames}
              title={activeProj.title}
              domain={activeProj.domain}
              accent={activeProj.accent}
              projectIdx={activeProj.index}
            />
          </div>

          {/* Right Column: Holographic Command Matrix (Span 5) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Top Status Capsule */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-ink backdrop-blur-md">
                <span
                  className="inline-block h-2 w-2 rounded-full animate-pulse"
                  style={{ background: activeProj.accent, boxShadow: `0 0 8px ${activeProj.accent}` }}
                />
                <span className="font-semibold tracking-wider">
                  SYSTEM // {activeProj.index} — {activeProj.tagline.toUpperCase()}
                </span>
              </div>

              <div
                className="flex items-center gap-1.5 rounded-full border px-3.5 py-1 font-bold shadow-lg"
                style={{
                  color: activeProj.accent,
                  borderColor: `${activeProj.accent}50`,
                  background: `${activeProj.accent}18`,
                  boxShadow: `0 0 20px -5px ${activeProj.accent}40`,
                }}
              >
                <CheckCircle2 size={13} />
                <span>{activeProj.kpi}</span>
              </div>
            </div>

            {/* Display Title */}
            <h3 className="h-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-ink">
              {activeProj.title}
            </h3>

            {/* Narrative Story */}
            <p className="text-base sm:text-lg leading-relaxed text-muted-light">
              {activeProj.description}
            </p>

            {/* 3D Holographic Verified Performance Metrics Matrix */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4 backdrop-blur-xl">
              {activeProj.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-mono text-[10px] text-muted-light uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span
                    className="font-mono text-lg sm:text-xl lg:text-2xl font-black tracking-tight mt-1"
                    style={{ color: activeProj.accent }}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeProj.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium text-white/80 transition-colors hover:border-flame hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Interactive Inquire CTA */}
            <div className="pt-2">
              <a
                href="#contact"
                className="group/btn inline-flex items-center justify-between gap-3 w-full rounded-2xl border border-white/20 bg-white/5 px-5 sm:px-7 py-3.5 sm:py-4 font-mono text-xs font-bold text-ink backdrop-blur-xl transition-all duration-300 hover:border-transparent hover:text-black hover:shadow-glow"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = activeProj.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              >
                <span>ENGAGE FLAGSHIP CASE STUDY</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 shrink-0" />
              </a>
            </div>

          </div>
        </div>

        {/* ── Bottom Dual-Flagship Preview Bar ── */}
        <Reveal delay={0.15}>
          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-white/10 pt-6 sm:pt-8">
            {FLAGSHIPS.map((p, idx) => (
              <div
                key={p.slug}
                onClick={() => setActiveProjectIdx(idx)}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeProjectIdx === idx
                    ? "border-flame/50 bg-flame/10 shadow-[0_0_25px_-10px_#FF7A1A]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-lg font-black"
                    style={{ color: p.accent }}
                  >
                    {p.index}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-ink group-hover:text-white transition-colors">
                      {p.title}
                    </h4>
                    <p className="font-mono text-[10px] text-muted-light">
                      {p.kpi} • {p.domain}
                    </p>
                  </div>
                </div>

                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-light transition-all group-hover:text-white"
                  style={{
                    background: activeProjectIdx === idx ? p.accent : undefined,
                    color: activeProjectIdx === idx ? "#000" : undefined,
                  }}
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

