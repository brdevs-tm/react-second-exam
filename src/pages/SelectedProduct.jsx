import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SelectedProduct = () => {
  document.title = "Selected Product";
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data[0]);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  return (
    <div className="container mt-32">
      <div className="breadcrumb flex items-center gap-2">
        <NavbarLink to="/">Home</NavbarLink>
        <span>/</span>
        <NavbarLink to="/shop">Shop</NavbarLink>
      </div>
      {product && (
        <div className="about-product">
          <div className="flex items-center">
            <div className="w-1/2 product-image flex items-center justify-center">
              <img
                src={product.image_url}
                style={{
                  width: "350px",
                  height: "500px",
                  borderRadius: "20px",
                }}
                alt=""
                className="transition-all duration-200 hover:-translate-y-2 hover:opacity-[0.5]"
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
                <div className="flex items-center justify-between">
                  <h1 className="font-[700]">
                    Category:{" "}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedProduct;
