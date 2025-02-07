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
    path: "/coming-soon",
  },
  {
    name: "Tour Package Reservation",
    icon: <MdTour />,
    path: "/tourPackage",
  },
  {
    name: "Vehicle Reservation",
    icon: <AiFillCar />,
    path: "/coming-soon",
  },
  {
    name: "Train Reservation",
    icon: <FaTrain />,
    path: "/coming-soon",
  },
  {
    name: "Restaurant Reservation",
    icon: <BiRestaurant />,
    path: "/coming-soon",
  },
  {
    name: "Event Reservation",
    icon: <BsCalendarEvent />,
    path: "/coming-soon",
  },
];

const Services = () => {
  const handleCategoryClick = (path) => {
    window.location.href = path; 
  };

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
            <div
              className="service-card text-center"
              onClick={() => handleCategoryClick(category.path)} 
            >
              {/* Icon */}
              <div className="service-icon mb-3">{category.icon}</div>
              {/* Service Name */}
              <h4 className="service-name">{category.name}</h4>
              {category.name !== "Tour Package Reservation" && (
                <p className="text-muted">Coming Soon</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
