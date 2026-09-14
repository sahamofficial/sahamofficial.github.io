'use client';

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("*");
  const filters = [
    { label: "All", filter: "*" },
    { label: "Web", filter: ".filter-web" },
    { label: "Full-Stack", filter: ".filter-fullstack" },
    { label: "UI/UX", filter: ".filter-uiux" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero section dark-background" aria-labelledby="hero-title">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <p className="hero-eyebrow">Web products, from interface to data layer</p>
          <span className="portfolio-chip hero-role-chip">JavaScript / Laravel / Python</span>
          <h1 id="hero-title">Saham Ali</h1>
          <p className="hero-role">
            I&apos;m a{' '}
            <span
              className="typed"
              data-typed-items="Full-Stack Developer, Laravel & PHP Developer, Front-End Developer"
            >
              Full-Stack Developer
            </span>
            <span className="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
          </p>
          <p className="hero-value">
            I build responsive web products across the front end and back end, with clear UX and maintainable code.
          </p>
          <div className="hero-actions">
            <span className="hang">
              <span className="hang__shadow" aria-hidden="true"></span>
              <span className="hang__pivot" aria-hidden="true"></span>
              <span className="pendulum">
                <span className="pendulum__chain" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                <Link href="/portfolio" className="btn-chrome" aria-label="View Saham Ali&apos;s portfolio work">
                  View Work
                </Link>
              </span>
            </span>
            <span className="hang">
              <span className="hang__shadow" aria-hidden="true"></span>
              <span className="hang__pivot" aria-hidden="true"></span>
              <span className="pendulum">
                <span className="pendulum__chain" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                <a href="/contact" className="btn-ghost" aria-label="Contact Saham Ali about a project">
                  Get in Touch
                </a>
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>About Me</h2>
          <p>
            I build practical web experiences with JavaScript, React, Laravel, PHP, Python, and Node.js. My focus is
            clear structure, responsive behavior, and dependable paths from an idea to a useful product.
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-8 content">
              <h2>Full-Stack Web Developer</h2>
              <p className="fst-italic py-3">
                I build responsive, modern web applications end to end — from clean front-ends in JavaScript and React
                to robust back-ends in Laravel, PHP, and Python. I work closely with clients to ship scalable,
                user-friendly solutions that solve real-world problems.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Website:</strong>
                      <span>sahamali.dev</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+94 77 850 2300</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Puttalam, Sri Lanka</span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>20</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Email:</strong>
                      <span>sahamaliofficial@gmail.com</span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="py-3">
                I enjoy turning complex ideas into accessible web experiences and keeping the implementation useful after
                launch. Quality, performance, and attention to detail guide the work from the first interface through
                the supporting systems.
              </p>
              <div className="about-actions">
                <a href="/about" className="portfolio-button-secondary">Read the full profile</a>
                <a href="/contact" className="portfolio-button-primary">Start a conversation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats section" aria-labelledby="proof-points-title">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h2 id="proof-points-title" className="portfolio-visually-hidden">Proof points</h2>
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-translate" aria-hidden="true"></i>
                <span className="proof-label">Interface</span>
                <p>
                  <strong>Responsive front ends</strong>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-stack" aria-hidden="true"></i>
                <span className="proof-label">Systems</span>
                <p>
                  <strong>APIs and data layers</strong>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-headset" aria-hidden="true"></i>
                <span className="proof-label">Quality</span>
                <p>
                  <strong>Readable, tested paths</strong>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-cup-hot" aria-hidden="true"></i>
                <span className="proof-label">Delivery</span>
                <p>
                  <strong>Focused collaboration</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Skills</h2>
          <p>
            My toolkit covers responsive interface work, backend integration, and the practical details that help a
            site remain understandable and maintainable after launch.
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 skills-tags">
            <div className="col-lg-4 col-md-6">
              <h4 className="resume-title">Backend</h4>
              <span className="badge rounded-pill">PHP</span>
              <span className="badge rounded-pill">Laravel</span>
              <span className="badge rounded-pill">Node.js</span>
              <span className="badge rounded-pill">MySQL</span>
              <span className="badge rounded-pill">Python</span>
            </div>

            <div className="col-lg-4 col-md-6">
              <h4 className="resume-title">Frontend</h4>
              <span className="badge rounded-pill">HTML</span>
              <span className="badge rounded-pill">CSS</span>
              <span className="badge rounded-pill">JavaScript</span>
              <span className="badge rounded-pill">React</span>
              <span className="badge rounded-pill">Tailwind CSS</span>
            </div>

            <div className="col-lg-4 col-md-6">
              <h4 className="resume-title">Tools & Design</h4>
              <span className="badge rounded-pill">Git</span>
              <span className="badge rounded-pill">WordPress</span>
              <span className="badge rounded-pill">Figma</span>
              <span className="badge rounded-pill">Photoshop</span>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
          <p>
            A concise view of my professional focus, current engineering work, and the skills I use to build responsive,
            user-focused web applications.
          </p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3 className="resume-title">Summary</h3>

              <div className="resume-item pb-0">
                <h4>Saham Ali</h4>
                <p>
                  <em>
                    Full-stack web developer focused on responsive interfaces, clear backend logic, and practical
                    product delivery.
                  </em>
                </p>
                <ul>
                  <li>Puttalam, Sri Lanka</li>
                  <li>(94) 77-850-2300</li>
                  <li>sahamaliofficial@gmail.com</li>
                </ul>
              </div>

              <h3 className="resume-title">Education</h3>
              <div className="resume-item">
                <p>
                  My professional development is built through practical software engineering work, independent study,
                  and hands-on project experience. I continue to deepen the tools that help me ship reliable web
                  experiences.
                </p>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="resume-title">Professional Experience</h3>
              <div className="resume-item">
                <h4>Associate Software Engineer</h4>
                <h5>Current role</h5>
                <p>
                  <em>Finovation Tech</em>
                </p>
                <p>
                  I contribute to software development work across frontend interfaces, backend services, and practical
                  problem solving as part of a professional engineering team. The role keeps my work grounded in
                  collaboration, maintenance, and delivery.
                </p>
              </div>
              <div className="about-actions">
                <Link href="/portfolio" className="portfolio-button-secondary">View selected work</Link>
                <a href="/contact" className="portfolio-button-primary">Contact me</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>
            Explore a curated selection of my recent projects, showcasing skills in web design, frontend development,
            and user experience. Each project reflects my focus on clean design, responsiveness, and functional user
            interfaces tailored to real-world needs.
          </p>
        </div>

        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100" aria-label="Filter portfolio projects">
              {filters.map((filter) => (
                <li
                  key={filter.filter}
                  data-filter={filter.filter}
                  className={filter.filter === activeFilter ? "filter-active" : undefined}
                  role="button"
                  tabIndex={0}
                  aria-pressed={filter.filter === activeFilter}
                  onClick={() => setActiveFilter(filter.filter)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.currentTarget.click();
                    }
                  }}
                >
                  {filter.label}
                </li>
              ))}
            </ul>

            <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
              {projects.map((project) => (
                <div
                  className={`col-lg-4 col-md-6 portfolio-item isotope-item ${project.filterClass}`}
                  key={project.slug}
                  hidden={activeFilter !== "*" && project.filterClass !== activeFilter.slice(1)}
                >
                  <div className="portfolio-content home-portfolio-content h-100">
                    <img src={`/assets/img/${project.image}`} className="img-fluid" alt={project.imageAlt} />
                    <div className="portfolio-info" aria-label={`${project.title} image preview`}>
                      <a
                        href={`/assets/img/${project.image}`}
                        data-gallery={project.gallery}
                        className="glightbox preview-link"
                        aria-label={`Preview image for ${project.title}`}
                      >
                        <i className="bi bi-zoom-in" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div className="home-portfolio-copy">
                      <span className="portfolio-chip">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <p className="portfolio-project-purpose"><strong>Purpose:</strong> {project.purpose}</p>
                      <p className="portfolio-project-purpose"><strong>Outcome:</strong> {project.outcome}</p>
                      <ul className="portfolio-project-stack" aria-label={`${project.title} technology stack`}>
                        {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                      </ul>
                      <Link
                        className="portfolio-button-secondary"
                        href={`/portfolio/${project.slug}`}
                        aria-label={`Read project context for ${project.title}`}
                      >
                        Read project context
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>
            I offer a range of creative and development services including UI/UX design, responsive web development,
            branding, and performance optimization. Whether you&apos;re launching a new product or improving an
            existing one, I help turn ideas into engaging digital experiences.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div className="col-12 service-item d-flex" data-aos="fade-up" data-aos-delay="100">
              <div className="icon flex-shrink-0">
                <i className="bi bi-briefcase"></i>
              </div>
              <div>
                <h4 className="title">Web Development</h4>
                <p className="description">
                  I build responsive, high-performance websites using modern tools and frameworks. My focus is on
                  delivering clean code, optimized UX, and scalable solutions tailored to your project goals.
                </p>
              </div>
            </div>

            <div className="col-12 service-item d-flex" data-aos="fade-up" data-aos-delay="200">
              <div className="icon flex-shrink-0">
                <i className="bi bi-card-checklist"></i>
              </div>
              <div>
                <h4 className="title">UI/UX Design</h4>
                <p className="description">
                  I design user-friendly interfaces that focus on intuitive navigation, visual consistency, and
                  optimal usability across devices to enhance user experience and engagement.
                </p>
              </div>
            </div>

            <div className="col-12 service-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <div className="icon flex-shrink-0">
                <i className="bi bi-bar-chart"></i>
              </div>
              <div>
                <h4 className="title">Graphic Designing</h4>
                <p className="description">
                  I create visually appealing designs for logos, social media, branding, and marketing materials using
                  tools like Adobe Illustrator, Photoshop, and Figma.
                </p>
              </div>
            </div>

            <div className="col-12 service-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <div className="icon flex-shrink-0">
                <i className="bi bi-binoculars"></i>
              </div>
              <div>
                <h4 className="title">Full Stack Development</h4>
                <p className="description">
                  Building robust and scalable web applications using technologies like React, Node.js, Express, and
                  databases such as MongoDB and MySQL.
                </p>
              </div>
            </div>

            <div className="col-12 service-item d-flex" data-aos="fade-up" data-aos-delay="500">
              <div className="icon flex-shrink-0">
                <i className="bi bi-brightness-high"></i>
              </div>
              <div>
                <h4 className="title">Front End Development</h4>
                <p className="description">
                  Crafting engaging and responsive user interfaces using HTML, CSS, JavaScript, and modern frameworks
                  like React and Vue.js.
                </p>
              </div>
            </div>

            <div className="col-12 service-item d-flex" data-aos="fade-up" data-aos-delay="600">
              <div className="icon flex-shrink-0">
                <i className="bi bi-calendar4-week"></i>
              </div>
              <div>
                <h4 className="title">Back End Development</h4>
                <p className="description">
                  Building robust and scalable server-side applications, APIs, and databases using technologies like
                  Node.js, PHP, and Laravel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
