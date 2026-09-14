import Link from "next/link";

export default function PlaygroundComponentNotFound() {
  return (
    <section className="playground-unavailable section" aria-labelledby="playground-not-found-title">
      <div className="container">
        <span className="portfolio-chip">404 / Playground</span>
        <h1 id="playground-not-found-title">That component is not published</h1>
        <p>The Playground link may be out of date, or the component may have been removed. The collection is still available.</p>
        <Link className="portfolio-button-primary" href="/playground">Return to Playground</Link>
      </div>
    </section>
  );
}
