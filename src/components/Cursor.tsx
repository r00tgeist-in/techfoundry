import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

/**
 * Unique Precision Crosshair & Liquid-Stretchy Reticle Cursor.
 * Dynamically stretches with motion velocity, snaps corner brackets on hover,
 * and contracts with elastic recoil on click.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth liquid spring followers
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32, mass: 0.5 });

  // Velocity tracking for liquid stretch dynamics
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);

  const stretchX = useTransform(velX, [-1500, 0, 1500], [1.35, 1, 1.35]);
  const stretchY = useTransform(velY, [-1500, 0, 1500], [1.35, 1, 1.35]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, input, textarea, [data-hover], select"));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[500] overflow-hidden select-none">
      {/* ── CENTRAL PRECISION DIAMOND POINT ── */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-ember shadow-[0_0_8px_rgba(225,73,14,0.6)]"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: pressed ? 1.6 : hovering ? 0 : 1,
          rotate: hovering ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />

      {/* ── LIQUID-STRETCHY CORNER BRACKET RETICLE ── */}
      <motion.div
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          scaleX: stretchX,
          scaleY: stretchY,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: hovering ? 44 : 24,
            height: hovering ? 44 : 24,
            scale: pressed ? 0.72 : hovering ? 1.08 : 1,
            rotate: hovering ? 90 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 20,
            mass: 0.6,
          }}
        >
          {/* Top-Left Corner Bracket */}
          <span className="absolute left-0 top-0 h-2 w-2 border-l-[1.5px] border-t-[1.5px] border-ink transition-colors duration-200" />
          {/* Top-Right Corner Bracket */}
          <span className="absolute right-0 top-0 h-2 w-2 border-r-[1.5px] border-t-[1.5px] border-ink transition-colors duration-200" />
          {/* Bottom-Left Corner Bracket */}
          <span className="absolute bottom-0 left-0 h-2 w-2 border-l-[1.5px] border-b-[1.5px] border-ink transition-colors duration-200" />
          {/* Bottom-Right Corner Bracket */}
          <span className="absolute bottom-0 right-0 h-2 w-2 border-r-[1.5px] border-b-[1.5px] border-ink transition-colors duration-200" />

          {/* Micro crosshair ticks */}
          <span className="absolute h-1 w-[1px] bg-ember/60 -top-1.5" />
          <span className="absolute h-1 w-[1px] bg-ember/60 -bottom-1.5" />
          <span className="absolute w-1 h-[1px] bg-ember/60 -left-1.5" />
          <span className="absolute w-1 h-[1px] bg-ember/60 -right-1.5" />

          {/* Hover highlight wash */}
          {hovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-1 rounded-sm bg-ember/10 backdrop-blur-[0.5px]"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
