import { ULink, FadeIn } from "./Shared";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 pb-10 pt-16 md:px-12 bg-paper/50 backdrop-blur-md">
      <FadeIn>
        <div className="grid gap-8 text-[15px] sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-[12px] uppercase tracking-widest text-ash">Email</p>
            <ULink href="mailto:team@techfoundry.in" className="mt-2 block text-ink">
              team@techfoundry.in
            </ULink>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-widest text-ash">Phone</p>
            <ULink href="tel:+919266365400" className="mt-2 block text-ink">
              +91 92663 65400
            </ULink>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-widest text-ash font-mono">Elsewhere</p>
            <div className="mt-2 flex flex-col gap-1.5">
              <ULink href="https://theanesthesia.xyz" external className="text-ember font-medium">Anesthesia Event ↗</ULink>
              <ULink href="https://discord.gg/qPp9gwkd3D" external className="text-ink">Anesthesia Discord ↗</ULink>
              <ULink href="https://www.instagram.com/wwwtechfoundryin" external className="text-ink">Instagram ↗</ULink>
              <ULink href="https://r00tgeist.techfoundry.in" external className="text-ash font-medium hover:text-ember">r00tgeist ↗</ULink>
            </div>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-widest text-ash">Base</p>
            <p className="mt-2 text-ink">India</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-16 overflow-hidden flex flex-col items-center">
          <img 
            src="/images/techfoundry-logo.png" 
            alt="TechFoundry Emblem" 
            className="h-12 md:h-16 w-auto object-contain brightness-0 opacity-15 mb-2 select-none pointer-events-none" 
          />
          <p className="serif select-none text-center text-[11vw] leading-none tracking-tight text-ink/10">
            TechFoundry
          </p>
        </div>
      </FadeIn>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-[13px] text-ash">
        <span>TechFoundry</span>
        <span>India / Open to the world</span>
        <span className="text-ember">Ideas. Made. Real.</span>
      </div>
    </footer>
  );
}
