import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectPlaceholder from "./ProjectPlaceholder";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";

export default function ProjectCard({ project, onOpen, index }) {
  const isDesktop = useIsDesktop();
  const reduceMotion = usePrefersReducedMotion();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [imgError, setImgError] = useState(false);

  const handleMove = (e) => {
    if (!isDesktop || reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 6 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.article
      className={`project-card ${project.featured ? "is-featured" : ""}`}
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.button
        type="button"
        className="project-card__inner"
        onClick={() => onOpen(project)}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        aria-label={`Open details for ${project.title}`}
      >
        <div className="project-card__media">
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="project-card__img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <ProjectPlaceholder
              label={project.category}
              seed={project.title}
              className="project-card__ph"
            />
          )}
          <div className="project-card__overlay" aria-hidden="true">
            <span className="project-card__open">
              View <ArrowUpRight size={16} />
            </span>
          </div>
          <span className="project-card__year">{project.year}</span>
        </div>

        <div className="project-card__body">
          <span className="project-card__cat">{project.category}</span>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.shortDescription}</p>
          <ul className="project-card__tech">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </motion.button>
    </motion.article>
  );
}