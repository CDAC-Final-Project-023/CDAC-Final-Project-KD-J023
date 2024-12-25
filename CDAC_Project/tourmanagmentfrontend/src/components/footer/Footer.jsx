import React from "react";
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light py-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 mb-4">
          <h3 className="text-primary">Travely</h3>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio non
            nemo veniam, natus accusantium. Praesentium, doloribus mollitia
            dignissimos similique optio
          </p>
          <div className="d-flex gap-4 mt-4">
            <FaWhatsappSquare size={30} />
            <FaFacebookSquare size={30} />
            <FaInstagramSquare size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <div className="row">
            {/* Reservations Column */}
            <div className="col-6">
              <h6 className="text-primary">Reservations</h6>
              <ul className="list-unstyled mt-3">
                <li className="mb-2">Hotels</li>
                <li className="mb-2">Tour Packages</li>
                <li className="mb-2">Vehicles</li>
                <li className="mb-2">Restaurants</li>
                <li className="mb-2">Events</li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="col-6">
              <h6 className="text-primary">Support</h6>
              <ul className="list-unstyled mt-3">
                <li className="mb-2">Contact us</li>
                <li className="mb-2">About us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
