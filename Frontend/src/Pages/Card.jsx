import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/Css/Card.css";
import Rating from "../Components/Rating";
import { removeFromCard } from "../Redux/Features/Products/ProductSlice";

const Card = () => {
  const cardItems = useSelector((state) => state.product.card.cardItems);
  const totalCardItems = useSelector(
    (state) => state.product.card.totalCardItems
  );

  const dispatch = useDispatch();

  return (
    <div className="cards">
      <div className="container">
        <h2>Your Cart</h2>
        <div className="row">
          <div className="col-sm-10">
            <div className="row">
              {cardItems.length > 0 ? (
                cardItems.map((product) => (
                  <div className="col-sm-4" key={product.id}>
                    <div className="products">
                      <div className="card">
                        <img
                          src={product.thumbnail}
                          className="card-img-top"
                          alt={product.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p>
                            <span className="tag">Price : </span>
                            {product.price} $
                          </p>
                          <p>
                            <Rating totalStars={5} rating={product.rating} />
                          </p>
                          <button
                            onClick={() => dispatch(removeFromCard(product.id))}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nothing in the cart</p>
              )}
            </div>
          </div>
          <div className="col-sm-2">
            <ul className="card__details">
              <li>
                <h4>Total Amount</h4>
                {cardItems.length > 0 ? (
                  <p>
                    $
                    {cardItems
                      .reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}
                  </p>
                ) : (
                  <p>No item in card</p>
                )}
              </li>
              <li>
                <h4>Total Items</h4>
                {totalCardItems > 0 ? (
                  <p>{totalCardItems}</p>
                ) : (
                  <p>No items in card</p>
                )}
              </li>
              <li>
                <button>Buy Now</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
