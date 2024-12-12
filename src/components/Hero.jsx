import React from "react";

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Powerful E-Commerce API
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Build robust and scalable e-commerce solutions with our flexible API,
          available in Express.js, NestJS, and Go.
        </p>
        <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg text-lg hover:bg-blue-100 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
