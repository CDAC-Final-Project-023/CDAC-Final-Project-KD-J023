import React, { useState, Fragment } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Dropdown } from "react-bootstrap";

const inside_nav = [
  { path: "/hotels", display: "Hotels" },
  { path: "/tours/home", display: "Tour Packages" },
  { path: "/vehicles", display: "Vehicles" },
  { path: "/Restaurants", display: "Restaurants" },
  { path: "/events", display: "Events" },
  { path: "/train", display: "Trains" },
];

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        {/* Logo */}
        <Link to="/admin" className="navbar-brand text-primary fw-bold">
          TravelyAdmin
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNav}
          aria-controls="navbarNav"
          aria-expanded={nav}
          aria-label="Toggle navigation"
        >
          {nav ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${nav ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                    id="userMenu"
                  >
                    <img
                      src={user.img}
                      alt="User"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span>{user.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary me-2">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-secondary">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Sidebar */}
        {nav && (
          <div className="d-lg-none bg-light position-fixed top-0 start-0 w-75 h-100 shadow">
            <ul className="list-unstyled p-4">
              {user ? (
                <>
                  <li className="mb-3">
                    <img
                      src={user.img}
                      alt="User"
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="fw-bold">{user.name}</span>
                  </li>
                  <li>
                    <Link to="/profile" className="btn btn-outline-primary w-100 mb-2">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-danger w-100"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-2">
                    <Link to="/login" className="btn btn-primary w-100">
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-secondary w-100">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
