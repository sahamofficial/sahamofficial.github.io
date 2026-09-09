import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Saham Ali",
  description: "Privacy information for sahamofficial.github.io.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section" aria-labelledby="privacy-policy-title">
      <div className="container section-title">
        <h1 id="privacy-policy-title">Privacy Policy</h1>
        <p>Last updated: September 8, 2026</p>
      </div>
      <div className="container content">
        <h2>Information I collect</h2>
        <p>
          This website is a personal portfolio for Saham Ali. If you contact me by email, WhatsApp, or the contact form,
          I receive the information you choose to provide, such as your name, email address, and message.
        </p>
        <h2>Analytics and advertising</h2>
        <p>
          This website may use Google AdSense and Microsoft Clarity. These services may use cookies, web beacons, IP
          addresses, or similar technologies to measure usage, provide reports, and serve or personalize advertising.
          Third-party providers may place and read cookies on your browser as a result of ad serving.
        </p>
        <p>
          You can learn how Google uses data when you use partners&apos; sites at{" "}
          <a href="https://www.google.com/policies/privacy/partners/">Google&apos;s partner privacy page</a>.
        </p>
        <h2>How information is used</h2>
        <p>
          Information sent through contact channels is used only to respond to inquiries and provide requested services.
          I do not sell personal information.
        </p>
        <h2>Your choices</h2>
        <p>
          You can manage or delete cookies through your browser settings. You can also contact me at{" "}
          <a href="mailto:sahamaliofficial@gmail.com">sahamaliofficial@gmail.com</a> with privacy questions.
        </p>
        <h2>Policy changes</h2>
        <p>This policy may be updated when the website, services, or applicable requirements change.</p>
      </div>
    </section>
  );
}
