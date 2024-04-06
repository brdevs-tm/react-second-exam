import React, { useState } from "react";
import { Like } from "../assets/img/Icons";

const AboutProduct = ({ product }) => {
  const [count, setCount] = useState(0);

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex items-center">
      <div className="w-1/2 product-image flex items-center justify-center">
        <img
          src={product.image_url}
          style={{ width: "350px", height: "500px", borderRadius: "20px" }}
          alt=""
          className="transition-all duration-200 hover:-translate-y-2 hover:opacity-[0.5]"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="font-[700]">
            Name:{" "}
            <span className="font-[400] underline">{product.common_name}</span>
          </h1>
          <div className="flex items-center justify-between">
            <h1 className="font-[700]">
              Category:{" "}
              <span className="font-[400] underline">{product.family}</span>
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
                {count}
              </span>
              <button
                onClick={incrementCount}
                className="w-[40px] h-[40px] border rounded-full bg-green-500 text-white"
              >
                +
              </button>
            </div>
            <div className="actions flex items-center gap-5">
              <button className="border border-green-500 bg-green-500 rounded-md text-white py-[11px] px-[32px]">
                ADD TO CART
              </button>
              <button className="border border-green-500 bg-green-500 rounded-md text-white py-[11px] px-[32px]">
                BUY NOW
              </button>
              <button className="border border-green-500  p-[15px] rounded-md">
                <Like fill="#46a358" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;
