import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Check } from "lucide-react";
import ProjectPlaceholder from "./ProjectPlaceholder";

/* Inline GitHub icon (Lucide dropped brand logos, so we render our own) */
function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="modal__media">
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="modal__img"
              onError={() => setImgError(true)}
            />
          ) : (
            <ProjectPlaceholder
              label={project.category}
              seed={project.title}
              className="modal__ph"
            />
          )}
          <span className="modal__year">{project.year}</span>
        </div>

        <div className="modal__body">
          <span className="modal__cat">{project.category}</span>
          <h2 className="modal__title">{project.title}</h2>
          <p className="modal__desc">{project.fullDescription}</p>

          {project.features?.length > 0 && (
            <div className="modal__block">
              <h4 className="modal__heading">Key Features</h4>
              <ul className="modal__features">
                {project.features.map((f) => (
                  <li key={f}>
                    <Check size={15} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && (
            <div className="modal__block">
              <h4 className="modal__heading">Challenges</h4>
              <p className="text-muted">{project.challenges}</p>
            </div>
          )}

          <div className="modal__block">
            <h4 className="modal__heading">Technologies</h4>
            <ul className="modal__tech">
              {project.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="modal__actions">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <GithubIcon size={16} /> View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Live Demo <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}