import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio | Saham Ali",
  description: "Selected web, full-stack, and interface work by Saham Ali.",
};

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
            <article className="col-lg-4 col-md-6" key={project.slug}>
              <div className="portfolio-project-card h-100">
                <img src={`/assets/img/${project.image}`} className="img-fluid portfolio-project-image" alt={project.imageAlt} />
                <div className="portfolio-project-body">
                  <div className="portfolio-project-heading">
                    <span className="portfolio-chip">{project.category}</span>
                    <h2>{project.title}</h2>
                  </div>
                  <p>{project.summary}</p>
                  <p className="portfolio-project-purpose"><strong>Purpose:</strong> {project.purpose}</p>
                  <ul className="portfolio-project-stack" aria-label={`${project.title} technology stack`}>
                    {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <Link
                    className="portfolio-button-secondary portfolio-project-link"
                    href={`/portfolio/${project.slug}`}
                    aria-label={`Read project context for ${project.title}`}
                  >
                    Read the project context
                  </Link>
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
