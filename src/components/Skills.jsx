import { useRef } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import SkillIcon from "./SkillIcon";
import "./Skills.css";

function SkillGroup({ group, index }) {
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();
  const tileRef = useRef(null);

  const handleMove = (e) => {
    if (!isDesktop || reduceMotion || !tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    tileRef.current.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    tileRef.current.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  const skills = Array.isArray(group.skills) ? group.skills : [];

  return (
    <motion.div
      className="skill-group"
      ref={tileRef}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="skill-group__spotlight" aria-hidden="true" />
      <div className="skill-group__head">
        <h3 className="skill-group__title">{group.category}</h3>
        <span className="skill-group__count">{skills.length}</span>
      </div>

      <motion.ul
        className="skill-group__list"
        role="list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
        }}
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            className="skill-chip"
            variants={{
              hidden: { opacity: 0, scale: 0.7 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            whileHover={{ y: -4 }}
          >
            <SkillIcon name={skill} />
            <span className="skill-chip__name">{skill}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function Skills() {
  const [headRef, headInView] = useInViewOnce({ threshold: 0.3 });

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="skills__head" ref={headRef}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Skills
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            A toolkit built across the stack.
          </motion.h2>
        </div>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}