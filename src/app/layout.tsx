import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saham Ali | Full-Stack Developer",
  description:
    "I'm Saham Ali, a full-stack web developer specializing in Laravel, PHP, JavaScript, and Python. Check out my portfolio and projects!",
  keywords:
    "Full Stack Developer, Web Developer, Laravel Developer, PHP Developer, JavaScript, Python, Portfolio, SQL, SQLyog, Photographer",
  authors: [{ name: "Saham Ali" }],
  openGraph: {
    title: "Saham Ali | Full-Stack Web Developer",
    description:
      "Check out my latest web development projects built with Laravel, JavaScript, and Python.",
    url: "https://sahamofficial.github.io",
    type: "website",
    images: [{ url: "https://sahamofficial.github.io/your-profile-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saham Ali | Full-Stack Developer",
    description: "Experienced full-stack web developer. See my projects!",
    images: "https://yourwebsite.com/your-profile-image.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="neo" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=Unbounded:wght@400;500;600;700;800;900&family=Spline+Sans+Mono:wght@400;500;600;700&family=Josefin+Sans:wght@400;500;600;700&family=Nunito+Sans:wght@400;600;700;800&family=Playfair+Display:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Vendor CSS Files */}
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

        {/* Main CSS Files */}
        <link href="/assets/css/main.css" rel="stylesheet" />
        <link href="/assets/css/soft-light.css" rel="stylesheet" />
        <link href="/assets/css/theme-terminal.css" rel="stylesheet" />
        <link href="/assets/css/theme-bento.css" rel="stylesheet" />
        <link href="/assets/css/theme-glass.css" rel="stylesheet" />
        <link href="/assets/css/theme-aurum.css" rel="stylesheet" />
        <link href="/assets/css/theme-neo.css" rel="stylesheet" />
        <link href="/assets/css/theme-clay.css" rel="stylesheet" />
        <link href="/assets/css/theme-maximal.css" rel="stylesheet" />
        <link href="/assets/css/theme-win11.css" rel="stylesheet" />
        <link href="/assets/css/chat-widget.css" rel="stylesheet" />

        {/* Favicon */}
        <link href="/favicon.png" rel="icon" type="image/x-icon" />

        {/* Three.js Import Map */}
        <script
          dangerouslySetInnerHTML={{
            __html: `{"imports": {"three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}`,
          }}
          type="importmap"
        />

        {/* Theme Persistence Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t||'neo');}catch(e){document.documentElement.setAttribute('data-theme','neo');}})();`,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "qbnxz702a2");`,
          }}
        />

      </head>
      <body className="index-page" data-page="home" suppressHydrationWarning>
        {/* Preloader */}
        <div id="preloader"></div>

        {/* Scroll Top Button */}
        <a href="#" className="scroll-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short"></i>
        </a>

        {/* Header Placeholder */}
        <div id="site-header"></div>

        <main className="main">{children}</main>

        {/* Vendor JS Files - Load after React hydration */}
        <Script
          src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/aos/aos.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/glightbox/js/glightbox.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/swiper/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/purecounter/purecounter_vanilla.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/typed.js/typed.umd.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/waypoints/noframework.waypoints.js"
          strategy="afterInteractive"
        />

        {/* Main JS Files */}
        <Script
          src="/assets/js/main.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/hero-3d.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/bento-tilt.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/theme-toggle.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/contact-form.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/chat-widget.js"
          strategy="afterInteractive"
        />
        <script src="/assets/js/click-sound.js"></script>
      </body>
    </html>
  );
}
