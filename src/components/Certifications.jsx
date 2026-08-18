import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { certifications } from "../data/certifications";
import { useInViewOnce } from "../hooks/useInViewOnce";
import "./Certifications.css";

function CertCard({ cert, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      className="cert-card"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cert-card__media">
        {!imgError && cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="cert-card__img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cert-card__ph" aria-hidden="true">
            <Award size={26} />
            <span>{cert.issuer}</span>
          </div>
        )}
      </div>

      <div className="cert-card__body">
        <h3 className="cert-card__title">{cert.title}</h3>
        <p className="cert-card__issuer">{cert.issuer}</p>
        <div className="cert-card__foot">
          <span className="cert-card__date">{cert.date}</span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card__link"
            >
              View credential <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Certifications() {
  const [headRef, headInView] = useInViewOnce({ threshold: 0.3 });

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <div className="certifications__head" ref={headRef}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Certifications
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Credentials &amp; recognition.
          </motion.h2>
        </div>

        <div className="certifications__grid">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}