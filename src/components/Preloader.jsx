import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolio, config } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const reduceMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!config.enablePreloader || reduceMotion) {
      onComplete?.();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Ease the counter so it feels natural, not linear
      current += Math.max(1, Math.round((100 - current) / 8));
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setCount(current);
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete, reduceMotion]);

  // If preloader disabled, render nothing
  if (!config.enablePreloader || reduceMotion) return null;

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      animate={count >= 100 ? { opacity: 1 } : {}}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      onAnimationComplete={() => {
        if (count >= 100) {
          // small hold, then dismiss
          setTimeout(() => onComplete?.(), 350);
        }
      }}
    >
      <div className="preloader__inner">
        <motion.div
          className="preloader__initials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {portfolio.initials}
        </motion.div>

        <motion.div
          className="preloader__name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {portfolio.name}
        </motion.div>

        <div className="preloader__bar">
          <motion.div
            className="preloader__bar-fill"
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <div className="preloader__count">{count}%</div>
      </div>
    </motion.div>
  );
}