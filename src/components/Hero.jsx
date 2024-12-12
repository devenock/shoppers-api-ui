import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-[#023047] text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Powerful E-Commerce API
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Build robust and scalable e-commerce solutions with our flexible API,
          available in Express.js, NestJS, and Go.
        </p>
        <Link
          to="/docs"
          className="bg-white text-[#023047] font-bold py-2 px-6 rounded-lg text-lg hover:bg-blue-100 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
