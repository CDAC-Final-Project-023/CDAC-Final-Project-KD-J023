import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";
import Navbar from "../components/navbar/BetaNav";
import React from "react";

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <section className="mb-5 text-dark">
          <div className="row g-4">
            {/* Contact Form Section */}
            <div className="col-lg-6 mb-4">
              <h2 className="display-6 fw-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted mb-4">
                Didn't find your answer in the FAQ? Contact our sales team.
              </p>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="col-lg-6">
              <div className="mb-4">
                <p className="fw-bold">
                  What is included in the tour packages?
                </p>
                <p className="text-muted">
                  Our tour packages generally include transportation,
                  accommodation, guided tours, and most meals. The exact
                  inclusions vary depending on the tour you choose.
                </p>
              </div>
              <div className="mb-4">
                <p className="fw-bold">How do I book a tour?</p>
                <p className="text-muted">
                  You can easily book a tour directly through our website by
                  selecting your desired tour and filling in the booking form.
                  Alternatively, you can contact our sales team for assistance.
                </p>
              </div>
              <div className="mb-4">
                <p className="fw-bold">Can I customize my tour package?</p>
                <p className="text-muted">
                  Yes! We offer customized travel packages to meet your specific
                  needs. You can get in touch with us to discuss your
                  preferences, and we'll create a tailored itinerary for you.
                </p>
              </div>
              <div className="mb-4">
                <p className="fw-bold">
                  How can I contact you for more information?
                </p>
                <p className="text-muted">
                  You can contact us through our website's contact page, or you
                  can reach out to our sales team via email or phone for any
                  inquiries or assistance.
                </p>
              </div>
              <div className="mb-4">
                <p className="fw-bold">
                  Are the tours suitable for families and children?
                </p>
                <p className="text-muted">
                  Yes, many of our tours are family-friendly and suitable for
                  travelers of all ages. We can help you find the best tour
                  options for families or children.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
