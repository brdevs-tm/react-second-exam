import React from "react";

import footer1 from "../assets/img/footer1.png";
import footer2 from "../assets/img/footer2.png";
import footer3 from "../assets/img/footer3.png";
import paymentIcons from "../assets/img/payment.png";
import {
  Call,
  Contact,
  Facebook,
  Instagram,
  LinkedIn,
  Location,
  Logo,
  Twitter,
  Youtube,
} from "../assets/img/Icons";

const Footer = () => {
  return (
    <footer className="container bg-gray-100 bg-opacity-50 mt-[100px]">
      <section className="grid grid-cols-1 gap-5 sm:grid sm:grid-cols-2 sm:gap-5 xl:flex xl:items-start xl:justify-between px-[25px] py-[37px]">
        <div>
          <img src={footer1} alt="" />
        </div>
        <div>
          <img src={footer2} alt="" />
        </div>
        <div>
          <img src={footer3} alt="" />
        </div>
        <div className="flex flex-col gap-[18px]">
          <span className="text-[18px] font-[700]">
            Would you like to join newsletters?
          </span>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="enter your email address..."
              className="bg-white border-2 border-solid border-gray-300 border-b-0 md:border-r-0 md:border-b-[2px]  p-[12px] pr-[26px] placeholder:text-gray-400 focus-within:border-blue-400"
            />
            <button className="bg-green-500 rounded-bl-[6px] rounded-br-[6px] md:rounded-tr-[6px] md:rounded-br-[6px] md:rounded-bl-none text-white text-[18px] font-[700] py-[12px] px-[26px]">
              Join
            </button>
          </div>
          <p className="text-[13px] font-[400] w-[300px] md:w-[354px]">
            We usually post offers and challenges in newsletter. We’re your
            online houseplant destination. We offer a wide range of houseplants
            and accessories shipped directly from our (green)house to yours!{" "}
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-5 sm:grid sm:grid-cols-2 sm:gap-5 xl:flex xl:items-start xl:justify-between bg-green-100 px-6 py-7">
        <Logo />
        <div className="flex items-center gap-[10px]">
          <Location />
          <span className="w-[190px]">
            70 West Buckingham Ave. Farmingdale, NY 11735
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <Contact />
          <span className="">contact@greenshop.com</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <Call />
          <a href="tel:+998907917119">+998 90 791 71 19</a>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-5 sm:grid sm:grid-cols-2 sm:gap-5 xl:flex xl:items-start xl:justify-between py-8 px-[25px]">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-[18px] font-[700]">Watering Garden</h1>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="" className="text-[14px] font-[400]">
                My Account
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Our Stores
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Contact us
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Career
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Specials
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-[18px] font-[700]">Help Guide</h1>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="" className="text-[14px] font-[400]">
                Help Center
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                How to Cuy
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Product Policy
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                How to Return
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-[18px] font-[700]">Categories</h1>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="" className="text-[14px] font-[400]">
                House Plants
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Potter Plants
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Seeds
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Small Plants
              </a>
            </li>
            <li>
              <a href="" className="text-[14px] font-[400]">
                Accesories
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[33px]">
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-[18px] font-[700]">Social Media</h1>
            <div className="flex items-center gap-[10px]">
              <a
                href=""
                className="border border-green-300 rounded-[4px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 hover:bg-green-300"
              >
                <Facebook />
              </a>
              <a
                href=""
                className="border border-green-300 rounded-[4px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 hover:bg-green-300"
              >
                <Instagram />
              </a>
              <a
                href=""
                className="border border-green-300 rounded-[4px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 hover:bg-green-300"
              >
                <Twitter />
              </a>
              <a
                href=""
                className="border border-green-300 rounded-[4px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 hover:bg-green-300"
              >
                <LinkedIn />
              </a>
              <a
                href=""
                className="border border-green-300 rounded-[4px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 hover:bg-green-300"
              >
                <Youtube />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-[18px] font-[700]">We accept</h1>
            <img src={paymentIcons} alt="paymentIcons" />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
