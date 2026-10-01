import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sc } from "./lib/scroll";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Scene3D from "./components/Scene3D";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import { Stats, Testimonials, Cta } from "./components/Closing";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 768 || navigator.maxTouchPoints > 0);

export default function App() {
  const skip = reduced() || sessionStorage.getItem("angaar-intro") === "1";
  const [sceneReady, setSceneReady] = useState(skip);
  const [ready, setReady] = useState(skip);

  useEffect(() => {
    let lastY = window.scrollY;
    const upd = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = window.scrollY;
      sc.p = Math.min(1, Math.max(0, currentY / maxScroll));
      sc.v = (currentY - lastY) / Math.max(16, window.innerHeight * 0.1);
      lastY = currentY;
    };
    window.addEventListener("scroll", upd, { passive: true });
    upd();

    if (reduced() || IS_MOBILE) {
      // Mobile: native touch scrolling
      return () => window.removeEventListener("scroll", upd);
    }

    const lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      if (typeof e.velocity === "number") {
        sc.v = e.velocity * 0.1;
      }
    });
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      window.removeEventListener("scroll", upd);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Safety fallback: unblock if WebGL context takes time
  useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setSceneReady(true), 1800);
    return () => clearTimeout(t);
  }, [skip]);

  const handleReady = () => setSceneReady(true);

  return (
    <>
      {/* ── Core 3D Fire Flame Scene (WebGL Particle Engine) ── */}
      <Scene3D onReady={handleReady} />

      {/* Holding overlay: smoothly reveals as soon as 3D fire renders frame 1 */}
      {!skip && (
        <div
          aria-hidden
          className="fixed inset-0 z-[99] pointer-events-none"
          style={{
            background: "#060504",
            opacity: sceneReady ? 0 : 1,
            transition: sceneReady ? "opacity 0.7s ease" : "none",
            visibility: sceneReady ? "hidden" : "visible",
          }}
        />
      )}

      {/* Intro cinematic animation */}
      {!skip && sceneReady && (
        <Intro onReveal={() => {
          sessionStorage.setItem("angaar-intro", "1");
          setReady(true);
        }} />
      )}

      {/* Dynamic Background Scrim: lets 3D fire flame shine brightly while ensuring crystal-clear text readability */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: IS_MOBILE
            ? "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(8,7,6,0.15) 0%, rgba(8,7,6,0.70) 65%, rgba(8,7,6,0.95) 100%)"
            : "linear-gradient(to right, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.5) 40%, transparent 70%)",
        }}
      />

      <Navbar ready={ready} />
      <main className="relative z-10">
        <Hero ready={ready} />
        <Services />
        <Work />
        <Process />
        <Stats />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
      {/* Grain overlay: desktop only */}
      {!IS_MOBILE && <div className="grain" aria-hidden />}
    </>
  );
}

