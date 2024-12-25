import React from "react";
import { FaHotel, FaTrain } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { BiRestaurant } from "react-icons/bi";
import { BsCalendarEvent } from "react-icons/bs";
import "./Services.css"; // Importing custom CSS

const categories = [
  {
    name: "Hotel Reservation",
    icon: <FaHotel />,
  },
  {
    name: "Tour Package Reservation",
    icon: <MdTour />,
  },
  {
    name: "Vehicle Reservation",
    icon: <AiFillCar />,
  },
  {
    name: "Train Reservation",
    icon: <FaTrain />,
  },
  {
    name: "Restaurant Reservation",
    icon: <BiRestaurant />,
  },
  {
    name: "Event Reservation",
    icon: <BsCalendarEvent />,
  },
];

const Services = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="text-center mb-5">
        <span className="text-primary d-block fw-semibold mb-2">
          Our Services
        </span>
        <h2 className="text-dark fw-bold mb-4">What We Offer</h2>
        <p className="text-secondary">
          Discover a wide range of services designed to make your travel
          experience smooth and enjoyable.
        </p>
      </div>

      {/* Services Grid */}
      <div className="row g-4">
        {categories.map((category, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div className="service-card text-center">
              {/* Icon */}
              <div className="service-icon mb-3">{category.icon}</div>
              {/* Service Name */}
              <h4 className="service-name">{category.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
