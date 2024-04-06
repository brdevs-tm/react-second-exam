import React, { useState, useEffect } from "react";
import HomeCarousel from "../components/HomeCarousel";
import slideImage from "../assets/img/slideImage.png";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import LoginModal from "../components/Login";

const HomePage = () => {
  document.title = "Home Page";
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState("default");
  const productsPerPage = 6;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((product) => product.family)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let sortedProducts = [...products];

  if (sortingOption !== "default") {
    sortedProducts = sortedProducts.filter(
      (product) => product.family === sortingOption
    );
  }

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (value) => {
    setSortingOption(value);
  };

  const slides = [
    {
      slideHeader: "Welcome To GreenShop",
      slideText: "Let's Make a Better Planet",
      slideSpan:
        "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!",
      buttonText: "Shop Now",
      icon: <img src={slideImage} alt="Slide" />,
    },
    {
      slideHeader: "Welcome To GreenShop",
      slideText: "More information here",
      slideSpan: "Some additional details about this slide.",
      buttonText: "Learn More",
      icon: <img src={slideImage} alt="Slide" />,
    },
    {
      slideHeader: "Welcome To GreenShop",
      slideText: "More information here",
      slideSpan: "Some additional details about this slide.",
      buttonText: "More Information",
      icon: <img src={slideImage} alt="Slide" />,
    },
  ];

  return (
    <div className="container mt-32">
      {/* Carousel */}
      <div className="header-home mb-[46px]">
        <HomeCarousel slides={slides} />
      </div>
      {/* Categories */}
      <div className="flex flex-col sm:flex-row gap-10 px-[18px] py-[14px]">
        <div className="sm:w-1/4 flex flex-col gap-5 bg-gray-100 bg-opacity-50 px-[18px] py-[14px]">
          <h1 className="text-[18px] font-[700]">Categories</h1>
          <div className="flex flex-col gap-10 px-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{category}</span>
                <p>
                  (
                  {
                    products.filter((product) => product.family === category)
                      .length
                  }
                  )
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-3/4">
          {/* Product Sorting */}
          <div className="flex flex-col items-start justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:gap-[37px]">
              <div>
                <h1 className="text-[15px] font-[400] relative inline-block py-2 transition-all duration-300 group hover:text-green-500">
                  All Plants
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </h1>
              </div>
              <div>
                <h1 className="text-[15px] font-[400] relative inline-block py-2 transition-all duration-300 group hover:text-green-500">
                  New Arrivals
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </h1>
              </div>
              <div>
                <h1 className="text-[15px] font-[400]relative inline-block py-2 transition-all duration-300 group hover:text-green-500">
                  Sale
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </h1>
              </div>
            </div>
            <div>
              <span>Sort by:</span>
              <select
                name="sort-plants"
                id="sort-plant"
                className="py"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <optgroup>
                  <option value="default">Default Sorting</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
          <div className="products-row grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center mt-8 gap-y-5">
            {currentProducts.map((product) => (
              <Link to={`/shop/${product.id}`} key={product.id}>
                <div className="flex flex-col gap-3 bg-gray-100 bg-opacity-50 border border-t-4 border-b-4 transition-all duration-300 hover:border-t-4 hover:border-r-gray-100 hover:border-l-gray-100 hover:border-b-4 hover:border-green-500">
                  <div className="card-body bg-gray-100 bg-opacity-50">
                    <img
                      src={product.image_url}
                      style={{
                        background: "transparent",
                        width: "250px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                      alt="product"
                    />
                  </div>
                  <div className="card-footer gap-2 py-3 px-5">
                    <span className="text-[16px] font-[400]">
                      {product.common_name}
                    </span>
                    <h1 className="text-[18px] font-[700] text-green-500">
                      {product.family}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination flex items-center gap-3 mt-5 justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`pagination-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(products.length / productsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
