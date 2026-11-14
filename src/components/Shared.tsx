import { type ReactNode, type MouseEvent, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

export const EASE_CUSTOM = [0.76, 0, 0.24, 1] as const;
export const EASE_SOFT = [0.5, 1, 0.89, 1] as const;

/**
 * Split text character-by-character reveal with skew and blur.
 */
export function SplitTextReveal({
  text,
  delay = 0,
  className = "",
  active = true,
}: {
  text: string;
  delay?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, rotateX: -90, filter: "blur(10px)" }}
          animate={active ? { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.8,
            ease: EASE_CUSTOM,
            delay: delay + i * 0.02,
          }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Image that zooms and shifts internally on scroll.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  zoom = 1.2,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoom?: number;
  fit?: "cover" | "contain";
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, zoom]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className={`absolute inset-0 h-[125%] w-full object-${fit} ${imgClassName}`}
      />
    </div>
  );
}

/**
 * Element that "floats" with perspective based on mouse position.
 */
export function PerspectiveCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

  function onMove(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}

/**
 * Animated SVG border that "draws" itself.
 */
export function DrawingBorder({ active = true }: { active?: boolean }) {
  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none" fill="none">
      <motion.rect
        x="0" y="0" width="100%" height="100%"
        stroke="var(--color-ember)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: EASE_CUSTOM }}
      />
    </svg>
  );
}

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.span 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="inline-block h-[6px] w-[6px] rounded-full bg-ember" 
      />
      <span className="paren text-[13px] text-ash md:text-sm italic">( {children} )</span>
    </div>
  );
}

export function ULink({
  href,
  children,
  className = "",
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: (e: MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`u-line inline-block group relative ${className}`}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 h-[1px] w-full bg-current origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ ease: EASE_CUSTOM }}
      />
    </a>
  );
}

export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Simple fade in with a little slide and blur.
 */
export function FadeIn({
  children,
  delay = 0,
  className = "",
  blur = 8,
  y = 20,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  blur?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_CUSTOM, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const HeroReveal = FadeIn;
export const MaskReveal = FadeIn;

