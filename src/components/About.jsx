import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useCountUp } from "../hooks/useCountUp";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./About.css";

/* Single animated statistic */
function Stat({ stat, active, delay }) {
  const count = useCountUp(stat.value, active);
  return (
    <motion.div
      className="about__stat"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="about__stat-value">
        {count}
        <span className="about__stat-suffix">{stat.suffix}</span>
      </div>
      <div className="about__stat-label">{stat.label}</div>
    </motion.div>
  );
}

/* Profile image with parallax (scroll) + tilt (mouse, desktop) */
function ProfileMedia() {
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();
  const [imgError, setImgError] = useState(false);
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleMove = (e) => {
    if (!isDesktop || reduceMotion || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.div
      className="about__media"
      ref={wrapRef}
      style={{ y: reduceMotion ? 0 : y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.div
        className="about__media-inner"
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {!imgError ? (
          <img
            src={portfolio.profileImage}
            alt={`Portrait of ${portfolio.name}`}
            className="about__img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="about__img-placeholder" aria-hidden="true">
            <span>{portfolio.initials}</span>
          </div>
        )}
        <div className="about__media-frame" aria-hidden="true" />
      </motion.div>

      <div className="about__badge">
        <MapPin size={14} />
        <span>{portfolio.location}</span>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInViewOnce({ threshold: 0.25 });
  const [tagRef, tagsInView] = useInViewOnce({ threshold: 0.4 });

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container about__grid">
        <div className="about__left">
          <ProfileMedia />
        </div>

        <div className="about__right">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About
          </motion.span>

          <motion.h2
            className="section-title about__title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Designing &amp; engineering experiences that stay with people.
          </motion.h2>

          <motion.p
            className="about__bio text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
          >
            {portfolio.shortBio}
          </motion.p>

          <div className="about__stats">
            {portfolio.stats.map((stat, i) => (
              <Stat
                key={stat.label}
                stat={stat}
                active={inView}
                delay={0.25 + i * 0.1}
              />
            ))}
          </div>

          <div className="about__exploring" ref={tagRef}>
            <div className="about__exploring-head">
              <Sparkles size={16} />
              <span>Currently Exploring</span>
            </div>
            <motion.ul
              className="about__tags"
              initial="hidden"
              animate={tagsInView ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {portfolio.currentlyExploring.map((tag) => (
                <motion.li
                  key={tag}
                  className="about__tag"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    show: { opacity: 1, scale: 1, y: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ y: -3 }}
                >
                  {tag}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}