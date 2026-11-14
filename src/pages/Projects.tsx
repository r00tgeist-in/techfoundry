import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  SectionLabel, 
  ULink, 
  FadeIn, 
  SplitTextReveal, 
  PerspectiveCard, 
  DrawingBorder,
  EASE_CUSTOM
} from "../components/Shared";
import Marquee from "../components/Marquee";
import { 
  Cpu, 
  ShieldCheck, 
  CalendarDays, 
  Rocket, 
  Palette, 
  Users, 
  ShieldAlert, 
  Activity, 
  Radio, 
  Binary,
  Wifi,
  TerminalSquare
} from "lucide-react";

const TYPED_TEXT = "$ ./join_crew.sh --handle=r00tgeist --mode=break_to_understand";

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [text, setText] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(TYPED_TEXT.slice(0, i));
      if (i >= TYPED_TEXT.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <motion.div 
      ref={ref}
      whileHover={{ scale: 1.02, scaleY: 0.985 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="border border-ink/15 bg-paper/95 backdrop-blur-xl p-5 md:p-8 rounded-xl shadow-xl relative overflow-hidden group"
    >
      {/* Subtle ember ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-ember/5 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Titlebar */}
      <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-ember" />
          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-600/50" />
          <span className="ml-3 font-mono text-[11px] text-ink/50 hidden sm:inline">bash — 80x24</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-mono text-[11px] text-ink/70 uppercase tracking-widest font-semibold">
            SECURE_HANDSHAKE
          </span>
        </div>
      </div>

      {/* High-tech cyber header with Lucide icons */}
      <div className="mb-5 py-4 px-6 bg-parchment/80 rounded-lg border border-ink/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-ember/15 text-ember">
            <ShieldAlert className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <span className="font-mono text-base font-bold tracking-wider text-ink block leading-none">
              r00t<span className="text-ember">geist</span>
            </span>
            <span className="font-mono text-[10px] text-ash uppercase tracking-widest font-medium">CTF Offensive Lab</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-ember bg-ember/10 border border-ember/30 px-2.5 py-1 rounded font-semibold">
          <TerminalSquare className="h-3.5 w-3.5" />
          <span>UNIT_ONLINE</span>
        </div>
      </div>
      
      {/* Live Cyber Telemetry Console */}
      <div className="relative group overflow-hidden rounded-lg border border-ink/10 bg-parchment/60 p-5 md:p-6 font-mono">
        <div className="scanlines absolute inset-0 opacity-10 pointer-events-none" />
        
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-ink/10 text-[11px]">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span>SIGNAL_STRENGTH: 99.8%</span>
          </div>
          <span className="text-ash font-medium">PORT: 443/80/22 OPEN</span>
        </div>

        {/* Console stream log lines */}
        <div className="space-y-2 text-[12px] md:text-[13px] text-ink/80 font-mono">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-ember" />
            <span className="text-ash">[00:01:42]</span>
            <span>Handshake verified with foundry core node</span>
          </div>
          <div className="flex items-center gap-2">
            <Binary className="h-3.5 w-3.5 text-ember" />
            <span className="text-ash">[00:01:43]</span>
            <span className="text-ink font-semibold">Target: ctf.r00tgeist.in — Recon payload loaded</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-ash">[00:01:44]</span>
            <span className="text-emerald-700 font-semibold">Vulnerability hunt pipeline: ACTIVE</span>
          </div>
        </div>

        {/* Telemetry bottom bar */}
        <div className="mt-5 pt-4 border-t border-ink/10 flex justify-between items-center text-[10px] text-ash uppercase font-semibold">
          <span>LATENCY: 12ms</span>
          <span>PROTOCOL: BREAK_TO_UNDERSTAND</span>
        </div>
      </div>

      {/* Terminal prompt */}
      <div className="mt-6 font-mono text-[13px] md:text-[14px] text-ink leading-relaxed bg-parchment/90 p-4 md:p-5 rounded-lg border-l-2 border-ember border border-ink/10 shadow-sm">
        <span className="text-ember mr-2 font-bold">admin@foundry:~$</span>
        <span className="font-semibold">{text}</span>
        <span className="animate-caret text-ember ml-1">▌</span>
      </div>
    </motion.div>
  );
}

const AREAS = [
  { n: "01", title: "Technology", desc: "Build useful things. Experiment with code, explore new tools and learn through practical projects.", Icon: Cpu },
  { n: "02", title: "Cybersecurity", desc: "Understand how systems work, how they break and how to make them safer.", Icon: ShieldCheck },
  { n: "03", title: "Events", desc: "Bring curious people together through challenges and shared experiences.", Icon: CalendarDays },
  { n: "04", title: "Startups", desc: "Give early ideas a place to develop through collaboration and experimentation.", Icon: Rocket },
  { n: "05", title: "Creative work", desc: "Explore filmmaking, design and storytelling alongside technology.", Icon: Palette },
  { n: "06", title: "Community", desc: "Share knowledge, meet collaborators and make progress together.", Icon: Users },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="px-6 pb-24 pt-48 md:px-12 md:pb-32 md:pt-64 relative bg-transparent overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: -10 }} 
          animate={{ opacity: 0.03, rotate: 0 }} 
          className="absolute -top-10 -right-20 pointer-events-none select-none"
        >
          <span className="serif text-[40vw] leading-none text-ink">WORK</span>
        </motion.div>
        
        <SectionLabel>02 — Work &amp; Exploration</SectionLabel>
        <div className="mt-12">
          <SplitTextReveal 
            text="Less what if." 
            className="serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-ink" 
            delay={0.2}
          />
          <SplitTextReveal 
            text="More what next." 
            className="serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-ember md:ml-[10vw]" 
            delay={0.4}
          />
          <FadeIn delay={0.8} className="mt-12 max-w-xl">
            <p className="text-[20px] leading-relaxed text-ink/70 italic border-l border-ember/30 pl-8">
              Experiments, challenges and creative work. This is where our curiosity takes physical and digital shape.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-ink/10 py-3 bg-parchment/40 backdrop-blur-md overflow-hidden">
        <Marquee 
          items={[
            "BINARY EXPLOITATION",
            "CTF COMPETITIONS",
            "SYSTEMS SECURITY",
            "RAPID CREATIVE PROTOTYPING",
            "CRYPTOGRAPHY & DEFENSE",
            "r00tgeist COLLECTIVE"
          ]} 
          duration={30}
          className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-ink/80 font-medium"
        />
      </div>

      {/* ── r00tgeist ── */}
      <section className="bg-parchment/60 backdrop-blur-2xl text-ink px-6 py-24 md:px-12 md:py-44 relative border-y border-ink/10">
        <SectionLabel className="mb-16">01 — The cybersecurity crew</SectionLabel>
        
        <div className="grid gap-20 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <FadeIn>
              <PerspectiveCard>
                <Terminal />
              </PerspectiveCard>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-5 relative z-10">
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 text-ember font-mono text-[11px] uppercase tracking-widest mb-4 font-semibold">
                <span className="h-2 w-2 rounded-full bg-ember animate-ping" />
                Special Operations Division
              </div>
              <h2 className="serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-tight mb-8 text-ink">
                Learn by <span className="text-ember underline decoration-ink/20 underline-offset-8">breaking.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-[19px] leading-relaxed text-ink/80 mb-8">
                r00tgeist is our specialized unit dedicated to the offensive and defensive arts. We don&apos;t just read about vulnerabilities; we hunt them.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10 p-4 rounded-lg bg-paper/80 border border-ink/10 font-mono text-[12px] shadow-sm">
                <div>
                  <span className="text-ash block text-[10px] uppercase font-semibold">Focus</span>
                  <span className="text-ink font-semibold">CTF &amp; Systems</span>
                </div>
                <div>
                  <span className="text-ash block text-[10px] uppercase font-semibold">Access</span>
                  <span className="text-ember font-bold">Open for builders</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.04, scaleY: 0.97 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-block"
              >
                <ULink
                  href="https://r00tgeist.techfoundry.in"
                  external
                  className="bg-ember text-white px-12 py-6 text-[16px] font-bold hover:bg-ink hover:text-paper transition-all inline-block rounded shadow-xl"
                >
                  Visit the Signal ↗
                </ULink>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PRACTICE TABS ── */}
      <section className="px-6 py-24 md:px-12 md:py-44 bg-parchment/40 backdrop-blur-md relative border-t border-ink/10">
        <SectionLabel>Our Practice</SectionLabel>
        <h2 className="serif mt-12 text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tight text-ink mb-24">
          The <span className="italic text-ash">Disciplines.</span>
        </h2>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              {AREAS.map((a, i) => (
                <motion.button
                  key={a.n}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ scale: 1.02, scaleY: 0.98 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  className="group text-left p-6 transition-all relative overflow-hidden rounded-md"
                >
                  {activeTab === i && (
                    <motion.div 
                      layoutId="tab-bg" 
                      className="absolute inset-0 bg-ink rounded-md" 
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-6">
                    <span className={`font-mono text-sm ${activeTab === i ? 'text-ember font-bold' : 'text-ash group-hover:text-ink'}`}>
                      {a.n}
                    </span>
                    <a.Icon className={`h-5 w-5 ${activeTab === i ? 'text-ember' : 'text-ash group-hover:text-ink'}`} strokeWidth={1.75} />
                    <span className={`serif text-3xl transition-colors duration-300 ${activeTab === i ? 'text-paper italic' : 'text-ink'}`}>
                      {a.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.97, scaleY: 1.03, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, scaleY: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, scaleY: 1.03, filter: "blur(8px)" }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                whileHover={{ scale: 1.015, scaleY: 0.99 }}
                className="bg-paper/85 backdrop-blur-xl p-12 md:p-20 rounded-xl shadow-xl relative border border-ink/10"
              >
                {(() => {
                  const CurrentIcon = AREAS[activeTab].Icon;
                  return (
                    <div className="mb-10 p-5 rounded-2xl bg-parchment/80 w-fit border border-ink/10 shadow-sm">
                      <CurrentIcon className="h-14 w-14 text-ember" strokeWidth={1.5} />
                    </div>
                  );
                })()}
                <h3 className="serif text-5xl text-ink mb-8 leading-tight">
                  {AREAS[activeTab].title}
                </h3>
                <p className="text-[20px] leading-relaxed text-ink/75 italic mb-12 border-l-4 border-ember pl-10">
                  {AREAS[activeTab].desc}
                </p>
                <DrawingBorder />
                
                <div className="flex justify-end">
                   <div className="font-mono text-[11px] text-ash tracking-widest uppercase font-semibold">
                      Practice Unit — {AREAS[activeTab].n}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
