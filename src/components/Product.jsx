import React from "react";

const Product = ({ name, family, image }) => {
  return (
    <div className="flex flex-col gap-3 bg-gray-100 bg-opacity-50 border border-t-4 border-b-4 transition-all duration-300 hover:border-t-4 hover:border-r-gray-100 hover:border-l-gray-100 hover:border-b-4 hover:border-green-500">
      <div className="card-body bg-gray-100 bg-opacity-50">
        <img
          src={image}
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
        <span className="text-[16px] font-[400]">{name}</span>
        <h1 className="text-[18px] font-[700] text-green-500">{family}</h1>
      </div>
    </div>
  );
};

export default Product;
