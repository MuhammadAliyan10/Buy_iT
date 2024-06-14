import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SingleProduct from "./Components/SingleProduct";
import Shop from "./Pages/Shop";
import Category from "./Components/Category";
import SearchProducts from "./Components/SearchProducts";
import Card from "./Pages/Card";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/card" element={<Card />} />
          <Route path="/singleProduct/:productID" element={<SingleProduct />} />
          <Route
            path="/searchProducts/:searchValue"
            element={<SearchProducts />}
          />
          <Route
            path="/categoryProducts/:categoryName"
            element={<Category />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
