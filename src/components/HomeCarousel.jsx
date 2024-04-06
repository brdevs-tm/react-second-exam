import React, { useState } from "react";
import { Next, Previous } from "../assets/img/Icons";

const HomeCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative home-carousel flex flex-col mt-5 ">
      <div className="slides bg-gray-100 bg-opacity-50 p-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{ display: index === currentIndex ? "block" : "none" }}
          >
            <div className="slide-content flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="text-content flex items-start flex-col lg:w-[50%]">
                <h2 className="text-gray-700 tracking-wider text-[14px] font-[500] uppercase">
                  {slide.slideHeader}
                </h2>
                <p className="text-gray-700 line-clamp-2 text-35px sm:text-[70px] uppercase w-[550px] font-[900]">
                  {slide.slideText.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={
                        index === slide.slideText.split(" ").length - 1
                          ? "text-green-600"
                          : ""
                      }
                    >
                      {word}
                    </span>
                  ))}
                </p>

                <span className="max-w-[350px] sm:max-w-[530px] font-[400] text-gray-700">
                  {slide.slideSpan}
                </span>
                <button className="mt-[44px] text-[16px] tracking-wider font-[700] text-white bg-green-600 py-[11px] px-[27px] rounded-md uppercase">
                  {slide.buttonText}
                </button>
              </div>
              <div className="lg:w-[50%] lg:pl-10 lg:mt-0 mt-5">
                {slide.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-11 left-[50%] transform -translate-x-1/2 controls flex items-center justify-center gap-5">
        <button onClick={goToPrevSlide}>
          <Previous />
        </button>
        <button onClick={goToNextSlide}>
          <Next />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default HomeCarousel;
