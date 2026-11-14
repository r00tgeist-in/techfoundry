import { useEffect } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { scrollBus } from "./lib/scroll";
import { NavContext, useRouter } from "./lib/router";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  const nav = useRouter();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 });
    scrollBus.lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      scrollBus.lenis = null;
    };
  }, []);

  useEffect(() => {
    scrollBus.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [nav.route]);

  return (
    <NavContext.Provider value={nav}>
      <div className="relative min-h-screen bg-transparent text-ink selection:bg-ink selection:text-paper">
        <Cursor />
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={nav.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {nav.route === "/" && <Home />}
            {nav.route === "/about" && <About />}
            {nav.route === "/projects" && <Projects />}
            {nav.route === "/contact" && <Contact />}
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </NavContext.Provider>
  );
}
