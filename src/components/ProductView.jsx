import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AboutProduct from "../components/AboutProduct";

const NavbarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className="text-[16px] font-[500] relative inline-block py-2 transition-all duration-300 group hover:text-green-500"
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </NavLink>
);

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams(); // Get the id from URL params

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (products.length > 0 && id) {
      const selectedProduct = products.find((product) => product.id === id);
      if (selectedProduct) {
        const fetchedProductFamily = selectedProduct.family;
        const filteredProducts = products.filter(
          (product) => product.family === fetchedProductFamily
        );
        setRelatedProducts(filteredProducts.slice(1));
      }
    }
  }, [products, id]);

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="container mt-32">
      <div className="breadcrumb flex items-center gap-2">
        <NavbarLink to="/">Home</NavbarLink>
        <span>/</span>
        <NavbarLink to="/shop">Shop</NavbarLink>
      </div>
      <div className="about-product">
        {id && selectedProduct && (
          <AboutProduct product={selectedProduct} addToCart={addToCart} />
        )}
      </div>
      <div className="mt-[100px] related-plants flex flex-col gap-5">
        <h1 className="text-green-500 font-[500]">Related Plants</h1>
        <div className="flex">
          <span className="w-full bg-green-500 h-[3px]"></span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {relatedProducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col border rounded-[25px] transition-all duration-300 hover:border-green-400 "
            >
              <div className="card-body ">
                <img
                  src={product.image_url}
                  style={{
                    objectFit: "cover",
                    width: "250px",
                    height: "300px",
                  }}
                  alt="product"
                  className="transition-all duration-200 hover:-translate-y-2 rounded-[25px]"
                />
              </div>
              <div className="card-footer flex flex-col px-4 py-4 bg-gray-100 bg-opacity-50">
                <span className="name">{product.common_name}</span>
                <span className="family">{product.family}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
