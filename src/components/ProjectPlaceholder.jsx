import { Image as ImageIcon } from "lucide-react";

function hueFromString(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export default function ProjectPlaceholder({ label = "", seed = "", className = "" }) {
  const hue = hueFromString(seed || label);

  return (
    <div
      className={`project-ph ${className}`}
      style={{ "--ph-hue": hue }}
      aria-hidden="true"
    >
      <div className="project-ph__mesh" />
      <div className="project-ph__content">
        <ImageIcon size={22} />
        {label && <span className="project-ph__label">{label}</span>}
      </div>
    </div>
  );
}