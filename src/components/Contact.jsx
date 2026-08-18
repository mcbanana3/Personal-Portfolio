import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, Send, Check, Loader2, AlertCircle, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useContactForm } from "../hooks/useContactForm";
import "./Contact.css";

/* Inline brand icons (Lucide dropped brand logos) */
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function Contact() {
  const [headRef, headInView] = useInViewOnce({ threshold: 0.2 });
  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useContactForm();

  const channels = [
    { key: "email", label: portfolio.email, href: `mailto:${portfolio.email}`, Icon: Mail },
    portfolio.socials.github && {
      key: "github",
      label: "GitHub",
      href: portfolio.socials.github,
      Icon: GithubIcon,
      external: true,
    },
    portfolio.socials.linkedin && {
      key: "linkedin",
      label: "LinkedIn",
      href: portfolio.socials.linkedin,
      Icon: LinkedinIcon,
      external: true,
    },
    { key: "resume", label: "Resume", href: portfolio.resumeUrl, Icon: FileText, external: true },
  ].filter(Boolean);

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__head" ref={headRef}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.span>
          <motion.h2
            className="contact__title"
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's build something
            <br />
            <span className="contact__title-accent">worth remembering.</span>
          </motion.h2>
          <motion.p
            className="contact__lead text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
          >
            Have a role, a project, or an idea? My inbox is always open.
          </motion.p>
        </div>

        <div className="contact__grid">
          {/* Channels */}
          <motion.div
            className="contact__channels"
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            {channels.map(({ key, label, href, Icon, external }) => (
              <a
                key={key}
                href={href}
                className="contact__channel"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="contact__channel-icon">
                  <Icon size={18} />
                </span>
                <span className="contact__channel-label">{label}</span>
                <ArrowUpRight size={16} className="contact__channel-arrow" />
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && errors.name ? "has-error" : ""}
                aria-invalid={Boolean(touched.name && errors.name)}
                placeholder="Your name"
              />
              {touched.name && errors.name && (
                <span className="field__error">{errors.name}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? "has-error" : ""}
                aria-invalid={Boolean(touched.email && errors.email)}
                placeholder="you@example.com"
              />
              {touched.email && errors.email && (
                <span className="field__error">{errors.email}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.message && errors.message ? "has-error" : ""}
                aria-invalid={Boolean(touched.message && errors.message)}
                placeholder="Tell me about your project or role..."
              />
              {touched.message && errors.message && (
                <span className="field__error">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary contact__submit"
              disabled={status === "submitting" || status === "success"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "submitting" ? (
                  <motion.span
                    key="loading"
                    className="contact__submit-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 size={18} className="spin" /> Sending...
                  </motion.span>
                ) : status === "success" ? (
                  <motion.span
                    key="success"
                    className="contact__submit-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check size={18} /> Message sent
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    className="contact__submit-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Send Message <Send size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  className="contact__status contact__status--ok"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onAnimationComplete={() => setTimeout(reset, 4000)}
                >
                  <Check size={15} /> Thanks! I'll get back to you soon.
                </motion.p>
              )}
              {status === "error" && Object.keys(errors).length > 0 && (
                <motion.p
                  className="contact__status contact__status--err"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <AlertCircle size={15} /> Please fix the errors above.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}