import React from 'react';
import Carousel from "./Carousel";
import home0 from "../assets/images/home0.svg";
import home1 from "../assets/images/home1.svg";
import home2 from "../assets/images/home2.svg";

const HomeSlides = () => {
  const slides = [home0, home1, home2];

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1400px] h-[600px] w-full">
        <Carousel autoSlide={true} >
          {slides.map((s) => (
            <img src={s} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeSlides;
