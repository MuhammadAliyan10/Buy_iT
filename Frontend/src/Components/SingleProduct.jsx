import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/Css/Products.css";

const SingleProduct = () => {
  const { productID } = useParams();
  console.log(productID);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const api = `https://dummyjson.com/products/${productID}`;
        const res = await fetch(api);
        const data = await res.json();
        setProduct(data);
      } catch (error) {}
    };
    fetchSingleProduct();
  }, []);
  console.log(product);
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
                <button>Add to card</button>
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
