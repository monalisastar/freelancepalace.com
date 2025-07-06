"use client";

import React from "react";
import { aiServices } from "@/lib/expandedServices/ai";
import MotionServiceCard from "@/components/MotionServiceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AIServicesPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#0c0f14] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AI & Data Services</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore advanced AI solutions for your data workflows, model ops, and intelligent automation.
        </p>
      </div>

      <Slider {...settings}>
        {aiServices.map((service, index) => (
          <MotionServiceCard key={index} service={service} index={index} />
        ))}
      </Slider>
    </div>
  );
}


