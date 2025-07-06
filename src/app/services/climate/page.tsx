

"use client";

import React from "react";
import { climateServices } from "@/lib/expandedServices/climate";
import MotionServiceCard from "@/components/MotionServiceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClimateServicesPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#0c0f14] text-white py-16 px-6 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Climate & Carbon Services</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore our climate-forward offerings for carbon accounting, project development, MRV, ESG disclosures, and clean energy transition.
        </p>
      </div>

      <Slider {...settings}>
        {climateServices.map((service, index) => (
          <MotionServiceCard key={index} service={service} index={index} />
        ))}
      </Slider>

      <footer className="mt-24 border-t border-zinc-700 pt-10 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Freelancers Palace | Climate & Carbon Division</p>
        <p className="mt-1">Powered by FLR Trust Labs – Building a regenerative web economy</p>
      </footer>
    </div>
  );
}
