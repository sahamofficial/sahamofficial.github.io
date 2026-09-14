import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Saham Ali",
  description: "Learn about Saham Ali's web development practice and technical focus.",
};

export default function AboutPage() {
  return (
    <section className="about section" aria-labelledby="about-title">
      <div className="container section-title">
        <p className="portfolio-eyebrow">Profile / practice</p>
        <h1 id="about-title">About Me</h1>
        <p>I build practical web experiences across the interface, API, and data layers.</p>
      </div>
      <div className="container">
        <div className="content about-content">
          <h2>A full-stack practice</h2>
          <p>
            My work combines responsive front-end development with backend systems that are clear to maintain. I use
            JavaScript, React, Laravel, PHP, Python, and Node.js to turn a product idea into an accessible, working web
            experience.
          </p>
          <p>
            I care about the details that make a site useful after launch: readable structure, predictable interactions,
            sensible validation, fast pages, and layouts that remain comfortable on smaller screens.
          </p>
        </div>
        <div className="about-proof-grid" role="region" aria-label="Professional focus areas">
          <article className="portfolio-card about-proof-card">
            <span className="portfolio-chip">01 / interface</span>
            <h2>Clear front ends</h2>
            <p>Responsive interfaces with semantic structure, readable content, and interaction states that make sense.</p>
          </article>
          <article className="portfolio-card about-proof-card">
            <span className="portfolio-chip">02 / systems</span>
            <h2>Useful back ends</h2>
            <p>Practical API and data work using Laravel, PHP, Node.js, Python, and MySQL where they fit the problem.</p>
          </article>
          <article className="portfolio-card about-proof-card">
            <span className="portfolio-chip">03 / delivery</span>
            <h2>Thoughtful delivery</h2>
            <p>I keep scope focused, communicate clearly, and test important paths before handing work over.</p>
          </article>
        </div>
        <div className="content about-content">
          <h2>How I work</h2>
          <p>
            I start by understanding the user journey and the content the site needs to communicate. From there I shape
            the interface, connect the necessary data and services, and test the important paths before delivery.
            Clear communication and a focused scope help keep the work useful for both the visitor and the person
            maintaining it.
          </p>
          <p className="about-actions">
            <Link href="/portfolio" className="portfolio-button-secondary">Browse the portfolio</Link>
            <Link href="/contact" className="portfolio-button-primary">Discuss a project</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
