import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
  
    const handleLogout = () => {
      logout();
      navigate("/login");
      window.location.reload();
    };
  
const inside_nav = [
    {
      path: "/hotelhome",
      display: "Hotels",
    },
    {
      path: "/tours/home",
      display: "Tour Packages",
    },
    {
      path: "/vehicles",
      display: "Vehicles",
    },
    {
      path: "/Restaurants",
      display: "Restaurants",
    },
    {
      path: "/events",
      display: "Events",
    },
    {
      path: "/TrainHome",
      display: "Trains",
    }
  ];
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Brand on the left */}
          <Link to="/" >
          <h1 class="navbar-brand fs-2 fw-bold" style={{color:"#41A4FF"}}>Travely</h1>
          
          </Link>
      
          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
      
          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Centered Navigation Links */}
            <div className="mx-auto">
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle me-3"
                    href="#"
                    id="reservationDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Reservations
                  </a>
                  <ul className="dropdown-menu me-3" aria-labelledby="reservationDropdown">
                    {inside_nav.map((item, index) => (
                      <li key={index}>
                        <Link to={item.path} className="dropdown-item">
                          {item.display}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item me-3">
                  <Link to="/contactus" className="nav-link">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
      
            {/* Right-Side Auth Options */}
            <ul className="navbar-nav ms-auto">
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user.img || "https://via.placeholder.com/30"}
                      alt="User"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    {user.name}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
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
                <>
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-primary me-2">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-dark">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

<ul class="navbar-nav ">
    <li class="nav-item dropdown me-8">
        <a
            class="nav-link dropdown-toggle d-flex align-items-center"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                class="rounded-circle"
                height="35"
                
                alt="Avatar"
                loading="lazy"
            />
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
            <li>
                <a class="dropdown-item" href="#">My profile</a>
            </li>
            <li>
                <a class="dropdown-item" href="#">Settings</a>
            </li>
            <li>
                <a class="dropdown-item" href="#">Logout</a>
            </li>
        </ul>
    </li>
</ul>

            </ul>
          </div>
        </div>
      </nav>
      
    
    );
  };
  
export default Navbar;