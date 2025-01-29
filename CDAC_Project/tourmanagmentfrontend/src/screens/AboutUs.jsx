import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./AboutUs.css";
import aboutus1 from "../images/aboutus1.jpg";
import aboutus2 from "../images/aboutus2.jpg";
import { Container, Row, Col, Button } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container className="my-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">About Us</h1>
        <p className="text-muted">Your trusted travel partner for unforgettable adventures.</p>
      </div>

      {/* Company Overview */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h2 className="fw-bold">Who We Are</h2>
          <p className="text-muted">
            At ExploreTours, we specialize in crafting unique and exciting travel experiences for adventure seekers, families, and solo travelers. 
            With years of expertise, we offer hassle-free tours to the world's most breathtaking destinations.
          </p>
          <p className="text-muted">
            Our mission is to provide safe, fun, and enriching journeys that create lasting memories.
          </p>
        </Col>
        <Col md={6}>
          <img
            src={aboutus1}
            alt="About ExploreTours"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Our Mission */}
      <Row className="align-items-center mb-5 flex-md-row-reverse">
        <Col md={6}>
          <h2 className="fw-bold">Our Mission</h2>
          <p className="text-muted">
            We believe in making travel accessible, sustainable, and filled with meaningful experiences.
          </p>
          <ul className="list-unstyled">
            <li>✔ Customized travel packages</li>
            <li>✔ Experienced guides & 24/7 support</li>
            <li>✔ Eco-friendly & responsible tourism</li>
          </ul>
        </Col>
        <Col md={6}>
          <img
            src={aboutus2}
            alt="Our Mission"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Why Choose Us */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Why Choose Us?</h2>
        <p className="text-muted">Experience the best with ExploreTours</p>
      </div>
      <Row>
        <Col md={4} className="mb-3">
          <h5 className="fw-bold">🏆 Award-Winning Service</h5>
          <p className="text-muted">
            Recognized as a top travel company with years of excellent service.
          </p>
        </Col>
        <Col md={4} className="mb-3">
          <h5 className="fw-bold">🌎 Global Destinations</h5>
          <p className="text-muted">
            Explore over 50+ destinations worldwide with our expert guides.
          </p>
        </Col>
        <Col md={4} className="mb-3">
          <h5 className="fw-bold">💰 Best Price Guarantee</h5>
          <p className="text-muted">
            Get the best deals on tours with transparent pricing.
          </p>
        </Col>
      </Row>

      {/* Meet Our Team */}
      <div className="text-center my-5">
        <h2 className="fw-bold">Meet Our Team</h2>
        <p className="text-muted">Passionate travel experts guiding your journeys</p>
      </div>
      <Row className="text-center g-4"> {/* g-4 reduces space between columns */}
        <Col md={6}>
          <img
            src="https://source.unsplash.com/200x200/?person,man"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5 className="fw-bold">Anay Kale</h5>
        </Col>
        <Col md={6}>
          <img
            src="https://source.unsplash.com/200x200/?person,woman"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5 className="fw-bold">Tejas Junghare</h5>
        </Col>
      </Row>
      <Row className="text-center g-4"> {/* g-4 reduces space between columns */}
        <Col md={6}>
          <img
            src="https://source.unsplash.com/200x200/?person,traveler"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5 className="fw-bold">Srushti Jagtap</h5>
        </Col>
        <Col md={6}>
          <img
            src="https://source.unsplash.com/200x200/?person,traveler"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5 className="fw-bold">Sanket Pande</h5>
        </Col>
      </Row>

      {/* Call to Action */}
      <div className="text-center mt-5">
        <h2 className="fw-bold">Ready to Explore?</h2>
        <p className="text-muted">Join us for an unforgettable travel experience.</p>
        <Button variant="primary" size="lg" href="/contactus">Contact Us</Button>
      </div>
    </Container>
  );
};

export default AboutUs;
