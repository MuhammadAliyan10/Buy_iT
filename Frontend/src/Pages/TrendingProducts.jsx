import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Css/Products.css";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const api = "https://dummyjson.com/products?limit=10";
      try {
        const res = await fetch(api);
        const data = await res.json();
        setTrendingProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrendingProducts();
  }, []);
  return (
    <div className="trendingProducts">
      <div className="row">
        {trendingProducts.length > 0 &&
          trendingProducts.map((product) => {
            return (
              <div className="col-sm-4" key={product.id}>
                <div className="products">
                  <div className="card">
                    <img
                      src={product.thumbnail}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>

                      <p>
                        <span className="tag">Price : </span>
                        {product.price} $
                      </p>
                      <Link
                        to={`/singleProduct/${product.id}`}
                        className="btn btn-primary"
                      >
                        Add to card
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TrendingProducts;
