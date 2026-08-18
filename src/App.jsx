import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { config } from "./data/portfolio";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

// Lazy-loaded, below-the-fold sections (code-split for performance)
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Journey = lazy(() => import("./components/Journey"));
const Certifications = lazy(() => import("./components/Certifications"));
const Terminal = lazy(() => import("./components/Terminal"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function SectionFallback() {
  return (
    <div
      style={{ minHeight: "40vh" }}
      aria-hidden="true"
    />
  );
}

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

      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main id="main">
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <Skills />
          <Journey />
          <Certifications />
          {config.showTerminal && <Terminal />}
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}