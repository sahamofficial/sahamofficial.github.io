import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact | Saham Ali",
  description: "Contact Saham Ali about web development, frontend, and full-stack projects.",
};

export default function ContactPage() {
  return (
    <section className="contact section" aria-labelledby="contact-title">
      <div className="container section-title" data-aos="fade-up">
        <h1 id="contact-title">Contact</h1>
        <p>Share what you are building, what is not working, and what a useful next step looks like.</p>
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
                  <textarea className="form-control" name="message" rows={6} id="message-field" required></textarea>
                </div>

                <input type="hidden" name="_subject" value="New portfolio contact message" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

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
  );
}
