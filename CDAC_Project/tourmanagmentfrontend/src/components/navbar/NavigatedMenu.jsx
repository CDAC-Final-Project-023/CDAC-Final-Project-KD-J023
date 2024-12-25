import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
//import tour from "../../assets/data/tourCategoris";

const NavigatedMenu = () => {
  const location = useLocation();
  const path = location.pathname;
  const title = path.split("/").pop();

  //const Tour = tour.filter((tour) => tour.links === title);

  return (
    <nav className="bg-light w-100 rounded-md p-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="text-primary">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <AiOutlineRight className="mx-2 text-muted" />
        </li>
        <li className="breadcrumb-item">
          <Link to="/tours/home" className="text-primary">
            Tour Packages
          </Link>
        </li>
        <li className="breadcrumb-item">
          <AiOutlineRight className="mx-2 text-muted" />
        </li>
        <li className="breadcrumb-item active text-muted">
          {/* {Tour[0]?.title || "Unknown"} */}
        </li>
      </ol>
    </nav>
  );
};

export default NavigatedMenu;
