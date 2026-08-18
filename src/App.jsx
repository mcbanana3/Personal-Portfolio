import { useTheme } from "./hooks/useTheme";
import { portfolio } from "./data/portfolio";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <main id="main" className="container section">
        <span className="section-label">Phase 1 — Setup Complete</span>

        <h1 className="section-title" style={{ fontSize: "var(--fs-3xl)" }}>
          {portfolio.name}
        </h1>

        <p className="text-muted" style={{ maxWidth: "48ch" }}>
          {portfolio.tagline}
        </p>

        <button
          onClick={toggleTheme}
          className="tile"
          aria-label="Toggle color theme"
          style={{
            marginTop: "var(--space-lg)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.7rem 1.1rem",
            color: "var(--text)",
          }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>

        <p
          className="text-muted"
          style={{ marginTop: "var(--space-xl)", fontSize: "var(--fs-sm)" }}
        >
          Theme, tokens, and data files are wired up. Ready for Phase 2.
        </p>
      </main>
    </>
  );
}