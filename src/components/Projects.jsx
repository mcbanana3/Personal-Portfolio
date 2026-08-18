import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import { useInViewOnce } from "../hooks/useInViewOnce";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "./Projects.css";
import "./ProjectModal.css";

export default function Projects() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [headRef, headInView] = useInViewOnce({ threshold: 0.3 });

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects__head" ref={headRef}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Selected work &amp; experiments.
          </motion.h2>
        </div>

        <LayoutGroup>
          <div
            className="projects__filters"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`projects__filter ${active === cat ? "is-active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {active === cat && (
                  <motion.span
                    layoutId="filter-pill"
                    className="projects__filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="projects__filter-text">{cat}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <motion.div layout className="projects__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                className={project.featured ? "grid-featured" : "grid-normal"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} onOpen={setSelected} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="projects__empty text-muted">
            No projects in this category yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}