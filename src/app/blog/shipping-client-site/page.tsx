import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What I check before shipping a client site | Saham Ali",
  description: "A practical pre-launch checklist for content, forms, responsive behavior, and discoverability.",
};

export default function ShippingClientSitePost() {
  return (
    <article className="section" aria-labelledby="post-title">
      <div className="container section-title">
        <p>Writing / September 9, 2026</p>
        <h1 id="post-title">What I check before shipping a client site</h1>
        <p>A launch review should follow the visitor, not just the developer console.</p>
      </div>
      <div className="container content">
        <p>
          A site can look finished in a desktop browser and still be unready for real visitors. Before launch, I do a
          pass that starts with the content and follows the important journeys through the site. The aim is not to chase
          perfection in every corner. It is to make sure the promises made by the page are supported by working,
          understandable paths.
        </p>
        <h2>Read every page as a visitor</h2>
        <p>
          I check headings, labels, dates, spelling, image descriptions, and calls to action. Unfinished template language is
          especially easy to miss when it came from a starter template. I also check that a visitor can understand what
          the site is about without needing to guess which section to open next. Important information should not live
          only in a hover state or an animation.
        </p>
        <h2>Follow every important link</h2>
        <p>
          Navigation, logo links, social profiles, email links, policy pages, project previews, and form success paths
          all deserve a click. An attractive button that points to an empty anchor is still a broken experience. For
          links that are not ready, I would rather remove the action than send someone to a page that says nothing.
        </p>
        <h2>Exercise the form</h2>
        <p>
          I submit a valid message, try required fields, check the email input, and confirm that the success and error
          states are legible. The form should explain what it needs and what happens after submission. I also verify that
          the receiving address and any third-party form service match the privacy notice shown on the site.
        </p>
        <h2>Resize before release</h2>
        <p>
          Responsive review is more than checking whether the columns stack. I look for clipped text, controls that are
          hard to tap, images that shift the layout, overflowing code or navigation, and fixed widths that force a
          horizontal scroll. I check a narrow phone width, a tablet-sized layout, and a wide desktop view. Keyboard
          focus and visible contrast matter in each one.
        </p>
        <h2>Check the machine-readable layer</h2>
        <p>
          Titles and descriptions should describe the actual page. Canonical and social metadata should use the real
          domain and an asset that exists. I check the sitemap, robots rules, privacy link, and page status codes as well.
          These details do not replace useful content, but they help people and search engines find the content that is
          already there.
        </p>
        <p>
          A final launch pass is a small investment in trust. It catches the quiet failures that a screenshot cannot show
          and gives the new site a better first conversation with its visitors.
        </p>
        <p><Link href="/blog">Back to writing</Link></p>
      </div>
    </article>
  );
}
