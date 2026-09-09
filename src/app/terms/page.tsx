import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Saham Ali",
  description: "Terms of service for sahamali.dev.",
};

export default function TermsPage() {
  return (
    <main className="section">
      <div className="container section-title">
        <h1>Terms of Service</h1>
        <p>Last updated: September 8, 2026</p>
      </div>
      <div className="container content">
        <h2>Website use</h2>
        <p>
          This website presents information about Saham Ali&apos;s software development work, services, and selected work
          samples. You may browse and use the site for lawful personal or business purposes.
        </p>
        <h2>Content and ownership</h2>
        <p>
          Text, images, branding, and original work samples on this website belong to Saham Ali or their respective
          owners. Do not copy, republish, or present them as your own without permission.
        </p>
        <h2>Services and external links</h2>
        <p>
          Information on this site is general and does not create a contract for services. Any engagement will be agreed
          separately. External links are provided for convenience, and their content is governed by the linked site&apos;s
          own terms.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href="mailto:sahamaliofficial@gmail.com">sahamaliofficial@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
