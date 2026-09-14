export type ProjectCategory = "Web" | "Full-Stack" | "UI/UX";

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  purpose: string;
  outcome: string;
  category: ProjectCategory;
  filterClass: "filter-web" | "filter-fullstack" | "filter-uiux";
  stack: string[];
  image: string;
  imageAlt: string;
  gallery: string;
  sections: ProjectSection[];
  limitations: string[];
  relatedSlugs: string[];
};

export const projects: Project[] = [
  {
    slug: "semantic-responsive-interface",
    title: "Semantic responsive interface",
    summary: "A local website interface study focused on semantic HTML and responsive CSS.",
    purpose: "Explore how a small web interface can stay readable across screen sizes with a clear document structure.",
    outcome: "A grounded work sample that demonstrates responsive layout decisions without presenting a demo or client launch as proof.",
    category: "Web",
    filterClass: "filter-web",
    stack: ["HTML", "CSS"],
    image: "project-01.png",
    imageAlt: "Responsive website interface work sample",
    gallery: "portfolio-gallery-web",
    sections: [
      {
        heading: "Original context",
        body: "This sample represents the interface-focused side of my work: start with meaningful HTML, then use CSS to make the same content useful on both wide and narrow screens.",
      },
      {
        heading: "Implementation and usage",
        body: "The work is framed as a local interface study using semantic HTML and responsive CSS. It is useful as a reference for the structure and visual decisions behind a small content-led website.",
      },
    ],
    limitations: [
      "The repository contains a local image sample rather than a public project URL.",
      "There is no external client brief or production analytics attached to this work sample.",
    ],
    relatedSlugs: ["react-interface-study", "interface-design-study"],
  },
  {
    slug: "laravel-mysql-application-interface",
    title: "Laravel and MySQL application interface",
    summary: "A full-stack application interface study using Laravel and MySQL.",
    purpose: "Explore how an application interface can present structured data while keeping backend and frontend responsibilities understandable.",
    outcome: "A local work sample that connects application screens with the Laravel and MySQL tools documented elsewhere in this portfolio.",
    category: "Full-Stack",
    filterClass: "filter-fullstack",
    stack: ["Laravel", "MySQL"],
    image: "project-02.png",
    imageAlt: "Laravel and MySQL application interface work sample",
    gallery: "portfolio-gallery-fullstack",
    sections: [
      {
        heading: "Original context",
        body: "The sample grows from the practical full-stack work I describe in my notes: define the user action first, keep response shapes deliberate, and make failure states understandable to the interface.",
      },
      {
        heading: "Implementation and usage",
        body: "Laravel provides the application structure and MySQL represents the data layer in this study. The interface is presented as a local example of how those concerns can support a usable web flow.",
      },
    ],
    limitations: [
      "The repository does not include a live API endpoint or a hosted application for this sample.",
      "The image communicates the interface direction; it should not be read as a claim about scale, traffic, or a completed client deployment.",
    ],
    relatedSlugs: ["react-interface-study", "php-node-backend-study"],
  },
  {
    slug: "interface-design-study",
    title: "Interface design study",
    summary: "A UI/UX exploration of layout, hierarchy, and usability using Figma.",
    purpose: "Test how visual hierarchy and interaction intent can be made clear before implementation begins.",
    outcome: "A concise design work sample that keeps layout and usability decisions visible instead of hiding them behind a finished screenshot.",
    category: "UI/UX",
    filterClass: "filter-uiux",
    stack: ["Figma", "UI/UX"],
    image: "project-03.png",
    imageAlt: "Figma interface design study work sample",
    gallery: "portfolio-gallery-uiux",
    sections: [
      {
        heading: "Original context",
        body: "This study represents the design layer of my process: decide what deserves attention, establish a readable hierarchy, and keep the path through the interface understandable.",
      },
      {
        heading: "Implementation and usage",
        body: "Figma is used here to explore layout and interaction ideas before code. The work can support a later responsive implementation, but the repository only makes the design study itself available.",
      },
    ],
    limitations: [
      "This is a design study rather than a claim that a matching production interface is currently deployed.",
      "The repository does not include user research results or measured usability outcomes for this sample.",
    ],
    relatedSlugs: ["semantic-responsive-interface", "react-interface-study"],
  },
  {
    slug: "react-interface-study",
    title: "Responsive React interface study",
    summary: "A frontend work sample exploring responsive behavior with JavaScript and React.",
    purpose: "Explore how a component-based interface can keep its structure and interaction clear as the viewport changes.",
    outcome: "A local frontend sample that complements the repository's React and componentization notes with a concrete visual reference.",
    category: "Web",
    filterClass: "filter-web",
    stack: ["JavaScript", "React"],
    image: "project-04.png",
    imageAlt: "Responsive JavaScript and React interface work sample",
    gallery: "portfolio-gallery-web",
    sections: [
      {
        heading: "Original context",
        body: "The sample reflects a frontend workflow where repeated user-facing patterns are kept understandable and the first component API stays small.",
      },
      {
        heading: "Implementation and usage",
        body: "JavaScript and React provide the interface layer for this study. It is useful for discussing responsive composition and component boundaries without requiring a remote preview.",
      },
    ],
    limitations: [
      "The repository includes a local work sample and image, not a hosted React demo.",
      "No performance benchmark or production usage metric is claimed for this study.",
    ],
    relatedSlugs: ["interface-design-study", "laravel-mysql-application-interface"],
  },
  {
    slug: "php-node-backend-study",
    title: "PHP and Node.js backend study",
    summary: "A local backend work sample exploring PHP and Node.js development patterns.",
    purpose: "Keep backend experimentation connected to the practical concerns of routes, data handling, and maintainable application structure.",
    outcome: "A repository-supported work sample that shows the backend technologies I use without requiring a running service to understand its role.",
    category: "Full-Stack",
    filterClass: "filter-fullstack",
    stack: ["PHP", "Node.js"],
    image: "project-05.png",
    imageAlt: "PHP and Node.js backend application work sample",
    gallery: "portfolio-gallery-fullstack",
    sections: [
      {
        heading: "Original context",
        body: "This sample sits alongside my broader full-stack practice: keep the server-side logic focused, make data decisions explicit, and leave the interface with a useful path through success and failure.",
      },
      {
        heading: "Implementation and usage",
        body: "PHP and Node.js are the documented technologies for this local study. The sample gives a starting point for discussing backend patterns and integration choices rather than standing in for a public service.",
      },
    ],
    limitations: [
      "The repository does not expose a live backend endpoint for visitors to exercise.",
      "The work sample does not claim a specific deployment, throughput, or production integration.",
    ],
    relatedSlugs: ["laravel-mysql-application-interface", "react-interface-study"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
