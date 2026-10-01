import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BRAND = "THE ANGAAR LABS";
const words = BRAND.split(" ");

// Stable mobile check
const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 768 || navigator.maxTouchPoints > 0);

/**
 * Cinematic opening: ignition → flame → text reveal → slash → curtain wipe.
 * Transparent background lets the 3D particle fire glow through underneath.
 * Click / Esc / Enter skips.
 */
export default function Intro({ onReveal }: { onReveal: () => void }) {
  const [show, setShow] = useState(true);
  const finish = useCallback(() => {
    setShow(false);
    onReveal();
  }, [onReveal]);

  // Auto-dismiss + keyboard skip
  useEffect(() => {
    const duration = IS_MOBILE ? 3400 : 4000;
    const t = setTimeout(finish, duration);
    const k = (e: KeyboardEvent) => (e.key === "Escape" || e.key === "Enter") && finish();
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          role="dialog"
          aria-label="The Angaar Labs intro"
          onClick={finish}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden"
          style={{
            background: "rgba(6,5,4,0.75)",
            backdropFilter: "blur(2px)",
          }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >


          {/* Radial ignition glow */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: IS_MOBILE ? [0, 0.6, 0.3] : [0, 0.9, 0.5], scale: [0.3, 1.4, 1.0] }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], times: [0, 0.4, 1] }}
            style={{
              background: "radial-gradient(ellipse 55% 60% at 50% 52%, rgba(255,100,0,0.35) 0%, rgba(255,50,0,0.18) 35%, transparent 70%)",
            }}
          />

          {/* Outer atmospheric halo */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: IS_MOBILE ? 0.3 : 0.6 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,70,0,0.10) 0%, transparent 65%)",
            }}
          />

          {/* ── Flame Icon ── */}
          <motion.div
            className="relative mb-6 sm:mb-8 z-10"
            initial={{ scale: 0, opacity: 0, filter: "blur(30px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: IS_MOBILE ? 0.8 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer glow ring */}
            <motion.div
              aria-hidden
              className="absolute -inset-6 rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ background: "radial-gradient(circle, rgba(255,122,26,0.4) 0%, transparent 70%)" }}
            />

            <div
              className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl p-3"
              style={{
                background: "linear-gradient(145deg, rgba(255,122,26,0.15) 0%, rgba(20,17,15,0.9) 100%)",
                border: "1px solid rgba(255,122,26,0.5)",
                boxShadow: "0 0 40px rgba(255,100,0,0.5), 0 0 80px rgba(255,80,0,0.25), inset 0 1px 0 rgba(255,200,80,0.2)",
              }}
            >
              <svg width="46" height="52" viewBox="0 0 32 36" fill="none" aria-hidden>
                <path
                  d="M17.5 1.5C21 8.5 30.5 13 30.5 23.5C30.5 29.8 24.5 34.5 16 34.5C7.5 34.5 1.5 29.5 1.5 23.5C1.5 18 5 15 8 15C6.5 19 8.5 21.5 11 21C11.5 16 14.5 10 17.5 1.5Z"
                  fill="url(#intro-flame-g)"
                />
                <path d="M16 30C19.5 30 22 27.5 22 24C22 19 18 16 16 12C14.5 16 11 19.5 11 24C11 27.5 13 30 16 30Z" fill="#FFFBE8" opacity="0.95" />
                <defs>
                  <linearGradient id="intro-flame-g" x1="16" y1="1.5" x2="16" y2="34.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF5CC" />
                    <stop offset="0.18" stopColor="#FFD04A" />
                    <stop offset="0.55" stopColor="#FF6B0F" />
                    <stop offset="1" stopColor="#C91800" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* ── Brand Name ── */}
          <div className="relative z-10 flex flex-col items-center gap-2 px-4">
            <div className="flex items-baseline gap-2 sm:gap-4 flex-wrap justify-center">
              {words.map((word, wi) => (
                <div key={wi} className="overflow-hidden">
                  <motion.span
                    className="inline-block font-display font-black tracking-[.10em] sm:tracking-[.12em] leading-none"
                    style={{
                      fontSize: IS_MOBILE ? "clamp(2.2rem, 11vw, 4rem)" : "clamp(2.8rem, 10vw, 7.5rem)",
                      background: wi === 1
                        ? "linear-gradient(120deg, #FFF5CC 0%, #FFD04A 30%, #FF6B0F 65%, #C91800 100%)"
                        : "linear-gradient(120deg, #FAF6F0 0%, #C4BCB5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(255,100,20,0.5))",
                      textShadow: "none",
                    }}
                    initial={{ y: "110%", opacity: 0, skewY: 5 }}
                    animate={{ y: "0%", opacity: 1, skewY: 0 }}
                    transition={{
                      delay: 0.5 + wi * 0.15,
                      duration: IS_MOBILE ? 0.65 : 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Sub-label */}
            <motion.p
              className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] sm:tracking-[0.5em]"
              style={{ color: "rgba(196,188,181,0.7)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: IS_MOBILE ? 1.2 : 1.6, duration: 0.7 }}
            >
              Digital Innovation Studio
            </motion.p>
          </div>

          {/* ── Horizontal blaze slash ── */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 z-20"
            style={{
              top: "50%",
              height: "2px",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,180,40,0.05) 15%, rgba(255,200,60,0.95) 50%, rgba(255,180,40,0.05) 85%, transparent 100%)",
              boxShadow: "0 0 20px 6px rgba(255,150,20,0.4), 0 0 60px 20px rgba(255,80,0,0.2)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              delay: IS_MOBILE ? 1.0 : 1.3,
              duration: 0.9,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut",
            }}
          />

          {/* ── HUD corner brackets ── */}
          {[
            "top-4 sm:top-6 left-4 sm:left-6 border-t border-l",
            "top-4 sm:top-6 right-4 sm:right-6 border-t border-r",
            "bottom-4 sm:bottom-6 left-4 sm:left-6 border-b border-l",
            "bottom-4 sm:bottom-6 right-4 sm:right-6 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`pointer-events-none absolute h-6 w-6 sm:h-8 sm:w-8 ${cls}`}
              style={{ borderColor: "rgba(255,122,26,0.45)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
            />
          ))}

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 sm:bottom-10 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] sm:tracking-[0.4em]"
            style={{ color: "rgba(158,150,144,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: IS_MOBILE ? 1.4 : 1.8 }}
          >
            Tap anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
