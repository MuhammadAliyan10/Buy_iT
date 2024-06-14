import React, { useEffect, useState } from "react";
import "../assets/Css/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Features/ThemeSlice";
import {
  handleLogOut,
  checkIsAuthenticated,
  signUpWithGoogle,
} from "../Redux/Features/Auth/AuthSlice";

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
    dispatch(checkIsAuthenticated());
  }, [dispatch]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const handleScroll = () => {
    if (window.scrollY > 20) {
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
      <div className="top__header">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="top__links">
                <ul>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="top__title">
                <h4>Urban Market</h4>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <p>Sillanwali, Sargodha</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lower__header">
        <nav
          className={`navbar navbar-expand-lg bg-body-tertiary ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              Urban
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form role="search" className="search__form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Urban"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </form>
              <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Shop
                  </a>
                </li>
                {!isAuthenticated ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Log In
                  </button>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-regular fa-user"></i>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Billing
                          </a>
                        </li>
                        <hr />

                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => dispatch(handleLogOut())}
                          >
                            LogOut
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                SignIn With
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <button onClick={() => dispatch(signUpWithGoogle())}>
                With Google
              </button>
            </div>
            <div className="modal-footer">
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
