import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

export const dynamic = "force-static";
export const dynamicParams = false;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Saham Ali",
      description: "The requested portfolio project is not published.",
    };
  }

  return {
    title: `${project.title} | Saham Ali`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = project.relatedSlugs
    .map((relatedSlug) => getProjectBySlug(relatedSlug))
    .filter((relatedProject): relatedProject is NonNullable<typeof relatedProject> => Boolean(relatedProject));

  return (
    <article className="portfolio-detail section" aria-labelledby="project-title">
      <div className="container">
        <nav className="portfolio-detail-breadcrumbs" aria-label="Project navigation">
          <Link href="/portfolio">Portfolio</Link>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>

        <div className="portfolio-detail-header">
          <div>
            <span className="portfolio-chip">{project.category}</span>
            <h1 id="project-title">{project.title}</h1>
            <p className="portfolio-detail-summary">{project.summary}</p>
          </div>
          <img src={`/assets/img/${project.image}`} className="portfolio-detail-image" alt={project.imageAlt} />
        </div>

        <div className="portfolio-detail-grid">
          <div className="portfolio-detail-main">
            <section aria-labelledby="project-purpose">
              <h2 id="project-purpose">Purpose and outcome</h2>
              <p>{project.purpose}</p>
              <p>{project.outcome}</p>
            </section>

            {project.sections.map((section) => (
              <section key={section.heading} aria-labelledby={`${project.slug}-${section.heading.toLowerCase().replaceAll(" ", "-")}`}>
                <h2 id={`${project.slug}-${section.heading.toLowerCase().replaceAll(" ", "-")}`}>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <section aria-labelledby="project-limitations">
              <h2 id="project-limitations">Limitations</h2>
              <ul>
                {project.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
              </ul>
            </section>
          </div>

          <aside className="portfolio-detail-aside" aria-label="Project metadata">
            <section>
              <h2>Technology</h2>
              <ul className="portfolio-project-stack">
                {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </section>
            <section>
              <h2>Next steps</h2>
              <p>Want to discuss a similar interface or application?</p>
              <div className="portfolio-detail-actions">
                <Link className="portfolio-button-primary" href="/contact">Contact Saham</Link>
                <Link className="portfolio-button-secondary" href="/portfolio">Back to Portfolio</Link>
              </div>
            </section>
          </aside>
        </div>

        <section className="portfolio-related" aria-labelledby="related-projects">
          <h2 id="related-projects">Related work</h2>
          <div className="portfolio-related-grid">
            {relatedProjects.map((relatedProject) => (
              <Link className="portfolio-related-link" key={relatedProject.slug} href={`/portfolio/${relatedProject.slug}`}>
                <span>{relatedProject.category}</span>
                <strong>{relatedProject.title}</strong>
                <small>{relatedProject.summary}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
