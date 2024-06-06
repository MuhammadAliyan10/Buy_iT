import React, { useEffect, useState } from "react";
import "../assets/Css/Navbar.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Features/ThemeSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const mode = darkMode ? "dark" : "light";
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onInputChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            UrbanMarket
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/" && "active"
                  }`}
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/about" && "active"
                  }`}
                  href="#"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/shop" && "active"
                  }`}
                  href="#"
                >
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/contact" && "active"
                  }`}
                  href="#"
                >
                  Contact
                </a>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Log In
                    </button>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <div className="row">
                    <div className="toggle-button-cover">
                      <div className="button-cover">
                        <div className="button r" id="button-4">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={darkMode}
                            onChange={() => dispatch(toggleTheme())}
                          />
                          <div className="knobs"></div>
                          <div className="layer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Sign In
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label className="col-form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-2">
                  <label className="col-form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-2">
                  <label className="col-form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-2">
                  <label className="col-form-label">PhoneNumber:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <p className="me-auto">
                Already have an account. <a href="">Log In</a>
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
