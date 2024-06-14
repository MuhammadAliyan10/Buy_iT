import React, { useEffect, useState } from "react";
import "../assets/Css/Navbar.css";
import { useNavigate } from "react-router-dom";

const SearchRecommendation = ({ searchValue }) => {
  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/singleProduct/${id}`);
    setSearchItems([]);
  };

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
    <div className="recommendation">
      {loading && (
        <div className="d-flex align-items-center">
          <strong>Loading...</strong>
          <div
            className="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <ul>
        {searchItems.slice(0, 10).map((item) => (
          <li key={item.id}>
            <a onClick={() => handleNavigate(item.id)}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRecommendation;
