import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroSection = ({ sliders }) => {
  console.log(sliders);

  return (
    <section className="relative w-full overflow-hidden rounded-2xl shadow-md mb-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[60vh]"
      >
        {sliders.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}

            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 text-center px-4 md:px-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-amber-400 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
                  {slide.text}
                </p>
                <Link
                  to="/all-reviews"
                  className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-transform hover:scale-105"
                >
                  Explore Reviews
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
