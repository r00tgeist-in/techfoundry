import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel, ULink, FadeIn, SplitTextReveal, PerspectiveCard, DrawingBorder } from "../components/Shared";
import Marquee from "../components/Marquee";
import FoundryCharterModal from "../components/FoundryCharterModal";
import { Code2, ShieldAlert, Sparkles, Users, Compass, Layers, Terminal } from "lucide-react";

const MEMBERS = [
  { n: "01", name: "Aaryaman Shrivastav", role: "CEO · Founder" },
  { n: "02", name: "Nilay Mishra", role: "CEO · Founder" },
  { n: "03", name: "Virat Chaturvedi", role: "CEO · Founder" },
  { n: "04", name: "Agastya", role: "COO" },
  { n: "05", name: "Aarav Shishodia", role: "CTO" },
  { n: "06", name: "Gabriel", role: "CMO" },
  { n: "07", name: "Bhavya", role: "Head of Core Operations" },
  { n: "08", name: "Aksh", role: "Core Team Member" },
  { n: "09", name: "Alokik", role: "Core Team Member" },
  { n: "10", name: "Rishabh", role: "Chief Advisor" },
  { n: "11", name: "Anaadi", role: "Head of Events" },
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef}>
      {/* ── HERO ── */}
      <section className="px-6 pb-24 pt-48 md:px-12 md:pb-44 md:pt-64 relative overflow-hidden bg-transparent">
        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0, 0.2], [0, -100]), opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute top-20 right-10 pointer-events-none"
        >
          <span className="serif text-[20vw] leading-none text-ink/5">COLLECTIVE</span>
        </motion.div>
        
        <SectionLabel>01 — The Collective</SectionLabel>
        <div className="mt-12 relative">
          <SplitTextReveal 
            text="Different minds." 
            className="serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-ink" 
            delay={0.2}
          />
          <SplitTextReveal 
            text="Common ground." 
            className="serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-ember md:ml-[10vw]" 
            delay={0.4}
          />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-ink/10 py-3.5 bg-parchment/40 backdrop-blur-md overflow-hidden">
        <Marquee 
          items={[
            "YOUTH-LED COLLECTIVE",
            "OFFENSIVE SECURITY & CTFs",
            "BUILDERS & EXPERIMENTERS",
            "r00tgeist CREW",
            "CREATIVE COMPUTING",
            "INDIA · 2026"
          ]} 
          duration={32}
          className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-ink/80 font-medium"
        />
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="px-6 py-24 md:px-12 md:py-44 relative">
        <div className="grid gap-20 md:grid-cols-12 items-start">
          <div className="md:col-span-4 sticky top-32">
            <SectionLabel>Mission</SectionLabel>
            <FadeIn delay={0.2} className="mt-10">
              <p className="serif text-4xl leading-tight text-ink">
                We believe the best way to understand an idea is to <span className="italic text-ash underline underline-offset-4">build it.</span>
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="mt-8">
              <div className="p-5 rounded-lg border border-ink/10 bg-paper/60 backdrop-blur-md font-mono text-[12px] space-y-2 text-ink/70">
                <div className="flex justify-between border-b border-ink/10 pb-2">
                  <span className="text-ash">BASE</span>
                  <span>INDIA</span>
                </div>
                <div className="flex justify-between border-b border-ink/10 pb-2">
                  <span className="text-ash">COORDINATES</span>
                  <span>20.5937° N, 78.9629° E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ash">CYBER DIVISION</span>
                  <span className="text-ember font-bold">r00tgeist</span>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="md:col-span-7 md:col-start-6">
            <FadeIn>
              <FoundryCharterModal />
            </FadeIn>
            
            <div className="mt-16 space-y-12">
              <FadeIn delay={0.1}>
                <p className="text-[20px] leading-relaxed text-ink/80 max-w-2xl font-medium">
                  TechFoundry is a youth-led technology organisation based in India. We explore technology, cybersecurity, events, startups and creative projects through collaboration and practical experience.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-[17px] leading-relaxed text-ink/60 max-w-xl">
                  A place to ask better questions, learn from one another and give early ideas a chance to grow. We don&apos;t just talk about the future; we write the code for it.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PEOPLE ── */}
      <section className="px-6 py-24 md:px-12 md:py-44 bg-parchment/60 backdrop-blur-md text-ink relative overflow-hidden border-y border-ink/10">
        <div className="relative z-10">
          <SectionLabel>The Team</SectionLabel>
          <div className="flex flex-wrap justify-between items-end mt-12 mb-20 border-b border-ink/10 pb-12">
            <h2 className="serif text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tight text-ink">
              Meet the <span className="italic text-ember">team.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20">
            {MEMBERS.map((m, i) => (
              <FadeIn key={m.n} delay={i * 0.05} y={40}>
                <PerspectiveCard className="group">
                  <div className="flex items-center gap-8 py-10 border-b border-ink/10">
                    <span className="font-mono text-[14px] text-ember font-bold group-hover:scale-110 transition-transform">
                      {m.n}
                    </span>
                    <div className="flex-1">
                      <h3 className="serif text-4xl text-ink group-hover:text-ember group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                        {m.name}
                      </h3>
                      <p className="text-[13px] uppercase tracking-widest text-ash mt-4 font-mono font-medium">
                        {m.role}
                      </p>
                    </div>
                  </div>
                </PerspectiveCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN ── */}
      <section className="px-6 py-32 text-center md:px-12 md:py-52 relative overflow-hidden">
        <motion.div 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 pointer-events-none opacity-5"
        >
          <AsteriskLarge />
        </motion.div>
        
        <div className="relative z-10">
          <FadeIn>
            <h2 className="serif text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tighter text-ink">
              Good ideas need <br /> <span className="italic text-ash underline decoration-ember underline-offset-8">good company.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-12">
            <p className="text-[18px] text-ink/60 mb-12">
              Our community is open to the curious, the brave, and the builders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <PerspectiveCard className="inline-block">
                <ULink
                  href="mailto:team@techfoundry.in"
                  className="bg-ink text-paper px-14 py-7 text-[17px] font-semibold hover:bg-ember hover:scale-105 active:scale-95 transition-all shadow-xl rounded"
                >
                  Connect with the Collective →
                </ULink>
              </PerspectiveCard>
              <ULink
                href="https://www.instagram.com/wwwtechfoundryin"
                external
                className="px-10 py-7 text-[16px] font-medium border border-ink/20 text-ink hover:border-ink hover:text-ember transition-all rounded bg-paper/60"
              >
                Instagram ↗
              </ULink>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function AsteriskLarge() {
  return (
    <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
      <path d="M12 2v20M2 12h20M19.07 4.93L4.93 19.07M19.07 19.07L4.93 4.93" />
    </svg>
  );
}
