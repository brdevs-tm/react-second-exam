import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RemoverMenu } from "../assets/img/Icons";

const NavbarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className="text-[16px] font-[500] relative inline-block py-2 transition-all duration-300 group hover:text-green-500"
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </NavLink>
);

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponError, setIsCouponError] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        // Add a quantity property to each item in the cart
        const itemsWithQuantity = data.map((item) => ({
          ...item,
          quantity: 0,
        }));
        setCartItems(itemsWithQuantity);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + value, 0) }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalPriceBeforeDiscount = couponCode ? totalPrice : 0;
    const totalPriceAfterDiscount =
      totalPriceBeforeDiscount - totalPriceBeforeDiscount * discount;
    return { totalPriceBeforeDiscount, totalPriceAfterDiscount };
  };

  const applyCouponCode = () => {
    if (couponCode.length < 6) {
      setIsCouponError(true);
      return;
    } else {
      setIsCouponError(false);
    }

    const couponRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!couponRegex.test(couponCode)) {
      setIsCouponError(true);
      return;
    } else {
      setIsCouponError(false);
    }

    if (discount === 0) {
      const randomDiscount = Math.random() * (0.25 - 0.05) + 0.05; // Random discount between 5% and 25%
      setDiscount(randomDiscount);
    }
  };

  const resetCouponCode = () => {
    setCouponCode("");
    setDiscount(0);
    setIsCouponError(false);
  };

  const { totalPriceBeforeDiscount, totalPriceAfterDiscount } =
    calculateTotalPrice();

  return (
    <div className="container mt-32">
      <div className="breadcrumb flex items-center gap-2 px-5 mb-10">
        <NavbarLink to="/">Home</NavbarLink>
        <span>/</span>
        <NavbarLink to="/shop">Shop</NavbarLink>
      </div>
      <div className="flex items-start justify-between">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-[40px] py-2">
                Products
              </th>
              <th className="border border-gray-400 px-8 py-2">Price</th>
              <th className="border border-gray-400 px-8 py-2">Quantity</th>
              <th className="border border-gray-400 px-8 py-2">Total</th>
              <th className="border border-gray-400 px-8 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(
              (item) =>
                // Render table row only if item exists
                item && (
                  <tr key={item.id}>
                    <td className="border border-gray-400 px-[40px] py-2 flex items-center gap-2">
                      <img
                        src={item.image_url}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        alt={item.common_name}
                      />
                      <div className="flex flex-col">
                        <span>{item.common_name}</span>
                        <span>{item.id}</span>
                      </div>
                    </td>
                    <td className="border border-gray-400 px-8 py-2">
                      <span>${item.price}</span>
                    </td>
                    <td className="border border-gray-400 px-8 py-2">
                      <div className="counter-product flex items-center gap-5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-[40px] h-[40px] border rounded-full bg-green-500 text-white"
                        >
                          -
                        </button>
                        <span className="border border-green-500 rounded-md w-[40px] h-[40px] flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-[40px] h-[40px] border rounded-full bg-green-500 text-white"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-400 px-8 py-2">
                      ${item.price * item.quantity}
                    </td>
                    <td className="border border-gray-400 px-8 py-2">
                      <button onClick={() => removeFromCart(item.id)}>
                        <RemoverMenu />
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div className="flex flex-col gap-5">
          <div>
            <button
              onClick={resetCouponCode}
              className={`bg-green-500 rounded-bl-[6px] md:rounded-tl-[6px] md:rounded-bl-[6px] md:rounded-bl-none text-white text-[18px] font-[700] py-[12px] px-[26px] ${
                couponCode ? "" : "hidden"
              }`}
            >
              Remove Coupon
            </button>
            <input
              type="text"
              placeholder="Enter coupon code..."
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className={`bg-white border-2 border-solid ${
                isCouponError ? "border-red-500" : "border-gray-300"
              } border-b-0 md:border-l-0 md:border-r-0 md:border-b-[2px]  p-[12px] pr-[26px] placeholder:text-gray-400 focus-within:border-blue-400`}
            />
            <button
              onClick={applyCouponCode}
              className={`bg-green-500 rounded-bl-[6px] rounded-br-[6px] md:rounded-tr-[6px] md:rounded-br-[6px] md:rounded-bl-none text-white text-[18px] font-[700] py-[12px] px-[26px]`}
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <span className="text-green-500">
              Coupon applied! Discount: {Math.round(discount * 100)}%
            </span>
          )}
          {couponCode && (
            <div>
              <span>Total (Before Discount): ${totalPriceBeforeDiscount}</span>
            </div>
          )}
          <div>
            <span>Total (After Discount): ${totalPriceAfterDiscount}</span>
          </div>
          <div className="flex flex-col">
            <button className="bg-green-500  text-white text-[18px] font-[700] py-[12px] px-[26px]">
              Proceed To Checkout
            </button>
            <a href="/" className="text-center">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
