import React from "react";
import carousel1 from "../assets/Images/clothsCar.jpeg";
import carousel2 from "../assets/Images/wooden.avif";
import carousel3 from "../assets/Images/shose.jpeg";
import "../assets/Css/Home.css";
import TrendingProducts from "./TrendingProducts";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home my-5">
      <div className="slider">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={carousel1} className="d-block " alt="..." />
            </div>
            <div className="carousel-item">
              <img src={carousel2} className="d-block " alt="..." />
            </div>
            <div className="carousel-item">
              <img src={carousel3} className="d-block " alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="hot__catagories">
          <div className="row">
            <div className="col-sm-4">
              <div className="hot__catagories__content">
                <h4>Cutlery</h4>
                <p>
                  We are giving the best products all around by our service.
                </p>
                <Link to={`/categoryProducts/kitchen-accessories`}>
                  Go to Cutlery <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="hot__catagories__content">
                <h4>Cloths</h4>
                <p>
                  We are giving the best products all around by our service.
                </p>
                <Link to={`/categoryProducts/mens-shirts`}>
                  Go to Cloths <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="hot__catagories__content">
                <h4>Shoes</h4>
                <p>
                  We are giving the best products all around by our service.
                </p>
                <Link to={`/categoryProducts/mens-shoes`}>
                  Go to Shoes <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="trending__products">
          <h2>Trending Products</h2>
          <TrendingProducts />
        </div>
      </div>
    </div>
  );
};

export default Home;
