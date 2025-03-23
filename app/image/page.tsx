"use client";

import ImageCarousel from "../component/carousel";
import ImageWithBack from "../component/imageback";

export default function ImagePage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <ImageWithBack></ImageWithBack>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageCarousel></ImageCarousel>
      </div>
    </div>
  );
}
