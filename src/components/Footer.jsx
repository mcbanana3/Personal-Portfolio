import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import "./Footer.css";

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

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    portfolio.socials.github && {
      key: "github",
      href: portfolio.socials.github,
      Icon: GithubIcon,
    },
    portfolio.socials.linkedin && {
      key: "linkedin",
      href: portfolio.socials.linkedin,
      Icon: LinkedinIcon,
    },
    { key: "email", href: `mailto:${portfolio.email}`, Icon: Mail },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <motion.div
          className="footer__top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#home" className="footer__logo">
            {portfolio.name}
          </a>

          <div className="footer__socials">
            {socials.map(({ key, href, Icon }) => (
              <a
                key={key}
                href={href}
                className="footer__social"
                target={key === "email" ? undefined : "_blank"}
                rel={key === "email" ? undefined : "noopener noreferrer"}
                aria-label={key}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <button
            className="footer__top-btn"
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </motion.div>

        <div className="footer__divider" aria-hidden="true" />

        <div className="footer__bottom">
          <p className="text-muted">
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
          </p>
          <p className="text-muted footer__built">
            Built with React &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}