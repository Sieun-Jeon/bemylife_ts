"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ImageCarousel = () => {
  const images = [
    "../image/1.jpg", "/image/2.jpg",
     "/image/3.jpg", "/image/4.jpg",
     "/image/5.jpg", "/image/6.jpg", "/image/7.jpg", "/image/8.jpg",
    //  "/image/9.jpg", "/image/10.jpg", "/image/11.jpg", "/image/12.jpg",
    //  "/image/13.jpg", "/image/14.jpg", "/image/15.jpg", "/image/16.jpg",
    //  "/image/17.jpg", "/image/18.jpg", "/image/19.jpg", "/image/20.jpg", "/image/21.jpg"
  ];

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
