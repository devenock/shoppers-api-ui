import React from "react";

export default function VersionDetails({ selectedVersion }) {
  const versions = {
    express: {
      title: "Express.js Version",
      description:
        "A lightweight and flexible Node.js web application framework",
      features: [
        "Fast and minimalist web framework for Node.js",
        "Easy to set up and customize",
        "Large ecosystem of middleware",
        "Great for building RESTful APIs",
        "Excellent performance and low overhead",
      ],
    },
    nestjs: {
      title: "NestJS Version",
      description:
        "A progressive Node.js framework for building efficient and scalable server-side applications",
      features: [
        "Built with TypeScript",
        "Modular architecture",
        "Dependency injection",
        "Easy integration with other libraries",
        "Support for microservices",
      ],
    },
    go: {
      title: "Go Version",
      description:
        "A statically typed, compiled language for building simple, reliable, and efficient software",
      features: [
        "High performance and low latency",
        "Strong typing and memory safety",
        "Built-in concurrency",
        "Fast compilation and deployment",
        "Excellent for building microservices",
      ],
    },
  };

  const currentVersion = versions[selectedVersion];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">API Versions</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">
              {currentVersion.title}
            </h3>
            <p className="text-gray-600 mb-4">{currentVersion.description}</p>
            <ul className="list-disc pl-5 space-y-2">
              {currentVersion.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
