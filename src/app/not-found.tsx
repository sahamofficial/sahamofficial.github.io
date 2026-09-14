import Link from "next/link";

export default function NotFound() {
  return (
    <section className="playground-unavailable section" aria-labelledby="not-found-title">
      <div className="container">
        <span className="portfolio-chip">404 / Route unavailable</span>
        <h1 id="not-found-title">That page is not available</h1>
        <p>The link may be out of date. Continue through the site from one of these starting points.</p>
        <div className="playground-return">
          <Link className="portfolio-button-primary" href="/">Return Home</Link>
          <Link className="portfolio-button-secondary" href="/portfolio">Return to Portfolio</Link>
        </div>
      </div>
    </section>
  );
}
