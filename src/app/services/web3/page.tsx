"use client";

import React from "react";
import { web3Services } from "@/lib/expandedServices/web3";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MotionServiceCard from "@/components/MotionServiceCard";

export default function Web3ServicesPage() {
  const filteredServices = web3Services.filter(
    (service) => service.slug !== "smart-contract-auditing"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#0c0f14] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Web3 & Decentralized Trust</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore futuristic services powering the decentralized world. Secure, scale, and govern your Web3 systems.
        </p>
      </div>

      <Slider {...settings}>
        {filteredServices.map((service, index) => (
          <MotionServiceCard key={index} service={service} index={index} />
        ))}
      </Slider>

      <footer className="mt-24 border-t border-zinc-700 pt-10 text-center text-zinc-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Freelancers Palace. All rights reserved.</p>
        <p className="mt-2">
          Built for the decentralized future with ❤️ and smart contracts.
        </p>
      </footer>
    </div>
  );
}

