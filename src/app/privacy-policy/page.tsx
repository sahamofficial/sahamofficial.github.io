import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Saham Ali",
  description: "Privacy information for sahamali.dev.",
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
        <h2>Cookies, analytics, and advertising</h2>
        <p>
          sahamali.dev may use cookies for ad personalization through Google AdSense and may use Microsoft Clarity to
          understand how the site is used. Google and its advertising partners use cookies to serve ads based on your
          prior visits to this site or other sites. Third-party providers may place and read cookies in your browser as
          a result of ad serving.
        </p>
        <p>
          You can learn how Google uses data on partner sites at{" "}
          <a href="https://policies.google.com/technologies/partner-sites">Google&apos;s partner privacy page</a> and
          opt out of personalized advertising through{" "}
          <a href="https://adssettings.google.com/">Google&apos;s Ads Settings</a>.
        </p>
        <h2>Contact form data</h2>
        <p>
          When you submit the contact form, your name, email address, subject, and message are sent through FormSubmit
          to sahamaliofficial@gmail.com. I use that information to respond to your inquiry and discuss requested
          services. I do not sell personal information. FormSubmit may process the submission as described in its own
          privacy policy.
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
