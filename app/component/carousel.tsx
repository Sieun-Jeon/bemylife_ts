"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const ImageCarousel = () => {
  const images = Array.from({ length: 12 }, (_, i) => `/image/${i + 1}.jpg`);


  return (
    <div className="h-screen w-screen flex items-center justify-center">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center h-full">
            <img src={src} alt={`Slide ${index + 1}`} className="max-h-full object-contain"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
