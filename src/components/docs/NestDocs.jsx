import React from "react";

const NestDocs = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">NestJS API Documentation</h2>
      <p>Welcome to the NestJS documentation page!</p>
      <ul>
        <li>GET /api/v1/users</li>
        <li>POST /api/v1/auth/register</li>
      </ul>
    </div>
  );
};

export default NestDocs;
