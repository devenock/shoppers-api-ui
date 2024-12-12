import React from "react";

export default function Navbar({ selectedVersion, setSelectedVersion }) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="logo" className="h-12 w-12" />
        </div>
        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="express">Express.js</option>
          <option value="nestjs">NestJS</option>
          <option value="go">Go</option>
        </select>
      </div>
    </nav>
  );
}
