import React, { useEffect, useState } from "react";
import "../assets/Css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Features/Theme/ThemeSlice";
import {
  handleLogOut,
  checkIsAuthenticated,
  signUpWithGoogle,
} from "../Redux/Features/Auth/AuthSlice";
import SearchRecommendation from "./SearchRecommendation";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const totalCardItems = useSelector(
    (state) => state.product.card.totalCardItems
  );
  const mode = darkMode ? "dark" : "light";
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    dispatch(checkIsAuthenticated());
  }, [dispatch]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/categoryProducts/${selectedCategory}`);
    }
  };

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
  const handleSearchResult = () => {
    if (searchValue.length > 2) {
      navigate(`/searchProducts/${searchValue}`);
      setSearchValue("");
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      setCategory(data);
    };
    fetchCategory();
  }, []);

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
            <Link to={"/"} className="navbar-brand" href="#">
              Urban
            </Link>
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
                  <select onChange={handleCategoryChange}>
                    <option>Category</option>
                    {category &&
                      category.map((category, index) => {
                        return (
                          <option value={category} id={index}>
                            {category}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Urban"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <div className="recommendation">
                    {searchValue.length > 3 && (
                      <SearchRecommendation searchValue={searchValue} />
                    )}
                  </div>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={handleSearchResult}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </form>
              <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to={"/"}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/shop"}>
                    Shop
                  </Link>
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
                            <i class="fa-solid fa-user"></i>Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i class="fa-solid fa-dollar-sign"></i>Billing
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => dispatch(handleLogOut())}
                          >
                            <i class="fa-solid fa-right-from-bracket"></i>LogOut
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link top__icons"
                        aria-current="page"
                        href="#"
                      >
                        <i class="fa-solid fa-bell"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link top__icons shop__icon"
                        aria-current="page"
                        to={"/card"}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        {totalCardItems > 0 && <p>{totalCardItems}</p>}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <div className="toggleTheme">
                {darkMode ? (
                  <i class="fa-solid fa-sun"></i>
                ) : (
                  <i class="fa-solid fa-moon"></i>
                )}
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={darkMode}
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() => dispatch(toggleTheme())}
                  />
                </div>
              </div>
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
              <button type="button" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
