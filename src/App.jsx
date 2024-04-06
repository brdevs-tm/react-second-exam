import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import PlantCare from "./pages/PlantCare";
import Blogs from "./pages/Blogs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SelectedProduct from "./pages/SelectedProduct";
import ShoppingCart from "./pages/ShoppingCart";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/plant-care" element={<PlantCare />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/shop/selectedproduct" element={<SelectedProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
