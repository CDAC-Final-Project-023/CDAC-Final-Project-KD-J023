import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/authContext";
import { capitalizeFirstLetter } from "../../utils/formatName"; 
import { config } from "../../services/config"; 
import "./BetaNav.css"; 
import defaultuserlogo from "../../images/euser.png"; 
import Logout from "../../context/Logout"; 

const BetaNav = () => {
  const { user} = useContext(AuthContext); 
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.name) {
        setUserName(capitalizeFirstLetter(decodedToken.name)); 
      }

      if (decodedToken.photo) {
        const photoUrl = `${config.serverUrl}/uploads/${decodedToken.photo}`;
        setUserPhoto(photoUrl);
      }
    }
  }, []);

  const handleLogout = () => {
     Logout();
 
    window.location.reload();
  };

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const inside_nav = [{ path: "/tourPackage", display: "Tour Packages" }];

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

 useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav
      className="navbar custom-navbar navbar-expand-lg fixed-top"
      ref={navbarRef}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand logo">
          MyApp
        </Link>

        <button
          className={`navbar-toggler right-side-toggle ${
            isExpanded ? "collapsed" : ""
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isExpanded ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isExpanded ? "show" : ""
          }`}
          id="navbarNav">
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
              <span
                className="nav-link"
                onClick={() => handleRedirect("/contactus")}>
                Contact Us
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() => handleRedirect("/aboutus")}>
                About Us
              </span>
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
                    src={userPhoto ? userPhoto : defaultuserlogo}
                    alt="User"
                    className="rounded-circle me-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  {userName}
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
                    <Link to="/mybookings" className="dropdown-item">
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
