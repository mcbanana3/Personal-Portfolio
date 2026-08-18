/* Lightweight, dependency-free skill icon.
   Renders a rounded monogram tile with a deterministic hue per skill. */

function hueFromString(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function monogram(name = "") {
  const cleaned = name.replace(/[^a-zA-Z0-9]/g, "");
  if (!cleaned) return "•";
  return cleaned.length <= 4
    ? cleaned.slice(0, 2).toUpperCase()
    : cleaned.slice(0, 1).toUpperCase();
}

export default function SkillIcon({ name }) {
  const hue = hueFromString(name);
  return (
    <span className="skill-icon" style={{ "--icon-hue": hue }} aria-hidden="true">
      {monogram(name)}
    </span>
  );
}