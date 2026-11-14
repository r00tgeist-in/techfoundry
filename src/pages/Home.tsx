import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNav } from "../lib/router";
import LiquidChrome from "../components/LiquidChrome";
import FoundryCharterModal from "../components/FoundryCharterModal";
import { 
  SectionLabel, 
  ULink, 
  FadeIn, 
  SplitTextReveal, 
  PerspectiveCard, 
  DrawingBorder, 
  EASE_SOFT 
} from "../components/Shared";
import Marquee from "../components/Marquee";
import { 
  Cpu, 
  ShieldAlert, 
  CalendarDays, 
  Rocket, 
  Palette, 
  Users, 
  Terminal, 
  Code2, 
  Layers, 
  Lock, 
  Radio, 
  Activity,
  Workflow,
  Sparkles,
  Globe,
  ExternalLink,
  MessageSquare,
  Zap,
  Flame
} from "lucide-react";

const PRACTICE = [
  { n: "01", title: "Technology", desc: "Build useful things. Experiment with code, explore new tools and learn through practical projects.", Icon: Cpu },
  { n: "02", title: "Cybersecurity", desc: "Understand how systems work, how they break and how to make them safer.", Icon: ShieldAlert },
  { n: "03", title: "Events", desc: "Bring curious people together through challenges and shared experiences.", Icon: CalendarDays },
  { n: "04", title: "Startups", desc: "Give early ideas a place to develop through collaboration and experimentation.", Icon: Rocket },
  { n: "05", title: "Creative projects", desc: "Explore filmmaking, design and storytelling alongside technology.", Icon: Palette },
  { n: "06", title: "Community", desc: "Share knowledge, meet collaborators and make progress together.", Icon: Users },
];

const ANESTHESIA_EVENTS = [
  { n: "01", name: "Hackathon", desc: "Turn your ideas into reality." },
  { n: "02", name: "Designathon", desc: "Create, design, and bring your imagination to life." },
  { n: "03", name: "Competitive Programming", desc: "Challenge your logic and coding skills." },
  { n: "04", name: "Obscura", desc: "Dive into the world of cryptic challenges and CTFs." },
  { n: "05", name: "Art Arena", desc: "Let your creativity take the spotlight." },
  { n: "06", name: "3D Modelling", desc: "Transform imagination into three-dimensional reality." },
  { n: "07", name: "OBLIVION", desc: "Dive into the world of minecraft with your teammates." },
];

export default function Home() {
  const { navigate } = useNav();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroSkew = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <div>
      {/* ── HERO (SECTION 1) ── */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col px-6 md:px-12 overflow-hidden bg-transparent">
        {/* Liquid Chrome background — ONLY in Section 1 */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <LiquidChrome
            className="w-full h-full opacity-65"
            color="#decdb0"
            speed={0.16}
            amplitude={0.28}
            interactive={true}
            lightMode={true}
          />
        </div>

        <motion.div 
          style={{ opacity: heroFade, y: heroY, skewY: heroSkew }} 
          className="relative z-10 flex flex-1 flex-col pt-28 md:pt-32"
        >
          <FadeIn delay={0.2} blur={5} y={-10}>
            <div className="flex items-center justify-between text-[13px] text-ash">
              <span className="flex items-center gap-2.5">
                <motion.span 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="inline-block text-ember"
                >✦</motion.span>
                <span className="font-medium tracking-tight">Independent minds / Shared ambition</span>
              </span>
              <span className="font-mono tracking-widest text-[11px] uppercase">INDIA · 20.5937° N</span>
            </div>
          </FadeIn>

          <div className="mt-12 md:mt-16 relative">
            <SplitTextReveal 
              text="Ideas." 
              className="serif text-[clamp(4.5rem,13vw,14rem)] leading-[0.8] tracking-tighter text-ink" 
              delay={0.4} 
            />
            <SplitTextReveal 
              text="Made." 
              className="serif text-[clamp(4.5rem,13vw,14rem)] leading-[0.8] tracking-tighter text-ink md:ml-[10vw]" 
              delay={0.6} 
            />
            <div className="relative">
              <SplitTextReveal 
                text="Real." 
                className="serif text-[clamp(4.5rem,13vw,14rem)] leading-[0.8] tracking-tighter text-ember md:ml-[20vw]" 
                delay={0.8} 
              />
            </div>
          </div>

          <div className="mt-auto grid gap-6 pb-10 pt-12 md:grid-cols-2 items-end">
            <FadeIn delay={1.2}>
              <p className="max-w-sm text-[15px] leading-relaxed text-ink/70 md:text-base border-l border-ink/20 pl-6 italic">
                A youth-led collective for technology and creative exploration.
              </p>
            </FadeIn>
            <FadeIn delay={1.4} className="flex flex-wrap items-center gap-8 md:justify-end">
              <PerspectiveCard>
                <button
                  onClick={() => navigate("/projects")}
                  className="relative overflow-hidden bg-ink px-10 py-5 text-[14px] text-paper transition-transform hover:scale-105 active:scale-95 group"
                >
                  <span className="relative z-10">Discover our work →</span>
                  <motion.div 
                    className="absolute inset-0 bg-ember opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              </PerspectiveCard>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-ink/10 py-3.5 bg-parchment/40 backdrop-blur-md overflow-hidden">
        <Marquee 
          items={[
            "CURRENT EVENT // ANESTHESIA LIVE",
            "INDEPENDENT MINDS",
            "CYBERSECURITY & CTFs",
            "theanesthesia.xyz",
            "RAPID EXPERIMENTATION",
            "r00tgeist CREW",
            "SYSTEMS & CODE",
            "discord.gg/qPp9gwkd3D",
            "INDIA · 20.5937° N"
          ]} 
          duration={30}
          className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-ink/80 font-medium"
        />
      </div>

      {/* ── THIS IS TECHFOUNDRY ── */}
      <section className="px-6 py-20 md:px-12 md:py-44 relative">
        <SectionLabel>This is TechFoundry</SectionLabel>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <FadeIn>
              <h2 className="serif text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.1] tracking-tight text-ink">
                A place for curious people to turn <span className="text-ember italic">what if</span> into something real.
              </h2>
            </FadeIn>
          </div>
          <div className="md:col-span-5">
            <FadeIn delay={0.2}>
              <p className="text-[17px] leading-relaxed text-ink/70">
                We learn by building. We bring technology, design and independent thinking together through projects, conversations and challenges.
              </p>
              <button
                onClick={() => navigate("/about")}
                className="mt-8 text-[14px] text-ink flex items-center gap-4 group"
              >
                Meet the collective
                <motion.span className="w-12 h-px bg-ink origin-left group-hover:scale-x-150 transition-transform" />
              </button>
            </FadeIn>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid gap-10 md:grid-cols-12 relative">
          <div className="md:col-span-10 md:col-start-2 relative">
            <FoundryCharterModal />
          </div>
          <FadeIn className="md:col-span-10 md:col-start-2 mt-2">
            <div className="flex justify-between text-[12px] text-ash font-mono">
              <span>( FIG. 01 )</span>
              <span>FOUNDRY CHARTER PILLARS // INTERACTIVE PROTOCOLS</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── r00tgeist ── */}
      <section className="bg-parchment/60 backdrop-blur-xl text-ink px-6 py-20 md:px-12 md:py-44 relative overflow-hidden border-y border-ink/10">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 0.04 }} 
          className="absolute inset-0 font-mono text-[20vw] leading-none whitespace-nowrap pointer-events-none select-none text-ink"
        >
          BREAK TO UNDERSTAND BREAK TO UNDERSTAND
        </motion.div>
        
        <SectionLabel>01 — The cybersecurity crew</SectionLabel>
        
        <div className="mt-20 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 relative z-10">
            <FadeIn>
              <h2 className="serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[1] tracking-tight text-ink">
                Learn by <span className="text-ember italic">breaking.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-[18px] leading-relaxed text-ink/80">
                A student cybersecurity crew built on CTFs, event culture and breaking things to understand them.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-12">
                <motion.div
                  whileHover={{ scale: 1.05, scaleY: 0.96 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="inline-block"
                >
                  <ULink
                    href="https://r00tgeist.techfoundry.in"
                    external
                    className="bg-ember text-white px-10 py-5 text-[15px] font-semibold inline-block shadow-md rounded"
                  >
                    Enter the r00tgeist ↗
                  </ULink>
                </motion.div>
              </div>
            </FadeIn>
          </div>
          <div className="md:col-span-7 relative">
            <PerspectiveCard>
              <motion.div
                whileHover={{ scale: 1.02, scaleY: 0.985 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
                className="relative p-6 md:p-8 bg-paper/95 border border-ink/15 rounded-2xl backdrop-blur-xl shadow-lg overflow-hidden group hover:border-ember/50 transition-colors"
              >
                {/* Ambient glow behind console */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-ember/10 blur-3xl pointer-events-none group-hover:bg-ember/20 transition-all" />
                
                {/* Tech bar */}
                <div className="flex items-center justify-between font-mono text-[11px] text-ash mb-6 border-b border-ink/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-ember animate-pulse" />
                    <span className="font-semibold text-ink">SIGNAL // ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-ember" />
                    <span className="tracking-widest uppercase text-ember font-bold">OFFENSIVE_CREW</span>
                  </div>
                </div>

                {/* Pure Cybernetic HUD with Lucide React Icons in light palette */}
                <div className="relative py-8 md:py-12 px-6 md:px-10 bg-parchment/70 backdrop-blur-md rounded-xl border border-ink/10 overflow-hidden">
                  <div className="scanlines absolute inset-0 opacity-5 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-sand/40 border border-ink/10 flex items-center justify-center text-ember">
                        <ShieldAlert className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-ink">
                          r00t<span className="text-ember">geist</span>
                        </h3>
                        <span className="font-mono text-[11px] text-ash font-medium">Division :: Offensive Security</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-500/15 border border-emerald-600/30 px-2.5 py-1 rounded font-bold">
                      ● CTF UNIT LIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
                    {[
                      { icon: Terminal, label: "CTF Exploits", val: "ACTIVE" },
                      { icon: Lock, label: "Defense Ops", val: "HARDENED" },
                      { icon: Radio, label: "Frequency", val: "433.9 MHz" },
                      { icon: Activity, label: "Handshake", val: "14ms" },
                    ].map(stat => (
                      <div key={stat.label} className="p-3 rounded-lg bg-paper border border-ink/10 shadow-xs">
                        <div className="flex items-center gap-1.5 text-ember mb-1.5 font-bold">
                          <stat.icon className="h-3.5 w-3.5" />
                          <span className="text-[10px] text-ash uppercase font-medium">{stat.label}</span>
                        </div>
                        <span className="text-ink font-bold">{stat.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ghost telemetry snippet */}
                <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-[11px] text-ash border-t border-ink/10 pt-4">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-ash/80">Mission</span>
                    <span className="text-ink font-medium">Vulnerability Research &amp; WarGames</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-wider text-ash/80">Protocol</span>
                    <span className="text-ember font-bold">BREAK_TO_UNDERSTAND</span>
                  </div>
                </div>
              </motion.div>
            </PerspectiveCard>
          </div>
        </div>
      </section>

      {/* ── CURRENT EVENT: ANESTHESIA ── */}
      <section className="px-6 py-20 md:px-12 md:py-36 relative border-t border-ink/10">
        <SectionLabel>02 — Flagship Event // Current Dispatch</SectionLabel>

        <div className="mt-10 rounded-2xl border border-ink/15 bg-parchment/70 backdrop-blur-md p-6 md:p-12 shadow-sm">
          {/* Top header bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-ash pb-6 mb-8 border-b border-ink/10 tracking-widest uppercase">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
              </span>
              <span className="text-ink font-semibold">SIGNAL ACTIVE // ANESTHESIA 2026</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-ash font-medium">INDIA · HYBRID ARENA</span>
              <span className="text-ember font-bold">● ARENAS OPEN</span>
            </div>
          </div>

          {/* Main Visual & Introductory Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-center mb-12">
            {/* Left: Headline & Description */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ember font-semibold">
                  TechFoundry Flagship Event
                </span>
                <h3 className="serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink mt-2">
                  Anesthesia
                </h3>
                <p className="mt-4 text-[16px] md:text-[18px] leading-relaxed text-ink/80 max-w-xl font-sans">
                  The flagship national convergence by TechFoundry. Bringing curious minds together across software engineering, cryptic challenges, cybersecurity, 3D design, competitive coding, and digital arenas.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://theanesthesia.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-[14px] font-semibold tracking-wide hover:bg-ember transition-colors shadow-md group rounded"
                >
                  <Globe className="h-4 w-4 text-paper" />
                  <span>Visit theanesthesia.xyz</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <a
                  href="https://discord.gg/qPp9gwkd3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-ink/20 hover:border-ink hover:text-ember text-ink text-[14px] font-semibold tracking-wide transition-colors bg-paper/80 rounded"
                >
                  <MessageSquare className="h-4 w-4 text-[#5865F2]" />
                  <span>Join Anesthesia Discord</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Right: Curated Visual Artifacts */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden border border-ink/15 bg-black p-1 shadow-md">
                <img 
                  src="/images/anesthesia-banner.jpg" 
                  alt="Anesthesia Banner" 
                  className="w-full h-auto object-cover rounded filter contrast-105"
                />
              </div>
              <div className="flex items-center gap-4 bg-paper/80 border border-ink/10 rounded-xl p-3">
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-black border border-ink/10 shadow-sm shrink-0 p-1">
                  <img 
                    src="/images/anesthesia-logo.jpg" 
                    alt="Anesthesia Emblem" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-ember font-bold block uppercase tracking-wider">
                    Official Identity // 2026
                  </span>
                  <p className="font-mono text-[11px] text-ink/75 leading-tight mt-0.5">
                    theanesthesia.xyz · discord.gg/qPp9gwkd3D
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── OFFICIAL EVENTS ROSTER (7 EVENTS W/O ICONS) ── */}
          <div className="border-t border-ink/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between mb-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ash font-medium">
                  Official Competitions
                </span>
                <h4 className="serif text-3xl md:text-4xl text-ink mt-1">
                  The Arenas (07)
                </h4>
              </div>
              <span className="font-mono text-[11px] text-ash tracking-widest uppercase">
                OPEN TO ALL CADETS &amp; TEAMS
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ANESTHESIA_EVENTS.map(ev => (
                <motion.div
                  key={ev.n}
                  whileHover={{ scale: 1.03, scaleY: 0.98 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 16 }}
                  className="p-6 rounded-xl bg-paper/90 border border-ink/15 hover:border-ember transition-colors duration-200 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-ink/10">
                      <span className="font-mono text-xs font-bold text-ember">{ev.n}</span>
                      <span className="font-mono text-[10px] text-ash uppercase tracking-wider font-medium">
                        ARENA EVENT
                      </span>
                    </div>
                    <h5 className="serif text-2xl text-ink font-normal group-hover:text-ember transition-colors">
                      {ev.name}
                    </h5>
                    <p className="mt-2 text-[14px] text-ink/80 leading-relaxed font-sans">
                      {ev.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-ink/10 flex items-center justify-between text-[11px] font-mono text-ash font-medium group-hover:text-ember">
                    <span>● ARENA CODEX</span>
                    <span>ACTIVE →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PRACTICE ── */}
      <section className="px-6 py-20 md:px-12 md:py-44">
        <SectionLabel>Our practice</SectionLabel>
        <div className="flex justify-between items-end mt-8 border-b border-ink/10 pb-12">
          <h2 className="serif text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ink max-w-2xl">
            Curiosity has <span className="italic text-ash">many forms.</span>
          </h2>
          <div className="hidden md:block font-mono text-[12px] text-ash uppercase tracking-widest">
            disciplines (06)
          </div>
        </div>
        
        <div className="grid gap-x-12 gap-y-20 mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE.map((p, i) => (
            <FadeIn key={p.n} delay={i * 0.1}>
              <div className="group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-[12px] text-ember">{p.n}</span>
                  <p.Icon className="h-4 w-4 text-ash group-hover:text-ember transition-colors" strokeWidth={1.75} />
                  <div className="h-px bg-ink/10 flex-1" />
                </div>
                <h3 className="serif text-3xl leading-tight text-ink group-hover:text-ember transition-colors">
                  {p.title}
                </h3>
                <p className="mt-6 text-[15px] leading-relaxed text-ink/60">
                  {p.desc}
                </p>
                <div className="mt-8 overflow-hidden h-1 bg-ink/5 relative">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.5, ease: EASE_SOFT }}
                    className="absolute inset-0 bg-ink/20 group-hover:bg-ember transition-colors"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TICKER 2 ── */}
      <div className="border-t border-ink/10 py-3.5 bg-parchment/40 backdrop-blur-md overflow-hidden">
        <Marquee 
          items={[
            "IDEAS. MADE. REAL.",
            "BREAK TO UNDERSTAND",
            "OFFENSIVE LABS",
            "RADICAL CURIOSITY",
            "BUILD · SHIP · BREAK",
            "JOIN THE CREW"
          ]} 
          duration={38}
          className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-ash/80"
          separatorClassName="text-ember"
        />
      </div>

      {/* ── LET'S TALK ── */}
      <section className="border-t border-ink/10 px-6 py-32 text-center md:px-12 md:py-52 relative overflow-hidden bg-parchment/30 backdrop-blur-md">
        <div className="relative z-10">
          <SectionLabel className="justify-center">Start something with us</SectionLabel>
          <FadeIn delay={0.1}>
            <h2 className="serif mt-12 text-[clamp(3.5rem,10vw,12rem)] leading-[0.9] tracking-tighter text-ink">
              Let&apos;s build <br /> <span className="italic text-ash">together.</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3} className="mt-16 flex flex-wrap justify-center gap-10 items-center">
            <PerspectiveCard>
              <ULink
                href="mailto:team@techfoundry.in"
                className="bg-ink text-paper px-12 py-6 text-[16px] hover:bg-ember transition-colors"
              >
                Send a Transmission →
              </ULink>
            </PerspectiveCard>
            <button
              onClick={() => navigate("/contact")}
              className="text-[16px] text-ink font-medium underline underline-offset-8 hover:text-ember transition-colors"
            >
              Or view details
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
