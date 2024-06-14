import React, { useEffect, useState } from "react";
import "../assets/Css/Navbar.css";
import { Link, useParams } from "react-router-dom";
import Rating from "./Rating";

const SearchProducts = () => {
  const { searchValue } = useParams();
  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue) return;

    const fetchSearchValues = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchValue}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await res.json();
        setSearchItems(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchValues();
  }, [searchValue]);

  return (
    <div className="container">
      <div className="searchProducts">
        <h4>Searched result for {searchValue}</h4>

        <div className="row">
          {searchItems.length > 0 &&
            searchItems.slice(0, 10).map((product) => {
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
                        <p>
                          <Rating totalStars={5} rating={product.rating} />
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
    </div>
  );
};

export default SearchProducts;
