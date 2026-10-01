import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Compass, Layers, Rocket, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const S = [
  {
    icon: Compass,
    title: "01 / Discovery & Architecture",
    tagline: "Uncovering the Unique Core",
    desc: "We analyze your audience, competitive landscape, technical constraints, and brand ambitions to blueprint an unfair digital advantage.",
    deliverables: ["Product Roadmap", "Information Architecture", "Tech Stack Blueprint"],
  },
  {
    icon: Layers,
    title: "02 / Kinetic Design & 3D Prototyping",
    tagline: "Bespoke Visual Mastery",
    desc: "We forge interactive art directions, custom 3D point clouds, GLSL shaders, typography pairings, and micro-interactions in high fidelity.",
    deliverables: ["Interactive 3D Mocks", "Design Token System", "Kinetic Motion Specs"],
  },
  {
    icon: Code2,
    title: "03 / Precision Engineering",
    tagline: "Sub-Second Performance Code",
    desc: "We construct the entire application from raw code — zero bloat, maximum responsiveness, fluid 60+ FPS WebGL shaders, and ironclad security.",
    deliverables: ["Custom Frontend Code", "WebGL Particle Engine", "SEO & Speed 100/100"],
  },
  {
    icon: Rocket,
    title: "04 / Global Ignition & Scale",
    tagline: "Flawless Deployment & Growth",
    desc: "We orchestrate edge-accelerated CDN deployments, automated analytics pipelines, telemetry health monitors, and continuous iteration.",
    deliverables: ["Edge CDN Deployment", "Real-Time Telemetry", "Post-Launch Growth"],
  },
] as const;

export default function Process() {
  const sec = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip pinned scroll on mobile — too laggy
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sec.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        onUpdate: (s) => {
          if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`;
          if (dot.current) dot.current.style.left = `${s.progress * 100}%`;
          setActive(Math.min(3, Math.floor(s.progress * 4)));
        },
      });
    }, sec);
    return () => ctx.revert();
  }, [isMobile]);

  const currentStep = S[active];
  const Icon = currentStep.icon;

  // ── Mobile: Accordion layout ──────────────────────────────────
  if (isMobile) {
    return (
      <section id="process" ref={sec} className="relative py-16 overflow-hidden">
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-ember/15 blur-[120px]" />
        <div className="shell relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-flame" />
            <p className="eyebrow !text-flame">03 — Execution Engine</p>
          </div>
          <h2 className="h-display mb-8 text-[clamp(2rem,8vw,3.5rem)] leading-[0.95]">
            Our <span className="ember-text">Process.</span>
          </h2>

          <div className="space-y-3">
            {S.map((step, i) => {
              const StepIcon = step.icon;
              const isOpen = active === i;
              return (
                <div
                  key={step.title}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? "border-flame/40 bg-surface/80" : "border-white/10 bg-surface/40"}`}
                  onClick={() => setActive(i)}
                >
                  <div className="flex items-center gap-4 p-4">
                    <span
                      className="font-mono text-2xl font-black shrink-0 tabular-nums"
                      style={{ color: isOpen ? "#FF7A1A" : "rgba(255,255,255,0.3)" }}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm leading-tight transition-colors ${isOpen ? "text-ink" : "text-muted-light"}`}>
                        {step.title.split("/")[1]?.trim() || step.title}
                      </p>
                      <p className="font-mono text-[10px] text-muted mt-0.5 truncate">{step.tagline}</p>
                    </div>
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300"
                      style={{
                        borderColor: isOpen ? "rgba(255,122,26,0.5)" : "rgba(255,255,255,0.1)",
                        background: isOpen ? "rgba(255,122,26,0.15)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <StepIcon size={15} style={{ color: isOpen ? "#FF7A1A" : "#9E9690" }} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-white/10 pt-4">
                          <p className="text-sm leading-relaxed text-muted-light">{step.desc}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {step.deliverables.map((item) => (
                              <span
                                key={item}
                                className="rounded-lg border border-flame/20 bg-flame/5 px-3 py-1 text-xs font-medium text-ink"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: Cinematic pinned scroll ──────────────────────────
  return (
    <section id="process" ref={sec} className="relative flex min-h-screen flex-col justify-center py-20">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-ember/15 blur-[140px]" />

      <div className="shell relative z-10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-flame" />
          <p className="eyebrow !text-flame">03 — Execution Engine</p>
        </div>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-ember/10 px-4 py-1.5 text-xs font-bold text-flame">
                  <Sparkles size={13} /> {currentStep.tagline}
                </div>
                <span className="h-display ember-text block text-[clamp(6rem,18vw,14rem)]">
                  0{active + 1}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-surface/80 p-8 shadow-lift backdrop-blur-xl md:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-flame/30 bg-gradient-to-br from-flame/20 to-ember/10 text-gold shadow-glow">
                <Icon size={28} />
              </div>
              <h3 className="h-display mt-6 text-3xl font-extrabold text-ink md:text-4xl">
                {currentStep.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-light md:text-lg">
                {currentStep.desc}
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">
                  Key Artifacts & Milestones:
                </span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {currentStep.deliverables.map((item) => (
                    <span key={item} className="rounded-lg border border-white/10 bg-surface px-3 py-1 text-xs font-medium text-ink">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-20">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div ref={bar} className="h-full origin-left bg-gradient-to-r from-deep via-ember to-gold shadow-glow" style={{ transform: "scaleX(0)" }} />
          </div>
          <div ref={dot} className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gold shadow-[0_0_24px_10px_rgba(255,122,26,.85)]" />
        </div>

        <div className="mt-6 grid grid-cols-4 text-center text-xs font-semibold uppercase tracking-wider">
          {S.map((step, i) => (
            <span key={step.title} className={`transition-colors duration-300 ${i <= active ? "text-flame font-bold" : "text-muted"}`}>
              {step.title.split("/")[1]?.trim() || step.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
