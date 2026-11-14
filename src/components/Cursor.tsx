import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Liquid Organic Droplet & Fluid Mercury Cursor.
 * - Fluid velocity-based surface tension deformation (squash & stretch along movement vector)
 * - Seamlessly expands into a translucent liquid lens on interactive hover
 * - Elastic droplet recoil on tap / click
 * - Completely inactive on mobile / touch devices (0% overhead)
 * - Hidden until first mouse movement (no top-left corner flashing)
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth liquid spring physics for the fluid droplet
  const springX = useSpring(mouseX, { stiffness: 420, damping: 28, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 420, damping: 28, mass: 0.4 });

  // Velocity & angle tracking for physical fluid surface tension
  const [fluidTransform, setFluidTransform] = useState({ scaleX: 1, scaleY: 1, rotate: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    setEnabled(true);

    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      if (!visible) setVisible(true);

      const now = performance.now();
      const dt = Math.max(1, now - lastPos.current.time);
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      const speed = (dist / dt) * 1000; // pixels per second

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calculate directional stretch angle and elongation
      if (dist > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretch = 1 + Math.min(speed / 950, 0.65);
        const squash = 1 / Math.sqrt(stretch);

        setFluidTransform({
          scaleX: stretch,
          scaleY: squash,
          rotate: angle,
        });
      }

      lastPos.current = { x: e.clientX, y: e.clientY, time: now };

      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, input, textarea, [data-hover], select, [role='button']"));

      // Ease back to round droplet when motion stops
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setTimeout(() => {
          setFluidTransform(prev => ({
            ...prev,
            scaleX: 1,
            scaleY: 1,
          }));
        }, 60);
      });
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!enabled) return null;

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-[500] overflow-hidden select-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ── FLUID MERCURY DROPLET (ORGANIC STRETCHING AROUND VELOCITY VECTOR) ── */}
      <motion.div
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={{
            scale: pressed ? 0.75 : hovering ? 1.5 : 1,
            opacity: hovering ? 0.95 : 0.85,
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 24,
            mass: 0.4,
          }}
          style={{
            transform: `rotate(${fluidTransform.rotate}deg) scale(${fluidTransform.scaleX}, ${fluidTransform.scaleY})`,
            transformOrigin: "center center",
          }}
          className="relative flex items-center justify-center transition-transform duration-75 ease-out"
        >
          {hovering ? (
            /* Liquid translucent lens on hover */
            <div className="h-10 w-10 rounded-full border border-ember/70 bg-ember/10 backdrop-blur-[1px] shadow-[0_0_16px_rgba(225,73,14,0.25)] flex items-center justify-center transition-all duration-200">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            </div>
          ) : (
            /* Silky liquid droplet at rest / moving */
            <div className="relative flex items-center justify-center">
              {/* Outer soft fluid halo */}
              <div className="h-6 w-6 rounded-full bg-ember/15 blur-[2px]" />
              {/* Core molten droplet */}
              <div className="absolute h-3.5 w-3.5 rounded-full bg-ink/90 border border-paper/40 shadow-[0_2px_8px_rgba(23,19,14,0.35)] flex items-center justify-center">
                <span className="h-1 w-1 rounded-full bg-ember shadow-[0_0_4px_rgba(225,73,14,0.8)]" />
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
