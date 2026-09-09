import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio | Saham Ali",
  description: "Selected web, full-stack, and interface work by Saham Ali.",
};

const projects = [
  { image: "project-01.png", title: "Responsive website interface", detail: "Semantic HTML and responsive CSS practice.", tools: "HTML, CSS" },
  { image: "project-02.png", title: "Laravel application interface", detail: "A full-stack interface study using Laravel and MySQL.", tools: "Laravel, MySQL" },
  { image: "project-03.png", title: "Interface design study", detail: "A layout and usability exploration focused on hierarchy.", tools: "Figma, UI/UX" },
  { image: "project-04.png", title: "React interface study", detail: "A responsive interface exploration with JavaScript and React.", tools: "JavaScript, React" },
  { image: "project-05.png", title: "Backend application study", detail: "A local work sample exploring PHP and Node.js patterns.", tools: "PHP, Node.js" },
];

export default function PortfolioPage() {
  return (
    <section className="portfolio section" aria-labelledby="portfolio-title">
      <div className="container section-title">
        <h1 id="portfolio-title">Portfolio</h1>
        <p>Selected work samples showing how I approach interfaces, APIs, and responsive web development.</p>
      </div>
      <div className="container">
        <div className="row gy-4">
          {projects.map((project) => (
            <article className="col-lg-4 col-md-6" key={project.image}>
              <div className="portfolio-content h-100">
                <img src={`/assets/img/${project.image}`} className="img-fluid" alt={project.title} />
                <div className="portfolio-info">
                  <h2>{project.title}</h2>
                  <p>{project.detail}</p>
                  <span className="badge rounded-pill">{project.tools}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4"><Link href="/contact">Ask about a project or collaboration</Link>.</p>
      </div>
    </section>
  );
}
