import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { config } from "./data/portfolio";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(config.enablePreloader);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Projects />

        {/* Placeholder sections — filled in upcoming phases. */}
        <section id="skills" className="section container">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Coming in Phase 5</h2>
        </section>

        <section id="journey" className="section container">
          <span className="section-label">Journey</span>
          <h2 className="section-title">Coming in Phase 6</h2>
        </section>

        <section id="contact" className="section container">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Coming in Phase 8</h2>
        </section>
      </main>
    </>
  );
}