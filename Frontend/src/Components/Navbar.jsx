import React, { useEffect, useState } from "react";
import "../assets/Css/Navbar.css";
import { useLocation } from "react-router-dom";
import useWebContext from "../Context/WebContext";
const Navbar = () => {
  const location = useLocation();
  const { toggleTheme } = useWebContext();
  const [scrolled, setScrolled] = useState(false);
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
  }, [scrolled]);
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
                  className={`nav-link ${location.pathname == "/" && "active"}`}
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname == "/about" && "active"
                  }`}
                  href="#"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname == "/shop" && "active"
                  }`}
                  href="#"
                >
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname == "/contact" && "active"
                  }`}
                  href="#"
                >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <div class="row">
                    <div class="toggle-button-cover">
                      <div class="button-cover">
                        <div class="button r" id="button-4">
                          <input
                            type="checkbox"
                            class="checkbox"
                            onClick={toggleTheme}
                          />
                          <div class="knobs"></div>
                          <div class="layer"></div>
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
    </div>
  );
};

export default Navbar;
