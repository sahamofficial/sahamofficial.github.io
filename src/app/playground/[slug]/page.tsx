import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComponentBySlug, isComponentComplete, publishedComponents } from "@/data/components";
import PlaygroundEditor from "./playground-editor";

export const dynamic = "force-static";
export const dynamicParams = false;

type ComponentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedComponents.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentBySlug(slug);

  return component
    ? { title: `${component.title} | Playground | Saham Ali`, description: component.purpose }
    : { title: "Component unavailable | Playground | Saham Ali", description: "The requested Playground component is not published." };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentBySlug(slug);

  if (!component) {
    notFound();
  }

  if (!isComponentComplete(component)) {
    return <UnavailableComponentState title={component.title} />;
  }

  return (
    <article className="playground-detail section" aria-labelledby="component-title">
      <div className="container">
        <nav className="portfolio-detail-breadcrumbs" aria-label="Playground navigation">
          <Link href="/playground">Playground</Link>
          <span aria-hidden="true">/</span>
          <span>{component.title}</span>
        </nav>

        <header className="playground-detail-header">
          <span className="portfolio-chip">{component.technology}</span>
          <h1 id="component-title">{component.title}</h1>
          <p>{component.purpose}</p>
        </header>

        <div className="playground-detail-grid">
          <div className="playground-detail-main">
            <PlaygroundEditor key={component.slug} component={component} />

            <section className="playground-copy" aria-labelledby="component-context">
              <h2 id="component-context">Purpose and context</h2>
              <p>{component.authoredContext}</p>
              <h3>Implementation notes</h3>
              <p>{component.implementationNotes}</p>
              <h3>Intended use</h3>
              <p>{component.usageContext}</p>
            </section>
          </div>

          <aside className="portfolio-detail-aside" aria-label="Component information">
            <section>
              <h2>Technology</h2>
              <p>{component.technology}</p>
            </section>
            <section>
              <h2>Limitations</h2>
              <ul>
                {component.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
              </ul>
            </section>
            <section>
              <h2>Dependencies</h2>
              <p>{component.dependencies}</p>
            </section>
            <section>
              <h2>Continue browsing</h2>
              <div className="portfolio-detail-actions">
                <Link className="portfolio-button-primary" href="/playground">Back to Playground</Link>
                <Link className="portfolio-button-secondary" href="/portfolio">Portfolio</Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}

function UnavailableComponentState({ title }: { title: string }) {
  return (
    <section className="playground-unavailable section" aria-labelledby="component-unavailable-title">
      <div className="container">
        <span className="portfolio-chip">Component unavailable</span>
        <h1 id="component-unavailable-title">{title} is not ready to view</h1>
        <p>This component record is incomplete, so no empty or misleading source or preview is shown.</p>
        <Link className="portfolio-button-primary" href="/playground">Return to Playground</Link>
      </div>
    </section>
  );
}
