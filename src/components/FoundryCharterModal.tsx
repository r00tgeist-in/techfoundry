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
        <button
          type="button"
          onClick={() => setSelectedPillar("all")}
          className={`px-4 py-1.5 rounded-full text-[12px] font-mono tracking-wide transition-all border font-medium ${
            selectedPillar === "all"
              ? "bg-ink text-paper border-ink shadow-sm scale-105"
              : "bg-paper/70 text-ink border-ink/20 hover:border-ink hover:text-ember"
          }`}
        >
          [ ALL PILLARS ]
        </button>
        {PILLARS.map(p => (
          <button
            type="button"
            key={p.id}
            onClick={() => setSelectedPillar(p.id)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-mono tracking-wide transition-all border font-medium ${
              selectedPillar === p.id
                ? "bg-ember text-white border-ember shadow-sm scale-105"
                : "bg-paper/70 text-ink border-ink/20 hover:border-ink hover:text-ember"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Main Outer Container: Exact warm charcoal modal from screenshot */}
      <div className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-[#2d2925] p-6 md:p-10 shadow-2xl overflow-hidden group">
        <DrawingBorder />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] pb-6 mb-6 border-b border-white/10 tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2.5 text-ember font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-ember animate-pulse" />
            <span>FOUNDRY CHARTER // PILLARS</span>
          </div>
          <span className="text-ember font-semibold">EST. 2026</span>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2">
          {PILLARS.map(p => {
            const isFaded = selectedPillar !== "all" && selectedPillar !== p.id;
            const isHighlighted = selectedPillar === p.id;
            const Icon = p.icon;

            return (
              <motion.div
                key={p.id}
                onClick={() => setActiveModal(p)}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative rounded-xl p-6 md:p-7 bg-[#191613] border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHighlighted
                    ? "border-ember shadow-lg ring-1 ring-ember/50"
                    : isFaded
                    ? "border-white/5 opacity-40 hover:opacity-100"
                    : "border-white/5 hover:border-ember/40 hover:bg-[#1e1a16]"
                }`}
              >
                {/* Icon box in ember */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center text-ember">
                    {p.id === "builders" ? (
                      <span className="font-mono text-xs font-bold">&lt;/&gt;</span>
                    ) : (
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-paper/60 group-hover:text-ember transition-colors">
                    CLICK TO EXPAND ↗
                  </span>
                </div>

                {/* Title in Instrument Serif */}
                <h4 className="serif text-2xl text-paper tracking-tight mb-2">
                  {p.title}
                </h4>

                {/* Body description */}
                <p className="text-[13px] md:text-[14px] text-paper/85 font-sans leading-relaxed">
                  {p.body}
                </p>

                {/* Quick tags bar on hover */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-paper/70">
                      {tech}
                    </span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-ember/15 font-mono text-[10px] text-ember">
                      +{p.stack.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Hint */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-paper/40">
          <span>● SELECT ANY PILLAR TO INSPECT PROTOCOLS</span>
          <span className="text-ember">FOUNDRY CODEX // ACTIVE</span>
        </div>
      </div>

      {/* Interactive Modal Dialog (Expands when clicking any card) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl rounded-2xl bg-[#231f1b] border border-white/15 p-6 md:p-8 text-paper shadow-2xl overflow-hidden"
            >
              {/* Top Bar with close button */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-ember">
                  <span className="h-2 w-2 rounded-full bg-ember animate-pulse" />
                  <span>PILLAR {activeModal.n} // {activeModal.lead.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-paper/70 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Title & Body */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-ember">
                  <activeModal.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="serif text-3xl text-paper tracking-tight">{activeModal.title}</h3>
                  <span className="font-mono text-[11px] text-ember">Status: Operational Protocol</span>
                </div>
              </div>

              <p className="text-[15px] text-paper/80 leading-relaxed italic border-l-2 border-ember/60 pl-4 my-6">
                "{activeModal.manifesto}"
              </p>

              {/* Stack & Tools */}
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-paper/50 mb-3">
                  Applied Stack &amp; Tooling
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeModal.stack.map(s => (
                    <span key={s} className="px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-[12px] text-paper/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded bg-white/10 hover:bg-white/15 text-paper text-[13px] font-mono transition-colors"
                >
                  Close Codex
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

