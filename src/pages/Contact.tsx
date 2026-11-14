import { useState } from "react";
import { motion } from "framer-motion";
import { 
  SectionLabel, 
  ULink, 
  FadeIn, 
  SplitTextReveal, 
  PerspectiveCard, 
  DrawingBorder,
  EASE_CUSTOM
} from "../components/Shared";

const TOPICS = ["Collaboration", "Partnerships", "Sponsorships", "r00tgeist", "General enquiry"];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  const compose = () => {
    const subject = encodeURIComponent(`[${topic}] from ${name || "visitor"}`);
    const body = encodeURIComponent(`Hi TechFoundry,\n\n${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:team@techfoundry.in?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section className="px-6 pb-24 pt-48 md:px-12 md:pb-32 md:pt-64 relative overflow-hidden bg-transparent">
         <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.05 }} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="serif text-[50vw] leading-none text-ink select-none">HELLO</span>
        </motion.div>

        <SectionLabel>03 — Get in touch</SectionLabel>
        <div className="mt-12 relative z-10">
          <SplitTextReveal 
            text="Everything starts" 
            className="serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-ink" 
            delay={0.2}
          />
          <SplitTextReveal 
            text="with a hello." 
            className="serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter text-ember md:ml-[10vw]" 
            delay={0.4}
          />
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="px-6 pb-32 md:px-12 md:pb-52 relative z-10">
        <div className="grid gap-24 lg:grid-cols-12 items-start">

          {/* left — direct lines */}
          <div className="lg:col-span-5 space-y-16">
            <FadeIn delay={0.6}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash mb-6">Direct Transmission</p>
                <ULink
                  href="mailto:team@techfoundry.in"
                  className="serif text-[clamp(1.8rem,3.5vw,3.2rem)] leading-none text-ink hover:text-ember transition-colors"
                >
                  team@techfoundry.in
                </ULink>
              </div>
            </FadeIn>

            <div className="grid gap-12 sm:grid-cols-2">
              <FadeIn delay={0.7}>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash mb-4">Phone</p>
                <ULink href="tel:+919266365400" className="serif text-2xl text-ink">
                  +91 92663 65400
                </ULink>
              </FadeIn>
              <FadeIn delay={0.8}>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash mb-4">Base</p>
                <p className="serif text-2xl text-ink">New Delhi, India</p>
              </FadeIn>
            </div>

            <FadeIn delay={0.9}>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash mb-6">Elsewhere</p>
              <div className="flex flex-wrap gap-8">
                <ULink href="https://discord.gg/ptW4vH5WW" external className="serif text-2xl text-ink hover:text-ember">
                  Discord ↗
                </ULink>
                <ULink href="https://www.instagram.com/wwwtechfoundryin" external className="serif text-2xl text-ink hover:text-ember">
                  Instagram ↗
                </ULink>
              </div>
            </FadeIn>
          </div>

          {/* right — form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.5}>
              <PerspectiveCard>
                <form
                  onSubmit={e => { e.preventDefault(); compose(); }}
                  className="bg-paper/70 backdrop-blur-xl border border-ink/10 p-8 md:p-16 shadow-2xl relative group rounded-xl"
                >
                  <DrawingBorder />
                  
                  <div className="grid gap-12 sm:grid-cols-2 mb-12">
                    <div className="relative">
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-transparent border-b border-ink/20 py-4 serif text-2xl focus:border-ember focus:outline-none transition-colors placeholder:text-ink/40 text-ink"
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileFocus={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-ember origin-left"
                      />
                    </div>
                    <div className="relative">
                      <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email Address"
                        type="email"
                        className="w-full bg-transparent border-b border-ink/20 py-4 serif text-2xl focus:border-ember focus:outline-none transition-colors placeholder:text-ink/40 text-ink"
                      />
                    </div>
                  </div>

                  <div className="mb-12">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash mb-6 font-medium">Inquiry Type</p>
                    <div className="flex flex-wrap gap-3">
                      {TOPICS.map(t => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTopic(t)}
                          className={`px-6 py-3 rounded-full text-[13px] font-medium transition-all duration-300 border ${
                            topic === t
                              ? "bg-ink text-paper border-ink scale-105 shadow-sm"
                              : "bg-paper/80 text-ink/75 border-ink/20 hover:border-ink hover:text-ink"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-12 relative">
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Tell us what's on your mind..."
                      className="w-full bg-transparent border-b border-ink/20 py-4 serif text-2xl focus:border-ember focus:outline-none transition-colors resize-none placeholder:text-ink/40 text-ink"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ink text-paper p-8 flex items-center justify-between group overflow-hidden relative"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-ember translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                    />
                    <span className="serif text-3xl relative z-10">Initialize Transmission</span>
                    <span className="text-3xl relative z-10 group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                </form>
              </PerspectiveCard>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
