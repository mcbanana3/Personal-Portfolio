import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Hero.css";

/* ---- Inline brand icons (Lucide no longer ships brand logos) ---- */
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z" />
    </svg>
  );
}

/* Magnetic wrapper for CTAs (desktop only) */
function Magnetic({ children, disabled }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.3);
    y.set(my * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y, display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef(null);

  // Rotate roles
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % portfolio.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Mouse-tracking glow (desktop only)
  useEffect(() => {
    if (!isDesktop || reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isDesktop, reduceMotion]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const name = portfolio.name;
  const letters = Array.from(name);

  const socialItems = [
    { key: "github", url: portfolio.socials.github, Icon: GithubIcon },
    { key: "linkedin", url: portfolio.socials.linkedin, Icon: LinkedinIcon },
    { key: "twitter", url: portfolio.socials.twitter, Icon: TwitterIcon },
  ].filter((s) => s.url);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        {isDesktop && !reduceMotion && <div className="hero__glow" />}
      </div>

      <div className="container hero__content">
        <motion.p
          className="hero__hello"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        <h1 className="hero__name" aria-label={name}>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="hero__name-char"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                delay: 1 + i * 0.04,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="hero__role-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="hero__role-prefix">I'm a</span>
          <span className="hero__role-slot">
            <motion.span
              key={roleIndex}
              className="hero__role"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {portfolio.roles[roleIndex]}
            </motion.span>
          </span>
        </motion.div>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          {portfolio.tagline}
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          <Magnetic disabled={!isDesktop}>
            <button
              className="btn btn--primary"
              onClick={() => scrollTo("projects")}
            >
              View My Work <ArrowUpRight size={18} />
            </button>
          </Magnetic>
          <Magnetic disabled={!isDesktop}>
            <button
              className="btn btn--ghost"
              onClick={() => scrollTo("contact")}
            >
              Let's Connect
            </button>
          </Magnetic>
        </motion.div>

        {socialItems.length > 0 && (
          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            {socialItems.map(({ key, url, Icon }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social"
                aria-label={key}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        )}
      </div>

      <motion.button
        className="hero__scroll"
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        aria-label="Scroll to About"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}