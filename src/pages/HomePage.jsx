import React, { useState, useEffect } from "react";
import HomeCarousel from "../components/HomeCarousel";
import Product from "../components/Product";
import slideImage from "../assets/img/slideImage.png";

const HomePage = () => {
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
        // Extract unique categories from products
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
      icon: <img src={slideImage} alt="Slide" />, // Use the imported image directly
    },
    {
      slideHeader: "Welcome To GreenShop",
      slideText: "More information here",
      slideSpan: "Some additional details about this slide.",
      buttonText: "Learn More",
      icon: <img src={slideImage} alt="Slide" />, // Use the imported image directly
    },
    {
      slideHeader: "Welcome To GreenShop",
      slideText: "More information here",
      slideSpan: "Some additional details about this slide.",
      buttonText: "More Information",
      icon: <img src={slideImage} alt="Slide" />, // Use the imported image directly
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
          <div className="flex items-start justify-between md:items-center">
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
                <h1 className="text-[15px] font-[400] relative inline-block py-2 transition-all duration-300 group hover:text-green-500">
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
              <Product
                key={product.id}
                name={product.common_name}
                family={product.family}
                image={product.image_url}
              />
            ))}
          </div>
          <div className="pagination flex items-center gap-3 mt-5 justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-black font-[300] rounded-md transition-all duration-300 hover:bg-green-500 hover:border-green-500 hover:text-white ${
                currentPage === 1 && "pointer-events-none opacity-50"
              }`}
            >
              Prev
            </button>
            {Array.from(
              { length: Math.ceil(sortedProducts.length / productsPerPage) },
              (_, i) => i + 1
            ).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-black font-[300] rounded-md transition-all duration-300 hover:bg-green-500 hover:border-green-500 hover:text-white ${
                  currentPage === number &&
                  "bg-green-500 border-green-500 text-black"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(sortedProducts.length / productsPerPage)
              }
              className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-black font-[300] rounded-md transition-all duration-300 hover:bg-green-500 hover:border-green-500 hover:text-white ${
                currentPage ===
                  Math.ceil(sortedProducts.length / productsPerPage) &&
                "pointer-events-none opacity-50"
              }`}
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
