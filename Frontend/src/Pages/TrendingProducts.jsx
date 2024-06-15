import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Css/Products.css";
import Rating from "../Components/Rating";
import Pagination from "../Components/Pagination";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const api = "https://dummyjson.com/products?limit=50";
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

  const totalPages = Math.ceil(trendingProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = trendingProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="trendingProducts">
      <div className="row">
        {currentProducts.length > 0 &&
          currentProducts
            .filter((product) => product.rating > 4)
            .map((product) => {
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
                        <button>
                          <Link to={`/singleProduct/${product.id}`}>
                            Add to cart
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TrendingProducts;
