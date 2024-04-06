import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NavbarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className="text-[16px] font-[500] relative inline-block py-2 transition-all duration-300 group hover:text-green-500"
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </NavLink>
);

const Shop = () => {
  document.title = "Product View";
  const [product, setProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomProduct = data[randomIndex];
        setProduct(randomProduct);
        const filteredProducts = data.filter(
          (product) => product.family === randomProduct.family
        );
        setRelatedProducts(filteredProducts.slice(1));
      })
      .catch((error) => console.error("Error fetching data:", error));

    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);

  const addToCart = () => {
    const isAlreadyAdded = localStorage.getItem("addedToCart");
    if (!isAlreadyAdded) {
      setCartCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem("cartCount", newCount.toString());
        return newCount;
      });
      localStorage.setItem("addedToCart", "true");
    } else {
      alert("Already added");
    }
  };

  const decrementCount = () => {
    if (quantity > 0) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const incrementCount = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const buyNow = () => {
    if (quantity > 0 && product) {
      // Redirect to ShoppingCart with the product information
      // You can use state, context, or URL parameters to pass data to the ShoppingCart component
      window.location.href = `/shop/shoppingcart?productId=${product.id}&quantity=${quantity}`;
    } else {
      alert("Please select a quantity greater than 0.");
    }
  };

  return (
    <div className="container mt-32">
      <div className="breadcrumb flex items-center gap-2 px-5 mb-10">
        <NavbarLink to="/">Home</NavbarLink>
        <span>/</span>
        <NavbarLink to="/shop">Shop</NavbarLink>
        <span>/</span>
        <NavbarLink to="/shop/shoppingcart">Shopping Cart</NavbarLink>
      </div>
      {product && (
        <div className="about-product px-5">
          <div className="flex items-center flex-col lg:flex-row gap-6">
            <div className="w-1/2 product-image flex items-center justify-center">
              <img
                src={product.image_url}
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
                alt=""
                className="w-[350px] h-[200px] sm:h-[500px] transition-all duration-200 hover:-translate-y-2 hover:opacity-[0.5]"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-center gap-5">
              <div className="flex flex-col gap-5">
                <h1 className="font-[700]">
                  Name:{" "}
                  <span className="font-[400] underline">
                    {product.common_name}
                  </span>
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="font-[700]">
                    Category:
                    <span className="font-[400] underline">
                      {product.family}
                    </span>
                  </h1>
                  <h1 className="flex items-center gap-5">
                    Status:{" "}
                    <span className="border py-1 px-2 bg-green-500 text-white rounded-md">
                      {product.status}
                    </span>
                  </h1>
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-[700]">Scientific Name</span>
                  <p className="font-[400]">{product.scientific_name}</p>
                  <span className="font-[700]">Year</span>
                  <p className="font-[400]">{product.year}</p>
                  <span className="font-[700]">Genus</span>
                  <p className="font-[400]">{product.genus}</p>
                  <span className="font-[700]">Price</span>
                  <p className="text-green-600 font-[600]">${product.price}</p>
                </div>
                <div className="flex items-start flex-col gap-y-4">
                  <div className="counter-product flex items-center gap-5">
                    <button
                      onClick={decrementCount}
                      className="w-[40px] h-[40px] border rounded-full bg-green-500 text-white"
                    >
                      -
                    </button>
                    <span className="border border-green-500 rounded-md w-[40px] h-[40px] flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementCount}
                      className="w-[40px] h-[40px] border rounded-full bg-green-500 text-white"
                    >
                      +
                    </button>
                  </div>
                  <div className="actions flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <button
                      onClick={() => {
                        addToCart();
                      }}
                      className="border border-green-500 bg-green-500 rounded-md text-white py-[11px] px-[32px]"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={buyNow}
                      className="border border-green-500 bg-green-500 rounded-md text-white py-[11px] px-[32px]"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-[100px] related-plants flex flex-col gap-5 px-5">
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

export default Shop;
