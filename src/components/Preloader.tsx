import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SOFT } from "./Shared";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const ticker = setInterval(() => {
      const t = Math.min((performance.now() - start) / 1800, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t >= 1) {
        clearInterval(ticker);
        setTimeout(() => {
          setExiting(true);
          if (!doneRef.current) {
            doneRef.current = true;
            onDone();
          }
          setTimeout(() => setGone(true), 1100);
        }, 280);
      }
    }, 32);
    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[300] bg-paper"
          initial={{ y: 0 }}
          animate={exiting ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE_SOFT }}
        >
          {/* thin progress hairline */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-ink/10">
            <div
              className="h-full bg-ember transition-[width] duration-100 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>

          <motion.div
            className="flex h-full flex-col justify-between px-[6vw] py-8 md:px-[9vw]"
            animate={exiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-baseline justify-between">
              <span className="serif text-xl text-ink md:text-2xl">TechFoundry</span>
              <span className="paren text-sm text-ash md:text-base">india</span>
            </div>

            <div className="flex items-end justify-between">
              <p className="paren max-w-[220px] pb-6 text-base leading-relaxed text-ash md:text-lg">
                ( independent minds,
                <br />
                shared ambition )
              </p>
              <div className="serif tabular-nums leading-none text-ink text-[34vw] md:text-[22vw]">
                {count}
                <span className="paren text-[0.25em] text-ember">%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
