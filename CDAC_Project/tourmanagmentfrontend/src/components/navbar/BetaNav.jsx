import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { AuthContext } from "../../context/authContext";
import { capitalizeFirstLetter } from "../../utils/formatName"; // Import utility function
import { config } from "../../services/config"; // Import configuration as named import
import "./BetaNav.css"; // Importing the CSS
import defaultuserlogo from "../../images/euser.png"; // Importing the default user image
import Logout from "../../context/Logout"; // Ensure Logout is imported

const BetaNav = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout function from context
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.name) {
        setUserName(capitalizeFirstLetter(decodedToken.name)); // Set the user's name with the first letter capitalized
      }

      if (decodedToken.photo) {
        const photoUrl = `${config.serverUrl}/uploads/${decodedToken.photo}`; // Use serverUrl from config
        setUserPhoto(photoUrl);
      }
    }
  }, []);

  const handleLogout = () => {
    Logout(); // Call the logout function from context
    window.location.reload(); // Reload the page to reflect the logout state
  };

  const inside_nav = [{ path: "/tourPackage", display: "Tour Packages" }];

  return (
    <nav className="navbar custom-navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand logo">
          MyApp
        </Link>

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
