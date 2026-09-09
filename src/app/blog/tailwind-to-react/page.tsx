import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Migrating a Tailwind UI to component-based React | Saham Ali",
  description: "A practical note on moving repeated Tailwind markup into maintainable React components.",
};

export default function TailwindToReactPost() {
  return (
    <article className="section" aria-labelledby="post-title">
      <div className="container section-title">
        <p>Writing / September 9, 2026</p>
        <h1 id="post-title">Migrating a Tailwind UI to component-based React</h1>
        <p>Componentization works best when it follows meaning, not just repeated class strings.</p>
      </div>
      <div className="container content">
        <p>
          A Tailwind interface can begin as a fast collection of page sections and still become difficult to evolve. The
          warning sign is not a large number of utility classes by itself. It is the moment a visual change requires
          finding the same markup in several places, with small differences that are hard to notice. That is where
          component-based React can make the design easier to work with.
        </p>
        <h2>Inventory the patterns first</h2>
        <p>
          I start by looking for repeated user-facing ideas: a navigation item, a form field, a project tile, a status
          message, or a content section with the same heading treatment. I do not extract every wrapper. A component is
          useful when it gives a meaningful name to a pattern or owns a behavior that should stay together.
        </p>
        <h2>Keep the first API small</h2>
        <p>
          The first version of a component should accept only the information that genuinely varies. A project card may
          need a title, image, description, and link. It probably does not need a prop for every spacing choice. Keeping
          the API small prevents a component from becoming a second configuration language for the page.
        </p>
        <h2>Preserve the design decisions</h2>
        <p>
          Moving markup is not a reason to flatten the visual hierarchy. I keep the original spacing, typography, focus
          states, and responsive breakpoints visible in the component. Tailwind classes are most helpful when they still
          communicate the design at a glance. When a class list becomes noisy, a semantic variant or a small local
          style can be clearer than adding more conditional strings.
        </p>
        <h2>Separate content from layout</h2>
        <p>
          Repeated content belongs in data when that improves consistency. Mapping a list of projects or navigation
          items makes it harder for one copy to drift from the others. The component should still describe the layout;
          the data should describe the item. That separation also makes it easier to add a new item without duplicating
          a block of JSX.
        </p>
        <h2>Test the uncomfortable states</h2>
        <p>
          A component is not finished when the ideal title fits. I check long labels, missing optional content, keyboard
          focus, narrow screens, and the empty or error state. Those cases reveal whether the abstraction represents a
          real interface pattern or only the first screenshot that motivated it.
        </p>
        <p>
          The goal is not to create the largest component library. It is to make the next design change understandable,
          local, and less likely to break another page.
        </p>
        <p><Link href="/blog">Back to writing</Link></p>
      </div>
    </article>
  );
}
