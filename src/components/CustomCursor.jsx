import { useEffect, useRef, useState } from "react";
import { config } from "../data/portfolio";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./CustomCursor.css";

export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const active = config.enableCustomCursor && isDesktop && !reduceMotion;

  useEffect(() => {
    if (!active) {
      document.body.classList.remove("has-custom-cursor");
      setEnabled(false);
      return;
    }

    document.body.classList.add("has-custom-cursor");
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      // Ring lags behind for a premium trailing feel
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, input, textarea, [role='tab'], .skill-chip, .project-card__inner")) {
        ring?.classList.add("is-hovering");
      }
    };
    const onOut = () => ring?.classList.remove("is-hovering");
    const onDown = () => ring?.classList.add("is-down");
    const onUp = () => ring?.classList.remove("is-down");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}