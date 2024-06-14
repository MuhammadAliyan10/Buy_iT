import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/Css/Products.css";
import Rating from "./Rating";
import { useSelector, useDispatch } from "react-redux";
import { addToCard } from "../Redux/Features/Products/ProductSlice";

const SingleProduct = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const api = `https://dummyjson.com/products/${productID}`;
        const res = await fetch(api);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
  }, [productID]);
  const handleAddToCard = (product) => {
    dispatch(addToCard(product));
  };
  return (
    <div className="single__product">
      <div className="container">
        <div className="about__product">
          <div className="row">
            <div className="col-sm-6">
              <div className="product__image">
                <img src={product?.thumbnail} alt="" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="product__details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <p>
                  <span>Price : </span>
                  {product.price} $
                </p>
                <p>Remaining stocks is {product.stock}</p>
                <p>
                  Rating : <Rating totalStars={5} rating={product.rating} />
                </p>
                <button
                  disabled={!isAuthenticated}
                  onClick={() => handleAddToCard(product)}
                >
                  {!isAuthenticated ? <>LogIn first</> : <>Add to card</>}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews">
          <h3>Reviews</h3>
          <ul>
            {product?.reviews?.map((review) => {
              return (
                <li key={review.reviewerEmail}>
                  <div className="user__info">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div className="user__comment">
                    <h5>{review.reviewerName}</h5>
                    <p>{review.comment}</p>
                    <Rating totalStars={5} rating={review.rating} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
