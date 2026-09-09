import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing | Saham Ali",
  description: "Notes on Laravel APIs, React interfaces, and shipping client websites.",
};

const posts = [
  { href: "/blog/laravel-api-react", title: "Structuring a Laravel API for a React frontend", date: "September 9, 2026", description: "A practical way to keep API boundaries, validation, and frontend state understandable as a project grows." },
  { href: "/blog/tailwind-to-react", title: "Migrating a Tailwind UI to component-based React", date: "September 9, 2026", description: "How to turn repeated markup into useful components without hiding the design decisions that made the interface work." },
  { href: "/blog/shipping-client-site", title: "What I check before shipping a client site", date: "September 9, 2026", description: "A pre-launch pass covering content, responsive behavior, forms, metadata, accessibility, and the paths visitors actually use." },
];

export default function BlogPage() {
  return (
    <section className="section" aria-labelledby="writing-title">
      <div className="container section-title">
        <h1 id="writing-title">Writing</h1>
        <p>Working notes from building and reviewing modern web experiences.</p>
      </div>
      <div className="container">
        <div className="row gy-4">
          {posts.map((post) => (
            <article className="col-lg-4" key={post.href}>
              <div className="content h-100">
                <p>{post.date}</p>
                <h2><Link href={post.href}>{post.title}</Link></h2>
                <p>{post.description}</p>
                <Link href={post.href}>Read the post</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
