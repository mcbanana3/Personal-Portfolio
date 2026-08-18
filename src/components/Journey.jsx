import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Briefcase, Trophy, BadgeCheck } from "lucide-react";
import { journey } from "../data/journey";
import { useInViewOnce } from "../hooks/useInViewOnce";
import "./Journey.css";

const TYPE_META = {
  education: { Icon: GraduationCap, label: "Education" },
  experience: { Icon: Briefcase, label: "Experience" },
  achievement: { Icon: Trophy, label: "Achievement" },
  certification: { Icon: BadgeCheck, label: "Certification" },
};

function TimelineItem({ item, index }) {
  const meta = TYPE_META[item.type] || TYPE_META.experience;
  const { Icon } = meta;
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.li
      className={`timeline__item timeline__item--${side}`}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="timeline__node" aria-hidden="true">
        <Icon size={16} />
      </div>

      <div className="timeline__card">
        <div className="timeline__meta">
          <span className={`timeline__badge timeline__badge--${item.type}`}>
            {meta.label}
          </span>
          <span className="timeline__date">{item.date}</span>
        </div>
        <h3 className="timeline__title">{item.title}</h3>
        <p className="timeline__org">{item.org}</p>
        <p className="timeline__desc text-muted">{item.description}</p>
      </div>
    </motion.li>
  );
}

export default function Journey() {
  const [headRef, headInView] = useInViewOnce({ threshold: 0.3 });
  const spineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="section journey">
      <div className="container">
        <div className="journey__head" ref={headRef}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Journey
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            The story so far.
          </motion.h2>
        </div>

        <div className="timeline" ref={spineRef}>
          <div className="timeline__spine" aria-hidden="true">
            <motion.div
              className="timeline__spine-fill"
              style={{ scaleY: progress }}
            />
          </div>

          <ol className="timeline__list">
            {journey.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}