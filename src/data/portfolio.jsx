// ============================================================
//  PERSONAL INFO — edit everything here
// ============================================================

export const portfolio = {
  name: "Aryan Yalavarthi",
  initials: "AY", // used by the preloader
  roles: [
    "Frontend Developer",
    "Creative Engineer",
    "AI Enthusiast",
    "UI Designer",
  ],
  tagline:
    "I build futuristic, interactive digital experiences where design meets engineering.",
  shortBio:
    "I'm a developer focused on crafting clean, performant, and memorable web experiences. I care about the details most people never notice.",

  location: "Guntur, Andhra Pradesh, India",
  email: "yalavarthiaryan068@gmail.com",
  resumeUrl: "/resume.pdf",
  profileImage: "/profile/profile.jpg",

  // Social links — leave a value empty ("") to hide that link in the UI
  socials: {
    github: "https://github.com/mcbanana3",
    linkedin: "https://www.linkedin.com/in/aryanyalavarthi/",
    twitter: "",
  },

  // Animated statistics shown in the About section
  stats: [
    { label: "Projects Built", value: 12, suffix: "+" },
    { label: "Technologies", value: 20, suffix: "+" },
    { label: "Years Coding", value: 3, suffix: "" },
    { label: "Certifications", value: 5, suffix: "+" },
  ],

  // "Currently Exploring" tags in the About section
  currentlyExploring: [
    "WebGL",
    "Framer Motion",
    "Edge Computing",
    "LLMs",
    "Three.js",
  ],
};

// ============================================================
//  FEATURE CONFIG — turn sections on/off
// ============================================================
export const config = {
  showTerminal: true, // set to false to hide the interactive terminal
  enableCustomCursor: true, // desktop-only custom cursor (Phase 9)
  enablePreloader: true,
};