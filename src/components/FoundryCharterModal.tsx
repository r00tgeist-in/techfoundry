import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Shield, Users, Sparkles, X, ChevronRight, Terminal, Cpu, Layers } from "lucide-react";
import { DrawingBorder } from "./Shared";

interface Pillar {
  id: string;
  n: string;
  title: string;
  body: string;
  icon: typeof Code2;
  stack: string[];
  manifesto: string;
  lead: string;
}

const PILLARS: Pillar[] = [
  {
    id: "builders",
    n: "01",
    title: "Builders First",
    body: "No passive spectators. We learn through lines of code, prototypes, and practical failure.",
    icon: Code2,
    stack: ["Rust", "TypeScript", "Go", "Docker", "Linux Kernel"],
    manifesto: "Ideas remain hypotheses until committed into code. We ship practical artifacts, benchmark performance, and iterate publicly in the open.",
    lead: "Foundry Systems Core"
  },
  {
    id: "recon",
    n: "02",
    title: "Offensive Recon",
    body: "r00tgeist unit explores real vulnerabilities, CTF wargames, and defensive depth.",
    icon: Shield,
    stack: ["Ghidra", "Wireshark", "Burp Suite", "Binary Exploitation", "Reverse Eng"],
    manifesto: "To build impervious systems, you must first master how they shatter. Our offensive security squad breaks barriers to engineer true resilience.",
    lead: "r00tgeist Crew"
  },
  {
    id: "minds",
    n: "03",
    title: "Curious Minds",
    body: "A collective space where students, team members, and creators collaborate openly.",
    icon: Users,
    stack: ["Open Knowledge", "Peer Mentorship", "Workshops", "Research Labs"],
    manifesto: "Hierarchy kills exploration. Everyone in the collective has agency to initiate research, mentor peers, and challenge prevailing dogmas.",
    lead: "Open Collective"
  },
  {
    id: "agency",
    n: "04",
    title: "Creative Agency",
    body: "Bridging the gap between hardcore systems, cinematography, and high design.",
    icon: Sparkles,
    stack: ["WebGL", "Three.js", "Design Systems", "Motion Graphics", "Typography"],
    manifesto: "Utility without aesthetic craft is uninspired. We fuse deep technological capabilities with avant-garde editorial visual storytelling.",
    lead: "Foundry Studio"
  }
];

export default function FoundryCharterModal() {
  const [selectedPillar, setSelectedPillar] = useState<string>("all");
  const [activeModal, setActiveModal] = useState<Pillar | null>(null);

  return (
    <div className="relative">
      {/* Decorative dot and circle on the left, matching user screenshot */}
      <div className="hidden lg:flex flex-col items-center gap-2.5 absolute -left-10 top-12 pointer-events-none select-none">
        <span className="h-2 w-2 rounded-full bg-ink/80" />
        <span className="h-7 w-7 rounded-full border border-ember/70" />
      </div>

      {/* Interactive Filter Pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ash mr-2 font-medium">
          Filter Pillar:
        </span>
        <motion.button
          type="button"
          onClick={() => setSelectedPillar("all")}
          whileHover={{ scale: 1.05, scaleY: 0.96 }}
          whileTap={{ scale: 0.95, scaleY: 1.04 }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
          className={`px-4 py-1.5 rounded-full text-[12px] font-mono tracking-wide transition-colors border font-medium ${
            selectedPillar === "all"
              ? "bg-ink text-paper border-ink shadow-sm"
              : "bg-paper/70 text-ink border-ink/20 hover:border-ink hover:text-ember"
          }`}
        >
          [ ALL PILLARS ]
        </motion.button>
        {PILLARS.map(p => (
          <motion.button
            type="button"
            key={p.id}
            onClick={() => setSelectedPillar(p.id)}
            whileHover={{ scale: 1.05, scaleY: 0.96 }}
            whileTap={{ scale: 0.95, scaleY: 1.04 }}
            transition={{ type: "spring", stiffness: 450, damping: 15 }}
            className={`px-4 py-1.5 rounded-full text-[12px] font-mono tracking-wide transition-colors border font-medium ${
              selectedPillar === p.id
                ? "bg-ember text-white border-ember shadow-sm"
                : "bg-paper/70 text-ink border-ink/20 hover:border-ink hover:text-ember"
            }`}
          >
            {p.title}
          </motion.button>
        ))}
      </div>

      {/* Main Outer Container: Refined light theme palette with liquid elastic feel */}
      <div className="relative rounded-2xl md:rounded-3xl border border-ink/15 bg-parchment/80 backdrop-blur-xl p-6 md:p-10 shadow-lg overflow-hidden group">
        <DrawingBorder />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] pb-6 mb-6 border-b border-ink/10 tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2.5 text-ember font-bold">
            <span className="inline-block h-2 w-2 rounded-full bg-ember animate-pulse" />
            <span>FOUNDRY CHARTER // PILLARS</span>
          </div>
          <span className="text-ember font-bold">EST. 2026</span>
        </div>

        {/* 2x2 Grid of Liquid Stretchy Cards */}
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2">
          {PILLARS.map(p => {
            const isFaded = selectedPillar !== "all" && selectedPillar !== p.id;
            const isHighlighted = selectedPillar === p.id;
            const Icon = p.icon;

            return (
              <motion.div
                key={p.id}
                onClick={() => setActiveModal(p)}
                whileHover={{
                  y: -5,
                  scale: 1.025,
                  scaleX: 1.015,
                  scaleY: 0.985,
                  boxShadow: "0 20px 30px -10px rgba(225, 73, 14, 0.12)"
                }}
                whileTap={{
                  scale: 0.96,
                  scaleX: 0.97,
                  scaleY: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 14,
                  mass: 0.6,
                }}
                className={`relative rounded-xl p-6 md:p-7 bg-paper border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isHighlighted
                    ? "border-ember shadow-md ring-2 ring-ember/30"
                    : isFaded
                    ? "border-ink/10 opacity-40 hover:opacity-100"
                    : "border-ink/15 hover:border-ember/60 shadow-sm"
                }`}
              >
                {/* Icon box in ember */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-sand/35 border border-ink/10 flex items-center justify-center text-ember font-bold">
                    {p.id === "builders" ? (
                      <span className="font-mono text-xs">&lt;/&gt;</span>
                    ) : (
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-ash font-medium group-hover:text-ember transition-colors">
                    CLICK TO EXPAND ↗
                  </span>
                </div>

                {/* Title in Instrument Serif */}
                <h4 className="serif text-2xl text-ink tracking-tight mb-2 font-normal">
                  {p.title}
                </h4>

                {/* Body description */}
                <p className="text-[13px] md:text-[14px] text-ink/80 font-sans leading-relaxed">
                  {p.body}
                </p>

                {/* Quick tags bar on hover */}
                <div className="mt-4 pt-3 border-t border-ink/10 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-sand/25 border border-ink/5 font-mono text-[10px] text-ash font-medium">
                      {tech}
                    </span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-ember/10 font-mono text-[10px] text-ember font-semibold">
                      +{p.stack.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Hint */}
        <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-[11px] text-ash font-medium">
          <span>● SELECT ANY PILLAR TO INSPECT PROTOCOLS</span>
          <span className="text-ember font-semibold">FOUNDRY CODEX // ACTIVE</span>
        </div>
      </div>

      {/* Interactive Stretchy Liquid Modal Dialog */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-ink/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 35, scaleX: 0.9, scaleY: 1.12 }}
              animate={{ opacity: 1, scale: 1, y: 0, scaleX: 1, scaleY: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: 20, scaleX: 0.95, scaleY: 0.95 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 340,
                mass: 0.7,
              }}
              className="relative w-full max-w-xl rounded-2xl bg-paper border border-ink/15 p-6 md:p-8 text-ink shadow-2xl overflow-hidden"
            >
              {/* Top Bar with close button */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-ember font-bold">
                  <span className="h-2 w-2 rounded-full bg-ember animate-pulse" />
                  <span>PILLAR {activeModal.n} // {activeModal.lead.toUpperCase()}</span>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full hover:bg-sand/40 text-ink/70 hover:text-ink transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Title & Body */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-sand/40 border border-ink/10 flex items-center justify-center text-ember">
                  <activeModal.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="serif text-3xl text-ink tracking-tight font-normal">{activeModal.title}</h3>
                  <span className="font-mono text-[11px] text-ember font-medium">Status: Operational Protocol</span>
                </div>
              </div>

              <p className="text-[15px] text-ink/85 leading-relaxed italic border-l-2 border-ember pl-4 my-6 font-serif">
                "{activeModal.manifesto}"
              </p>

              {/* Stack & Tools */}
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ash font-medium mb-3">
                  Applied Stack &amp; Tooling
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeModal.stack.map(s => (
                    <span key={s} className="px-3 py-1 rounded bg-sand/30 border border-ink/10 font-mono text-[12px] text-ink font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-ink/10 flex items-center justify-end gap-3">
                <motion.button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  whileHover={{ scale: 1.05, scaleY: 0.96 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-6 py-2.5 rounded bg-ink text-paper text-[13px] font-mono transition-colors hover:bg-ember font-medium"
                >
                  Close Codex →
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
