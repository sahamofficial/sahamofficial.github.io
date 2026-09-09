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
        <h1 id="about-title">About Me</h1>
        <p>I build practical web experiences across the interface, API, and data layers.</p>
      </div>
      <div className="container content">
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
        <h2>How I work</h2>
        <p>
          I start by understanding the user journey and the content the site needs to communicate. From there I shape
          the interface, connect the necessary data and services, and test the important paths before delivery. Clear
          communication and a focused scope help keep the work useful for both the visitor and the person maintaining it.
        </p>
        <p><Link href="/contact">Discuss a project</Link> or browse the <Link href="/portfolio">portfolio</Link>.</p>
      </div>
    </section>
  );
}
