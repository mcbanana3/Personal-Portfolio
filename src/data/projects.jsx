// ============================================================
//  PROJECTS — add/edit your projects here.
//  Put images in: public/projects/  and reference as "/projects/xxx.jpg"
//  If an image is missing, the UI shows a CSS placeholder automatically.
//  category must be one of the values in `projectCategories` below.
// ============================================================

export const projectCategories = [
  "All",
  "Autonomous Vehicles",
  "AI / ML",
  "Web Development",
  "Cloud",
  "Other",
];

export const projects = [
  {
    id: 1,
    title: "Autonomous Navigation System",
    shortDescription:
      "Real-time path planning and obstacle avoidance for self-driving platforms.",
    fullDescription:
      "A perception-and-control stack that fuses sensor data to navigate complex environments in real time. Built with a modular architecture so individual subsystems can be swapped and tested independently.",
    image: "/projects/project1.jpg",
    category: "Autonomous Vehicles",
    technologies: ["Python", "ROS", "OpenCV", "C++"],
    features: [
      "Real-time obstacle detection",
      "Dynamic path re-planning",
      "Sensor fusion pipeline",
    ],
    challenges:
      "Balancing real-time performance with accuracy under limited compute, and handling noisy sensor input gracefully.",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    year: "2026",
  },
  {
    id: 2,
    title: "AI Content Studio",
    shortDescription:
      "A polished interface for generating and refining AI content.",
    fullDescription:
      "A responsive web app that wraps generative models in a clean, intuitive UI with history, presets, and export tools. Focused on speed and a frictionless creative flow.",
    image: "/projects/project2.jpg",
    category: "AI / ML",
    technologies: ["React", "Node.js", "Framer Motion"],
    features: ["Prompt presets", "Version history", "One-click export"],
    challenges:
      "Designing an interface that stays simple while exposing powerful controls for advanced users.",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    year: "2025",
  },
  {
    id: 3,
    title: "Cloud Dashboard",
    shortDescription:
      "A real-time analytics dashboard with a premium, data-dense layout.",
    fullDescription:
      "A performant dashboard visualizing live metrics with smooth transitions, responsive charts, and a bento-style layout that scales from mobile to ultrawide displays.",
    image: "/projects/project3.jpg",
    category: "Cloud",
    technologies: ["React", "Vite", "CSS"],
    features: ["Live metrics", "Responsive bento grid", "Dark/light themes"],
    challenges:
      "Keeping the UI fluid while rendering large, frequently-updating datasets.",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    year: "2025",
  },
];