import React from "react";

const ExpressDocs = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Express.js API Documentation</h2>
      <p>Welcome to the Express.js documentation page!</p>
      <ul>
        <li>GET /api/v1/products</li>
        <li>POST /api/v1/auth/login</li>
      </ul>
    </div>
  );
};

export default ExpressDocs;
