import type { Metadata } from "next";
import Link from "next/link";
import { publishedComponents } from "@/data/components";

export const metadata: Metadata = {
  title: "Playground | Saham Ali",
  description: "Browse Saham Ali's authored front-end component examples.",
};

export default function PlaygroundPage() {
  return (
    <section className="playground section" aria-labelledby="playground-title">
      <div className="container section-title">
        <p className="portfolio-eyebrow">Playground / collection</p>
        <h1 id="playground-title">Component Playground</h1>
        <p>Browse authored interface references with enough context to understand where each pattern belongs.</p>
        <p className="playground-copy">Each published example includes a constrained, browser-scoped editor, a safe live preview, and the relevant usage context.</p>
      </div>
      <div className="container">
        <div className="playground-grid">
          {publishedComponents.length > 0 ? publishedComponents.map((component) => (
            <article className="playground-card" key={component.slug}>
              <div className="playground-card-body">
                <span className="portfolio-chip">{component.technology}</span>
                <h2>{component.title}</h2>
                <p>{component.purpose}</p>
                <dl className="playground-card-meta">
                  <div>
                    <dt>Use it for</dt>
                    <dd>{component.usageContext}</dd>
                  </div>
                </dl>
                <Link
                  className="portfolio-button-secondary playground-card-link"
                  href={`/playground/${component.slug}`}
                  aria-label={`Open ${component.title} component details`}
                >
                  Open component details
                </Link>
              </div>
            </article>
          )) : (
            <div className="playground-copy" role="status">
              <h2>No components are published yet</h2>
              <p>The collection is being prepared. Visit the portfolio while new examples are added.</p>
              <Link className="portfolio-button-secondary" href="/portfolio">Return to Portfolio</Link>
            </div>
          )}
        </div>
        <div className="playground-return">
          <Link href="/portfolio" className="portfolio-button-secondary">Back to Portfolio</Link>
          <Link href="/about" className="portfolio-button-secondary">About the practice</Link>
        </div>
      </div>
    </section>
  );
}
