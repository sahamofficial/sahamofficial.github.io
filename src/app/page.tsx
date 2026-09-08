'use client';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <p className="hero-eyebrow">Full-Stack Web Developer</p>
          <h2>Saham Ali</h2>
          <p className="hero-role">
            I&apos;m a{' '}
            <span
              className="typed"
              data-typed-items="Full-Stack Developer, Laravel & PHP Developer, Front-End Developer, Freelancer"
            >
              Full-Stack Developer
            </span>
            <span className="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
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
                <a href="#portfolio" className="btn-chrome">
                  View Work
                </a>
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
                <a href="#contact" className="btn-ghost">
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
            I&apos;m a skilled web developer with experience in JavaScript, and expertise in frameworks like React,
            Node.js, and Laravel. I&apos;m a quick learner and collaborate closely with clients to create efficient,
            scalable, and user-friendly solutions that solve real-world problems. Let&apos;s work together to bring your
            ideas to life!
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
                      <span>sahamofficial.github.io</span>
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
                I focus on delivering clean, functional, and user-friendly designs that solve real-world problems. I
                enjoy turning complex ideas into elegant, accessible web experiences. Committed to quality, performance,
                and attention to detail in every project I work on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-translate"></i>
                <span data-purecounter-start="0" data-purecounter-end="3" data-purecounter-duration="1" className="purecounter">
                  0
                </span>
                <p>
                  <strong>Languages I Build In</strong>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-stack"></i>
                <span data-purecounter-start="0" data-purecounter-end="4" data-purecounter-duration="1" className="purecounter">
                  0
                </span>
                <p>
                  <strong>Frameworks Used</strong>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-headset"></i>
                <span data-purecounter-start="0" data-purecounter-end="24" data-purecounter-duration="1" className="purecounter">
                  0
                </span>
                <p>
                  <strong>Hrs Response Time</strong>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-cup-hot"></i>
                <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="2" className="purecounter">
                  0
                </span>
                <p>
                  <strong>% Commitment</strong>
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
            I specialize in designing and developing modern, responsive websites using tools like HTML, CSS,
            JavaScript, and frameworks such as React and Tailwind CSS. I&apos;m also experienced in UX/UI design,
            animation, and backend integration.
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
            Explore my professional background, including my education, work experience, and technical expertise. I
            have a solid track record of building responsive, user-focused web applications and interfaces.
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
                    Detail-oriented full-stack web developer focused on building responsive, user-centered web
                    applications — from clean UI and front-end through to scalable back-end logic.
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
                <h4>Diploma / Course Name — PLACEHOLDER (replace with your qualification)</h4>
                <h5>2026 - present</h5>
                <p>
                  <em>Institution name, Puttalam, Sri Lanka</em>
                </p>
                <p>PLACEHOLDER: briefly describe what you studied and the key skills you gained.</p>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="resume-title">Professional Experience</h3>
              <div className="resume-item">
                <h4>Web & Graphic Designer — PLACEHOLDER (confirm your exact title)</h4>
                <h5>2022 - Present</h5>
                <p>
                  <em>Imara Software Solutions, Puttalam, Sri Lanka</em>
                </p>
                <p>
                  Designed and developed modern, responsive websites and engaging graphics for various client projects.
                  Collaborated with developers and marketing teams to create visually appealing user interfaces and
                  maintain brand consistency.
                </p>
                <ul>
                  <li>PLACEHOLDER: quantify impact (e.g., delivered N client sites, cut page load time by Y%).</li>
                  <li>PLACEHOLDER: name a key project and the stack you used (Laravel, React, MySQL…).</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Freelance Web Developer</h4>
                <h5>PLACEHOLDER — year range</h5>
                <p>
                  <em>Self-employed, Remote</em>
                </p>
                <ul>
                  <li>PLACEHOLDER: a freelance project, the client need, and how you solved it.</li>
                </ul>
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
            <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
              <li data-filter="*" className="filter-active">
                All
              </li>
              <li data-filter=".filter-web">Web</li>
              <li data-filter=".filter-fullstack">Full-Stack</li>
              <li data-filter=".filter-uiux">UI/UX</li>
            </ul>

            <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-web">
                <div className="portfolio-content h-100">
                  <img src="assets/img/project-01.png" className="img-fluid" alt="Project One" />
                  <div className="portfolio-info">
                    <p>One line: what you built and the stack you used.</p>
                    <span className="badge rounded-pill">HTML</span>
                    <span className="badge rounded-pill">CSS</span>
                    <a href="assets/img/project-01.png" data-gallery="portfolio-gallery-web" className="glightbox preview-link">
                      <i className="bi bi-zoom-in"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-fullstack">
                <div className="portfolio-content h-100">
                  <img src="assets/img/project-02.png" className="img-fluid" alt="Project Two" />
                  <div className="portfolio-info">
                    <p>One line: what you built and the stack you used.</p>
                    <span className="badge rounded-pill">Laravel</span>
                    <span className="badge rounded-pill">MySQL</span>
                    <a href="assets/img/project-02.png" data-gallery="portfolio-gallery-fullstack" className="glightbox preview-link">
                      <i className="bi bi-zoom-in"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-uiux">
                <div className="portfolio-content h-100">
                  <img src="assets/img/project-03.png" className="img-fluid" alt="Project Three" />
                  <div className="portfolio-info">
                    <p>One line: the design problem and your solution.</p>
                    <span className="badge rounded-pill">Figma</span>
                    <span className="badge rounded-pill">UI/UX</span>
                    <a href="assets/img/project-03.png" data-gallery="portfolio-gallery-uiux" className="glightbox preview-link">
                      <i className="bi bi-zoom-in"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-web">
                <div className="portfolio-content h-100">
                  <img src="assets/img/project-04.png" className="img-fluid" alt="Project Four" />
                  <div className="portfolio-info">
                    <h4>Project Four — replace me</h4>
                    <p>One line: what you built and the stack you used.</p>
                    <span className="badge rounded-pill">JavaScript</span>
                    <span className="badge rounded-pill">React</span>
                    <a href="assets/img/project-04.png" data-gallery="portfolio-gallery-web" className="glightbox preview-link">
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a href="#" title="Live site / GitHub" className="details-link">
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-fullstack">
                <div className="portfolio-content h-100">
                  <img src="assets/img/project-05.png" className="img-fluid" alt="Project Five" />
                  <div className="portfolio-info">
                    <h4>Project Five — replace me</h4>
                    <p>One line: what you built and the stack you used.</p>
                    <span className="badge rounded-pill">PHP</span>
                    <span className="badge rounded-pill">Node.js</span>
                    <a href="assets/img/project-05.png" data-gallery="portfolio-gallery-fullstack" className="glightbox preview-link">
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a href="#" title="Live site / GitHub" className="details-link">
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              </div>
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
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Web Development
                  </a>
                </h4>
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
                <h4 className="title">
                  <a href="" className="stretched-link">
                    UI/UX Design
                  </a>
                </h4>
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
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Graphic Designing
                  </a>
                </h4>
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
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Full Stack Development
                  </a>
                </h4>
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
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Front End Development
                  </a>
                </h4>
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
                <h4 className="title">
                  <a href="" className="stretched-link">
                    Back End Development
                  </a>
                </h4>
                <p className="description">
                  Building robust and scalable server-side applications, APIs, and databases using technologies like
                  Node.js, PHP, and Laravel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>
            Feel free to reach out for collaborations, project inquiries, or just to say hello. I&apos;m here to help
            bring your ideas to life!
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="info-wrap">
                <a href="https://wa.me/0778502300" target="_blank" rel="noopener noreferrer">
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                    <i className="bi bi-telephone flex-shrink-0"></i>
                    <div>
                      <h3>WhatsApp Me</h3>
                      <p>+94 77 850 2300</p>
                    </div>
                  </div>
                </a>
                <a href="mailto:sahamaliofficial@gmail.com?subject=Inquiry&body=Hello%2C%0AI%20am%20interested%20in%20your%20web%20development%20services.">
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                    <i className="bi bi-envelope flex-shrink-0"></i>
                    <div>
                      <h3>Email Me</h3>
                      <p>sahamaliofficial@gmail.com</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-lg-7">
              <form
                className="php-email-form"
                action="https://formsubmit.co/ajax/sahamaliofficial@gmail.com"
                method="POST"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">
                      Your Name
                    </label>
                    <input type="text" name="name" id="name-field" className="form-control" required />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">
                      Your Email
                    </label>
                    <input type="email" className="form-control" name="email" id="email-field" required />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="subject-field" className="pb-2">
                      Subject
                    </label>
                    <input type="text" className="form-control" name="subject" id="subject-field" required />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="message-field" className="pb-2">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      id="message-field"
                      required
                    ></textarea>
                  </div>

                  <input type="hidden" name="_subject" value="New portfolio contact message" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>

                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
