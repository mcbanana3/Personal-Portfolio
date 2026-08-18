import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { skillGroups } from "../data/skills";
import { projects } from "../data/projects";
import { useInViewOnce } from "../hooks/useInViewOnce";
import "./Terminal.css";

const PROMPT = "visitor@portfolio:~$";

export default function Terminal() {
  const [headRef, headInView] = useInViewOnce({ threshold: 0.3 });
  const [history, setHistory] = useState([]); // {type: 'in'|'out', text}
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState([]); // for arrow-key recall
  const [logIndex, setLogIndex] = useState(-1);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  /* ---------- command implementations ---------- */
  const commands = useMemo(() => {
    const openUrl = (url) => {
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    };

    return {
      help: () => [
        "Available commands:",
        "  about      — who I am",
        "  skills     — my tech stack",
        "  projects   — list my projects",
        "  contact    — how to reach me",
        "  github     — open my GitHub",
        "  linkedin   — open my LinkedIn",
        "  whoami     — quick identity",
        "  ls         — list sections",
        "  clear      — clear the screen",
      ],
      about: () => [portfolio.shortBio, "", `Location: ${portfolio.location}`],
      whoami: () => [`${portfolio.name} — ${portfolio.roles[0]}`],
      ls: () => [
        "about  projects  skills  journey  certifications  contact",
      ],
      skills: () =>
        skillGroups.map((g) => `${g.category.padEnd(20)} ${g.skills.join(", ")}`),
      projects: () =>
        projects.length
          ? projects.map(
              (p) => `[${p.year}] ${p.title} — ${p.category}`
            )
          : ["No projects yet."],
      contact: () => {
        const out = [`Email:    ${portfolio.email}`];
        if (portfolio.socials.github) out.push(`GitHub:   ${portfolio.socials.github}`);
        if (portfolio.socials.linkedin) out.push(`LinkedIn: ${portfolio.socials.linkedin}`);
        out.push(`Resume:   ${portfolio.resumeUrl}`);
        return out;
      },
      github: () => {
        if (!portfolio.socials.github) return ["No GitHub link configured."];
        openUrl(portfolio.socials.github);
        return ["Opening GitHub..."];
      },
      linkedin: () => {
        if (!portfolio.socials.linkedin) return ["No LinkedIn link configured."];
        openUrl(portfolio.socials.linkedin);
        return ["Opening LinkedIn..."];
      },
    };
  }, []);

  /* ---------- boot sequence ---------- */
  useEffect(() => {
    if (!headInView || history.length > 0) return;
    const boot = [
      { type: "out", text: `${portfolio.name} — interactive shell v1.0` },
      { type: "out", text: "Type 'help' to see available commands." },
    ];
    let i = 0;
    const id = setInterval(() => {
      setHistory((h) => [...h, boot[i]]);
      i++;
      if (i >= boot.length) clearInterval(id);
    }, 350);
    return () => clearInterval(id);
  }, [headInView, history.length]);

  /* ---------- auto-scroll to bottom ---------- */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const entries = [{ type: "in", text: raw }];

    if (cmd === "") {
      setHistory((h) => [...h, ...entries]);
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const fn = commands[cmd];
    if (fn) {
      const output = fn();
      output.forEach((line) => entries.push({ type: "out", text: line }));
    } else {
      entries.push({
        type: "out",
        text: `command not found: ${cmd}. Type 'help'.`,
      });
    }

    setHistory((h) => [...h, ...entries]);
    setCmdLog((log) => [...log, raw]);
    setLogIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const next = logIndex === -1 ? cmdLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(next);
      setInput(cmdLog[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      if (logIndex === -1) return;
      const next = logIndex + 1;
      if (next >= cmdLog.length) {
        setLogIndex(-1);
        setInput("");
      } else {
        setLogIndex(next);
        setInput(cmdLog[next]);
      }
    }
  };

  return (
    <section id="terminal" className="section terminal-section">
      <div className="container">
        <div className="terminal-section__head" ref={headRef}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Terminal
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Prefer the command line? Try it.
          </motion.h2>
        </div>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
            <span className="terminal__bar-title">
              <TerminalSquare size={13} /> bash — portfolio
            </span>
          </div>

          <div className="terminal__body" ref={bodyRef}>
            {history.map((line, i) => (
              <div
                key={i}
                className={`terminal__line ${
                  line.type === "in" ? "is-input" : "is-output"
                }`}
              >
                {line.type === "in" && (
                  <span className="terminal__prompt">{PROMPT}</span>
                )}
                <span className="terminal__text">{line.text}</span>
              </div>
            ))}

            <div className="terminal__line is-active">
              <span className="terminal__prompt">{PROMPT}</span>
              <input
                ref={inputRef}
                className="terminal__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command input"
              />
              <span className="terminal__cursor" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

        <p className="terminal-section__hint text-muted">
          Tip: type <code>help</code> and press Enter. Use ↑ / ↓ for history.
        </p>
      </div>
    </section>
  );
}