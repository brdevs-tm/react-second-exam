// Header.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  Cart,
  HamburgerMenu,
  Login,
  Logo,
  RemoverMenu,
  Search,
} from "../assets/img/Icons";
import LoginModal from "./Login";

const NavbarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className="text-[16px] font-[500] relative inline-block py-2 transition-all duration-300 group hover:text-green-500"
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </NavLink>
);

const Header = ({ logoSrc }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="container px-6 py-[25px] flex items-center justify-between">
          <div className="nav-left">
            <Logo src={logoSrc} />
          </div>
          <div
            className={`nav-center hidden md:block ${
              menuVisible ? "hidden" : ""
            }`}
          >
            <ul className="flex items-center gap-[50px]">
              <li>
                <NavbarLink to="/">Home</NavbarLink>
              </li>
              <li>
                <NavbarLink to="/shop">Shop</NavbarLink>
              </li>
              <li>
                <NavbarLink to="/plant-care">Plant Care</NavbarLink>
              </li>
              <li>
                <NavbarLink to="/blogs">Blogs</NavbarLink>
              </li>
            </ul>
          </div>
          <div className="nav-right hidden md:flex md:items-center md:gap-[30px]">
            <div>
              <Search />
            </div>
            <a className="flex relative" href="../pages/ShoppingCart.jsx">
              <span className="cart-count absolute top-[-20px] -right-2 bg-green-500 text-white px-[5px] rounded-md">
                {cartCount}
              </span>
              <Cart />
            </a>
            <button
              className="py-[8px] px-[17px] bg-green-600 flex items-center justify-center gap-2 rounded-md"
              onClick={openLoginModal}
            >
              <Login />
              <span className="text-white">Login</span>
            </button>
          </div>
          <div className="hamburger relative block md:hidden">
            <button onClick={toggleMenu}>
              {menuVisible ? <RemoverMenu /> : <HamburgerMenu />}
            </button>
            {menuVisible && (
              <div className="fixed top-[60px] right-0 z-50 bg-white px-10 py-10 h-full pt-[90px] transition-all duration-300">
                <ul className="flex flex-col items-end gap-[10px]">
                  <li>
                    <NavbarLink to="/" onClick={toggleMenu}>
                      Home
                    </NavbarLink>
                  </li>
                  <li>
                    <NavbarLink to="/shop" onClick={toggleMenu}>
                      Shop
                    </NavbarLink>
                  </li>
                  <li>
                    <NavbarLink to="/plant-care" onClick={toggleMenu}>
                      Plant Care
                    </NavbarLink>
                  </li>
                  <li>
                    <NavbarLink to="/blogs" onClick={toggleMenu}>
                      Blogs
                    </NavbarLink>
                  </li>
                </ul>
                <div className="flex flex-col items-end gap-8 mt-8">
                  <div>
                    <Search />
                  </div>
                  <a className="flex relative" href="../pages/ShoppingCart.jsx">
                    <span className="cart-count absolute top-[-20px] -right-2 bg-green-500 text-white px-[5px] rounded-md">
                      {cartCount}
                    </span>
                    <Cart />
                  </a>
                  <button
                    className="py-[8px] px-[17px] bg-green-600 flex items-center justify-center gap-2 rounded-md"
                    onClick={openLoginModal}
                  >
                    <Login />
                    <span className="text-white">Login</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="container flex">
          <span className="w-full bg-green-500 h-[3px]"></span>
        </div>
      </header>
      {loginModalOpen && <LoginModal closeModal={closeModal} />}
    </>
  );
};

Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

Header.defaultProps = {
  logoSrc: "../assets/img/logo.png",
};

export default Header;
