import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./HomeCarousel.css";
import mountains from "../../images/mountains.jpg";
const HomeCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="hero-carousel ">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        interval={5000}
        slide={true}
        nextLabel=""
        prevLabel="">
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/palm-tree-jungle-philippines-concept-about-wanderlust-tropical-travels-swinging-river-people-having-fun_186382-1220.jpg?w=1060"
            alt="Slide 1"
          />
          <Carousel.Caption className="hero-caption">
            <h3 className="fw-bold text-white">
              Get up to <span className="text-warning">40% OFF</span>
            </h3>
            <h1 className="fw-bold text-white">
              Explore the Wonders in India!
            </h1>
            <p className="text-light fs-5">
              Starting at INR 15,500{" "}
              <span className="text-decoration-line-through">INR 33,000</span>
            </p>
            <button className="btn btn-warning px-4 py-2 mt-3">
              Connect With An Expert
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/sunrise-taj-mahal-agra-india_268835-1128.jpg?w=1060"
            alt="Slide 2"
          />
          <Carousel.Caption className="hero-caption">
            <h3 className="fw-bold text-white">Experience the Beauty</h3>
            <h1 className="fw-bold text-white">Discover Timeless Monuments</h1>
            <p className="text-light fs-5">
              Book Now and Explore India's Marvels
            </p>
            <button className="btn btn-warning px-4 py-2 mt-3">
              Connect With An Expert
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img className="d-block w-100" src={mountains} alt="Slide 3" />
          <Carousel.Caption className="hero-caption">
            <h3 className="fw-bold text-white">Embrace Serenity</h3>
            <h1 className="fw-bold text-white">
              Experience Breathtaking Landscapes
            </h1>
            <p className="text-light fs-5">Plan Your Dream Vacation Today</p>
            <button className="btn btn-warning px-4 py-2 mt-3">
              Connect With An Expert
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
