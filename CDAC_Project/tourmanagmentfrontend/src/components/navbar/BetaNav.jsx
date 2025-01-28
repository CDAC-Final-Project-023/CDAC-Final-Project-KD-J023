import "./BetaNav.css";
import React, { useContext } from "react";
import defaultuserlogo from "../../images/euser.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const BetaNav = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  const inside_nav = [
    // { path: "/hotelhome", display: "Hotels" },
    { path: "/tourPackage", display: "Tour Packages" },
    // { path: "/vehicles", display: "Vehicles" },
    // { path: "/Restaurants", display: "Restaurants" },
    // { path: "/events", display: "Events" },
    // { path: "/TrainHome", display: "Trains" },
  ];

  return (
    <nav className="navbar custom-navbar navbar-expand-lg fixed-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand logo">
          NOt yet decided
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="reservationDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Reservations
              </a>
              <ul className="dropdown-menu">
                {inside_nav.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className="dropdown-item">
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contactus" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right-Side Avatar */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img
                    src={user.img || defaultuserlogo}
                    alt="User"
                    className="rounded-circle me-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  {user.name}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookings" className="dropdown-item">
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="guestDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img
                    src={defaultuserlogo}
                    alt=""
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="guestDropdown">
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="dropdown-item">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BetaNav;
