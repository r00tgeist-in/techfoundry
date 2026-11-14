import type Lenis from "lenis";

/** Shared handle so any component can drive the smooth scroller. */
export const scrollBus: { lenis: Lenis | null } = { lenis: null };

export function scrollToTarget(target: string | number) {
  const lenis = scrollBus.lenis;
  if (lenis) {
    lenis.scrollTo(target as never, {
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
