import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Flame,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const S = [
  {
    id: "01",
    sysCode: "MOD // GLSL-3D",
    icon: Palette,
    title: "Art-Directed 3D & Web Design",
    desc: "Cinematic, award-worthy digital interfaces with bespoke typography, custom GLSL shaders, and visceral brand immersion.",
    tags: ["WebGL", "Three.js", "Design Systems", "Kinetic Motion"],
    metric: "120 FPS",
    metricLabel: "Render Target",
    accent: "#FF7A1A",
  },
  {
    id: "02",
    sysCode: "MOD // CORE-ENGINE",
    icon: Code2,
    title: "Creative Frontend & Systems",
    desc: "Lightning-fast, zero-bloat web applications engineered with modern React, Next.js, TypeScript, and micro-animations.",
    tags: ["React / Vite", "GSAP / Framer", "Sub-second Load", "Clean Architecture"],
    metric: "100/100",
    metricLabel: "Core Web Vitals",
    accent: "#FF5500",
  },
  {
    id: "03",
    sysCode: "MOD // COMMERCE-V",
    icon: ShoppingCart,
    title: "High-Conversion E-Commerce",
    desc: "Flagship digital storefronts crafted for maximum visual prestige, frictionless checkout velocity, and high global conversion.",
    tags: ["Headless Commerce", "Custom Cart", "Global Gateway", "A/B Scaled"],
    metric: "+340%",
    metricLabel: "Avg. Velocity",
    accent: "#FFC83B",
  },
  {
    id: "04",
    sysCode: "MOD // TELEMETRY-UI",
    icon: LayoutDashboard,
    title: "Enterprise Dashboards & CRM",
    desc: "Transform complex multi-dimensional datasets into intuitive, elegant visual command centers for instant strategic decisions.",
    tags: ["Real-Time Streams", "Data Viz", "Role Permissions", "Telemetry"],
    metric: "< 10ms",
    metricLabel: "Data Latency",
    accent: "#FB923C",
  },
  {
    id: "05",
    sysCode: "MOD // BRAND-MATRIX",
    icon: Flame,
    title: "Dynamic Brand Identity",
    desc: "Living digital identities, glowing iconographies, custom typography, and complete futuristic design languages that burn bright.",
    tags: ["Brand DNA", "3D Kinetic Assets", "Design Guidelines", "Art Direction"],
    metric: "100%",
    metricLabel: "Bespoke DNA",
    accent: "#FF3300",
  },
  {
    id: "06",
    sysCode: "MOD // FORTRESS-OPS",
    icon: ShieldCheck,
    title: "Edge Performance & Security",
    desc: "Continuous sub-second edge optimizations, vulnerability hardening, 99.99% uptime guarantees, and dedicated infrastructure.",
    tags: ["Edge CDN", "SSL / OWASP", "Global Cache", "24/7 Guardian"],
    metric: "99.99%",
    metricLabel: "SLA Uptime",
    accent: "#F59E0B",
  },
] as const;

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 55,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: (i % 3) * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(idx);
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="shell relative py-32 md:py-40 overflow-hidden"
    >
      {/* Dynamic Ambient Background Illumination */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[160px]"
        style={{
          background: "radial-gradient(circle, #FF5500 0%, #FF7A1A 30%, transparent 70%)",
        }}
      />

      {/* Cyber Grid Subtle Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,122,26,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,26,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Header Section */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-flame shadow-[0_0_15px_rgba(255,122,26,0.2)]">
            <Activity size={12} className="animate-pulse" />
            01 // Core Capabilities
          </span>
          <span className="text-xs font-mono text-muted tracking-wider">
            [ ARCHITECTURE &bull; 3D SYSTEMS &bull; PRODUCTION ]
          </span>
        </div>

        <h2 className="h-display mt-5 max-w-4xl text-[clamp(2.5rem,7vw,5.8rem)] leading-[0.93]">
          Engineered to amaze. <br />
          Built to <span className="ember-text">ignite.</span>
        </h2>

        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="max-w-xl text-base leading-relaxed text-muted-light md:text-lg">
            We merge cutting-edge creative engineering with cinema-grade visual craft to build high-performance digital flagships that captivate users and command industry dominance.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>ACTIVE PROTOCOLS: 06</span>
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span>SPEED SCORE: 99.8</span>
          </div>
        </div>
      </Reveal>

      {/* Futuristic Holographic Capabilities Grid */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {S.map((item, i) => {
          const Icon = item.icon;
          const isHovered = hoveredCard === i;

          return (
            <div
              key={item.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-2"
              style={{
                borderColor: isHovered ? `${item.accent}70` : "rgba(255,255,255,0.08)",
                background: "linear-gradient(145deg, rgba(24, 20, 17, 0.85) 0%, rgba(10, 8, 6, 0.95) 100%)",
                boxShadow: isHovered
                  ? `0 20px 40px -15px ${item.accent}30, 0 0 0 1px ${item.accent}40, inset 0 1px 0 rgba(255,255,255,0.15)`
                  : "0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Dynamic Interactive Mouse Spotlight */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${item.accent}20, transparent 60%)`,
                  }}
                />
              )}

              {/* Sci-Fi HUD Corner Brackets */}
              <span
                className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 transition-all duration-300"
                style={{ borderColor: isHovered ? item.accent : "rgba(255,255,255,0.2)" }}
              />
              <span
                className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 transition-all duration-300"
                style={{ borderColor: isHovered ? item.accent : "rgba(255,255,255,0.2)" }}
              />
              <span
                className="pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 transition-all duration-300"
                style={{ borderColor: isHovered ? item.accent : "rgba(255,255,255,0.2)" }}
              />
              <span
                className="pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 transition-all duration-300"
                style={{ borderColor: isHovered ? item.accent : "rgba(255,255,255,0.2)" }}
              />

              {/* Laser Scanning Line on Hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-pulse"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accent}, #FFF, ${item.accent}, transparent)`,
                  boxShadow: `0 0 12px ${item.accent}`,
                }}
              />

              <div>
                {/* Header Bar inside card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: item.accent,
                        boxShadow: `0 0 8px ${item.accent}`,
                      }}
                    />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      {item.sysCode}
                    </span>
                  </div>

                  <span
                    className="font-mono text-xs font-black px-2 py-0.5 rounded border"
                    style={{
                      borderColor: `${item.accent}35`,
                      backgroundColor: `${item.accent}12`,
                      color: item.accent,
                    }}
                  >
                    {item.id}
                  </span>
                </div>

                {/* Main Hologram Icon Container */}
                <div className="mt-6 flex items-center justify-between">
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${item.accent}40`,
                      background: `radial-gradient(circle at 30% 30%, ${item.accent}30, rgba(15,12,10,0.95))`,
                      boxShadow: `0 0 20px -5px ${item.accent}40`,
                    }}
                  >
                    <Icon size={26} style={{ color: item.accent }} />
                    <div
                      className="pointer-events-none absolute -inset-1 rounded-2xl opacity-20 blur-sm"
                      style={{ background: item.accent }}
                    />
                  </div>

                  {/* Live Metric Display Badge */}
                  <div className="text-right">
                    <div
                      className="font-mono text-sm font-black tracking-tight"
                      style={{ color: item.accent }}
                    >
                      {item.metric}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="h-display mt-6 text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-light">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Tags & Tech Specifications */}
              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-medium text-muted transition-all duration-300 group-hover:border-flame/30 group-hover:bg-flame/5 group-hover:text-muted-light"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Interactive Status Indicator */}
                <div className="mt-4 flex items-center justify-between pt-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted flex items-center gap-1.5">
                    <Zap size={10} className="text-flame" /> READY FOR DEPLOYMENT
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-flame"
                  />
                </div>
              </div>

              {/* Bottom Molten Edge Glow */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                  boxShadow: `0 0 15px ${item.accent}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

