// ReadOnlyRating.js
import React from "react";
import PropTypes from "prop-types";
import "../assets/Css/Products.css";

const Rating = ({ totalStars, rating }) => {
  return (
    <div>
      {[...Array(totalStars)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= rating ? "on" : "off"}
            style={{ fontSize: "24px" }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

Rating.propTypes = {
  totalStars: PropTypes.number,
  rating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  totalStars: 5,
};

export default Rating;
