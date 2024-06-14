import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/Css/Products.css";
import Rating from "./Rating";

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const api = `https://dummyjson.com/products/category/${categoryName}`;
        const res = await fetch(api);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {}
    };
    fetchCategoryProducts();
  }, [categoryName]);
  return (
    <div className="container">
      <div className="categoryProducts">
        <h4>Category result of {categoryName}</h4>
        <div className="row">
          {products.length > 0 &&
            products.map((product) => {
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

export default Category;
