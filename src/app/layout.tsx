import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
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
    images: [{ url: "https://sahamofficial.github.io/assets/img/IMG-ME.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saham Ali | Full-Stack Developer",
    description: "Experienced full-stack web developer. See my projects!",
    images: "https://sahamofficial.github.io/assets/img/IMG-ME.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="neo" data-scroll-behavior="smooth" suppressHydrationWarning>
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

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8342538101846472"
          crossOrigin="anonymous"
        />

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

        <header id="header" className="header dark-background d-flex flex-column">
          <i className="header-toggle d-xl-none bi bi-list" aria-label="Toggle navigation"></i>

          <div className="profile-img">
            <img src="/assets/img/IMG-ME.jpg" alt="Saham Ali" className="img-fluid rounded-circle" />
          </div>

          <a href="/" className="logo d-flex align-items-center justify-content-center">
            <h1 className="sitename">Saham Ali</h1>
          </a>

          <div className="social-links text-center">
            <a href="https://x.com/_saham__" className="twitter" aria-label="X profile"><i className="bi bi-twitter-x"></i></a>
            <a href="https://www.facebook.com/share/14xxnybjPg/" className="facebook" aria-label="Facebook profile"><i className="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/saham__official_?igsh=dmJsaDNjODJqYmR4" className="instagram" aria-label="Instagram profile"><i className="bi bi-instagram"></i></a>
            <a href="https://join.skype.com/invite/xVkN9duK6J1E" className="google-plus" aria-label="Skype profile"><i className="bi bi-skype"></i></a>
          </div>

          <nav id="navmenu" className="navmenu" aria-label="Main navigation">
            <ul>
              <li><Link href="/#hero"><i className="bi bi-house navicon"></i>Home</Link></li>
              <li><Link href="/#about"><i className="bi bi-person navicon"></i> About</Link></li>
              <li><Link href="/#resume"><i className="bi bi-file-earmark-text navicon"></i> Resume</Link></li>
              <li><Link href="/#portfolio"><i className="bi bi-images navicon"></i> Portfolio</Link></li>
              <li><Link href="/#services"><i className="bi bi-hdd-stack navicon"></i> Services</Link></li>
              <li><Link href="/#contact"><i className="bi bi-envelope navicon"></i> Contact</Link></li>
              <li><a href="/privacy-policy/"><i className="bi bi-shield-check navicon"></i> Privacy</a></li>
            </ul>
          </nav>
        </header>

        <main className="main">{children}</main>

        <footer id="footer" className="footer position-relative light-background">
          <div className="container text-center">
            <p>© {new Date().getFullYear()} Saham Ali. All rights reserved.</p>
            <p>
              <a href="/privacy-policy/">Privacy Policy</a>{' '}
              <span aria-hidden="true">|</span>{' '}
              <Link href="/terms">Terms of Service</Link>{' '}
              <span aria-hidden="true">|</span>{' '}
              <Link href="/#contact">Contact</Link>
            </p>
          </div>
        </footer>

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
          type="module"
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
        <Script
          src="/assets/js/click-sound.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
