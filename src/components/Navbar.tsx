import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroReveal, EASE_SOFT } from "./Shared";
import { useNav, ROUTES } from "../lib/router";

function useISTClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { route, navigate } = useNav();
  const time = useISTClock();

  const go = (r: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate(r as "/");
  };

  return (
    <>
      <HeroReveal delay={0.1} blur={6} y={-20} className="fixed inset-x-0 top-0 z-[150]">
        <header className="flex items-center justify-between px-6 py-4 md:px-12 bg-paper/80 backdrop-blur-md border-b border-ink/10">
          <button onClick={go("/")} className="flex items-center gap-2.5 text-left group">
            <img 
              src="/images/techfoundry-logo.png" 
              alt="TechFoundry Logo" 
              className="tf-logo h-7 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity" 
            />
            <span className="serif text-xl text-ink md:text-2xl font-normal tracking-tight">
              TechFoundry
            </span>
          </button>

          <nav className="hidden items-center gap-1 text-[15px] md:flex">
            {ROUTES.map((l, i) => (
              <span key={l.n} className="flex items-center">
                <a
                  href={l.path}
                  onClick={go(l.path)}
                  className={`group flex items-center gap-1.5 px-3 py-1 transition-colors duration-200 font-medium ${route === l.path ? "text-ink font-semibold" : "text-ash hover:text-ink"}`}
                >
                  <span className={`paren text-[12px] ${route === l.path ? "text-ember font-bold" : "text-ash group-hover:text-ember"}`}>
                    ({l.n})
                  </span>
                  <span className={`u-line ${route === l.path ? "always" : ""}`}>{l.label}</span>
                </a>
                {i < ROUTES.length - 1 && <span className="text-ash/40">,</span>}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <span className="hidden font-mono text-[11px] tracking-widest text-ash font-medium lg:block">
              {time} IST
            </span>
            <a
              href="https://theanesthesia.xyz"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-ember/40 bg-ember/10 text-ember font-mono text-[11px] tracking-wider hover:bg-ember hover:text-white transition-all shadow-sm font-semibold"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
              ANESTHESIA ↗
            </a>
            <a
              href="https://r00tgeist.techfoundry.in"
              target="_blank"
              rel="noreferrer"
              className="hidden text-[14px] text-ink font-medium transition-colors hover:text-ember md:block"
            >
              ( r00tgeist ↗ )
            </a>
            <button
              onClick={() => setOpen(v => !v)}
              className="text-[14px] text-ink font-semibold md:hidden"
            >
              {open ? "close" : "menu"}
            </button>
          </div>
        </header>
      </HeroReveal>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[140] flex flex-col bg-paper px-6 pb-10 pt-24"
            initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: EASE_SOFT }}
          >
            <nav className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
              {ROUTES.map((l, i) => (
                <motion.a
                  key={l.n}
                  href={l.path}
                  onClick={go(l.path)}
                  className="flex items-baseline gap-3 py-5"
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.05 + i * 0.06 }}
                >
                  <span className="paren text-[13px] text-ember font-bold">({l.n})</span>
                  <span className="serif text-4xl text-ink font-normal">{l.label}</span>
                </motion.a>
              ))}
              <motion.a
                href="https://theanesthesia.xyz"
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline gap-3 py-5"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.25 }}
              >
                <span className="paren text-[13px] text-ember font-bold">(✦)</span>
                <span className="serif text-4xl text-ember font-normal">Anesthesia Event ↗</span>
              </motion.a>
              <motion.a
                href="https://r00tgeist.techfoundry.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline gap-3 py-5"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.31 }}
              >
                <span className="paren text-[13px] text-ember font-bold">(↗)</span>
                <span className="serif text-4xl text-ink font-normal">r00tgeist</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
