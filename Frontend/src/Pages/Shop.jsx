import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Css/Shop.css";
import Rating from "../Components/Rating";
import Pagination from "../Components/Pagination";

const Shop = () => {
  const [shopProducts, setShopProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(shopProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = shopProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const api = "https://dummyjson.com/products?limit=99";
      try {
        const res = await fetch(api);
        const data = await res.json();
        setShopProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrendingProducts();
  }, []);
  return (
    <div className="shop">
      <div className="container">
        <div className="row">
          {currentProducts.length > 0 &&
            currentProducts.map((product) => {
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
                            Add to card
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Shop;
