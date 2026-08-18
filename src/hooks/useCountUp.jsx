import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

export function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    // easeOutExpo for a premium settle
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(ease(progress) * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration, reduceMotion]);

  return value;
}