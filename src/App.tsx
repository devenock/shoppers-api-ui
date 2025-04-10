// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import ApiDocumentation from "./components/ApiDocumentation";
// import ApiSandbox from "./components/ApiSandbox";
// import Header from "./components/Header";
// import "./App.css";
//
// // Page transition wrapper component
// const PageTransition = ({ children }: { children: React.ReactNode }) => {
//   return <div className="page-container">{children}</div>;
// };
//
// // API documentation structure
// const apiVersions = [
//   {
//     id: "v1.0",
//     name: "Version 1.0",
//     description: "Stable API release with core functionality",
//     baseUrl: "https://api.example.com/v1",
//   },
//   {
//     id: "v1.1",
//     name: "Version 1.1",
//     description: "Includes enhanced ordering and inventory features",
//     baseUrl: "https://api.example.com/v1.1",
//   },
//   {
//     id: "v2.0-beta",
//     name: "Version 2.0 (Beta)",
//     description: "Preview of next-gen API with GraphQL support",
//     baseUrl: "https://api.example.com/v2",
//   },
//   {
//     id: "golang",
//     name: "Golang Implementation",
//     description: "RESTful ecommerce API built with Go",
//     baseUrl: "https://api.example.com/golang/v1",
//   },
//   {
//     id: "nodejs",
//     name: "Node.js Implementation",
//     description: "RESTful ecommerce API built with Express.js",
//     baseUrl: "https://api.example.com/nodejs/v1",
//   },
//   {
//     id: "nestjs",
//     name: "NestJS Implementation",
//     description: "RESTful ecommerce API built with NestJS framework",
//     baseUrl: "https://api.example.com/nestjs/v1",
//   },
// ];
//
// // Define the API endpoints for documentation
// const apiEndpoints = [
//   {
//     id: "products",
//     name: "Products",
//     description: "Manage product catalog",
//     endpoints: [
//       // Product endpoints here (same as before)
//     ],
//   },
//   {
//     id: "orders",
//     name: "Orders",
//     description: "Manage customer orders",
//     endpoints: [
//       // Order endpoints here (same as before)
//     ],
//   },
//   {
//     id: "customers",
//     name: "Customers",
//     description: "Manage customer accounts",
//     endpoints: [
//       // Customer endpoints here (same as before)
//     ],
//   },
// ];
//
// function App() {
//   const [selectedVersion, setSelectedVersion] = useState(apiVersions[0]);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [language, setLanguage] = useState("en");
//
//   // Check if user preferred dark mode
//   useEffect(() => {
//     const prefersDarkMode = window.matchMedia(
//       "(prefers-color-scheme: dark)",
//     ).matches;
//     setIsDarkMode(prefersDarkMode);
//
//     // Load preferences from localStorage if available
//     const savedMode = localStorage.getItem("darkMode");
//     if (savedMode) {
//       setIsDarkMode(savedMode === "true");
//     }
//
//     const savedLanguage = localStorage.getItem("language");
//     if (savedLanguage) {
//       setLanguage(savedLanguage);
//     }
//
//     const savedVersion = localStorage.getItem("apiVersion");
//     if (savedVersion) {
//       const version = apiVersions.find((v) => v.id === savedVersion);
//       if (version) {
//         setSelectedVersion(version);
//       }
//     }
//   }, []);
//
//   // Save preferences when they change
//   useEffect(() => {
//     localStorage.setItem("darkMode", isDarkMode.toString());
//     document.body.classList.toggle("dark-mode", isDarkMode);
//   }, [isDarkMode]);
//
//   useEffect(() => {
//     localStorage.setItem("language", language);
//   }, [language]);
//
//   useEffect(() => {
//     localStorage.setItem("apiVersion", selectedVersion.id);
//   }, [selectedVersion]);
//
//   const toggleDarkMode = () => {
//     setIsDarkMode((prev) => !prev);
//   };
//
//   const handleVersionChange = (version: any) => {
//     setSelectedVersion(version);
//   };
//
//   return (
//     <Router>
//       <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
//         <Header
//           apiVersions={apiVersions}
//           selectedVersion={selectedVersion}
//           onVersionChange={handleVersionChange}
//           isDarkMode={isDarkMode}
//           toggleDarkMode={toggleDarkMode}
//           language={language}
//           setLanguage={setLanguage}
//         />
//
//         <main className="content">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <PageTransition>
//                   <Home
//                     apiVersions={apiVersions}
//                     selectedVersion={selectedVersion}
//                     isDarkMode={isDarkMode}
//                   />
//                 </PageTransition>
//               }
//             />
//             <Route
//               path="/docs"
//               element={
//                 <PageTransition>
//                   <ApiDocumentation
//                     apiVersion={selectedVersion}
//                     apiEndpoints={apiEndpoints}
//                     isDarkMode={isDarkMode}
//                   />
//                 </PageTransition>
//               }
//             />
//             <Route
//               path="/docs/:section"
//               element={
//                 <PageTransition>
//                   <ApiDocumentation
//                     apiVersion={selectedVersion}
//                     apiEndpoints={apiEndpoints}
//                     isDarkMode={isDarkMode}
//                   />
//                 </PageTransition>
//               }
//             />
//             <Route
//               path="/sandbox"
//               element={
//                 <PageTransition>
//                   <ApiSandbox
//                     apiVersion={selectedVersion}
//                     apiEndpoints={apiEndpoints}
//                     isDarkMode={isDarkMode}
//                   />
//                 </PageTransition>
//               }
//             />
//             <Route
//               path="/sandbox/:section"
//               element={
//                 <PageTransition>
//                   <ApiSandbox
//                     apiVersion={selectedVersion}
//                     apiEndpoints={apiEndpoints}
//                     isDarkMode={isDarkMode}
//                   />
//                 </PageTransition>
//               }
//             />
//           </Routes>
//         </main>
//
//         <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>
//           <div className="footer-content">
//             <div className="footer-logo">
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="logo-svg"
//               >
//                 <path
//                   d="M12 2L2 7L12 12L22 7L12 2Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M2 17L12 22L22 17"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M2 12L12 17L22 12"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span>eCommerce API</span>
//             </div>
//             <div className="footer-links">
//               <div className="footer-links-section">
//                 <h4>Documentation</h4>
//                 <ul>
//                   <li>
//                     <a href="/docs/products">Products API</a>
//                   </li>
//                   <li>
//                     <a href="/docs/orders">Orders API</a>
//                   </li>
//                   <li>
//                     <a href="/docs/customers">Customers API</a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="footer-links-section">
//                 <h4>Resources</h4>
//                 <ul>
//                   <li>
//                     <a href="/sandbox">API Sandbox</a>
//                   </li>
//                   <li>
//                     <a href="#0">Change Log</a>
//                   </li>
//                   <li>
//                     <a href="#0">API Status</a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="footer-links-section">
//                 <h4>Support</h4>
//                 <ul>
//                   <li>
//                     <a href="#0">Help Center</a>
//                   </li>
//                   <li>
//                     <a href="#0">Contact Us</a>
//                   </li>
//                   <li>
//                     <a href="#0">Community</a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p>
//               © {new Date().getFullYear()} eCommerce API Documentation. All
//               rights reserved.
//             </p>
//           </div>
//         </footer>
//       </div>
//     </Router>
//   );
// }
//
// export default App;

// App.tsx - Updated with full sample data
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ApiDocumentation from "./components/ApiDocumentation";
import ApiSandbox from "./components/ApiSandbox";
import Header from "./components/Header";
import "./App.css";

// Page transition wrapper component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return <div className="page-container">{children}</div>;
};

// API documentation structure
const apiVersions = [
  {
    id: "v1.0",
    name: "Version 1.0",
    description: "Stable API release with core functionality",
    baseUrl: "https://api.example.com/v1",
  },
  {
    id: "v1.1",
    name: "Version 1.1",
    description: "Includes enhanced ordering and inventory features",
    baseUrl: "https://api.example.com/v1.1",
  },
  {
    id: "v2.0-beta",
    name: "Version 2.0 (Beta)",
    description: "Preview of next-gen API with GraphQL support",
    baseUrl: "https://api.example.com/v2",
  },
  {
    id: "golang",
    name: "Golang Implementation",
    description: "RESTful ecommerce API built with Go",
    baseUrl: "https://api.example.com/golang/v1",
  },
  {
    id: "nodejs",
    name: "Node.js Implementation",
    description: "RESTful ecommerce API built with Express.js",
    baseUrl: "https://api.example.com/nodejs/v1",
  },
  {
    id: "nestjs",
    name: "NestJS Implementation",
    description: "RESTful ecommerce API built with NestJS framework",
    baseUrl: "https://api.example.com/nestjs/v1",
  },
];

// Define the API endpoints for documentation - FULL SAMPLE DATA
const apiEndpoints = [
  {
    id: "products",
    name: "Products",
    description: "Manage product catalog",
    endpoints: [
      {
        method: "GET",
        path: "/products",
        description: "Get all products",
        parameters: [
          {
            name: "page",
            type: "query",
            dataType: "number",
            description: "Page number",
            required: false,
          },
          {
            name: "limit",
            type: "query",
            dataType: "number",
            description: "Number of items per page",
            required: false,
          },
          {
            name: "category",
            type: "query",
            dataType: "string",
            description: "Filter by category",
            required: false,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "data": [ { "id": "1", "name": "Product 1", "price": 99.99, "category": "electronics" } ], "pagination": { "page": 1, "limit": 10, "total": 100 } }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid query parameters" }',
          },
        ],
      },
      {
        method: "GET",
        path: "/products/:id",
        description: "Get a product by ID",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Product ID",
            required: true,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "1", "name": "Product 1", "price": 99.99, "category": "electronics" }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Product not found" }',
          },
        ],
      },
      {
        method: "POST",
        path: "/products",
        description: "Create a new product",
        parameters: [
          {
            name: "name",
            type: "body",
            dataType: "string",
            description: "Product name",
            required: true,
          },
          {
            name: "price",
            type: "body",
            dataType: "number",
            description: "Product price",
            required: true,
          },
          {
            name: "category",
            type: "body",
            dataType: "string",
            description: "Product category",
            required: true,
          },
          {
            name: "description",
            type: "body",
            dataType: "string",
            description: "Product description",
            required: false,
          },
        ],
        requestBodyExample:
          '{ "name": "New Product", "price": 129.99, "category": "electronics", "description": "A brand new product" }',
        responses: [
          {
            status: 201,
            description: "Created",
            example:
              '{ "id": "123", "name": "New Product", "price": 129.99, "category": "electronics", "description": "A brand new product" }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid product data" }',
          },
        ],
      },
      {
        method: "PUT",
        path: "/products/:id",
        description: "Update a product",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Product ID",
            required: true,
          },
          {
            name: "name",
            type: "body",
            dataType: "string",
            description: "Product name",
            required: false,
          },
          {
            name: "price",
            type: "body",
            dataType: "number",
            description: "Product price",
            required: false,
          },
          {
            name: "category",
            type: "body",
            dataType: "string",
            description: "Product category",
            required: false,
          },
          {
            name: "description",
            type: "body",
            dataType: "string",
            description: "Product description",
            required: false,
          },
        ],
        requestBodyExample: '{ "name": "Updated Product", "price": 149.99 }',
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "123", "name": "Updated Product", "price": 149.99, "category": "electronics", "description": "A brand new product" }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Product not found" }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid product data" }',
          },
        ],
      },
      {
        method: "DELETE",
        path: "/products/:id",
        description: "Delete a product",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Product ID",
            required: true,
          },
        ],
        responses: [
          { status: 204, description: "No Content", example: "" },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Product not found" }',
          },
        ],
      },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    description: "Manage customer orders",
    endpoints: [
      {
        method: "GET",
        path: "/orders",
        description: "Get all orders",
        parameters: [
          {
            name: "page",
            type: "query",
            dataType: "number",
            description: "Page number",
            required: false,
          },
          {
            name: "limit",
            type: "query",
            dataType: "number",
            description: "Number of items per page",
            required: false,
          },
          {
            name: "status",
            type: "query",
            dataType: "string",
            description: "Filter by status",
            required: false,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "data": [ { "id": "1", "customer_id": "c123", "items": [{"product_id": "p1", "quantity": 2, "price": 99.99}, {"product_id": "p2", "quantity": 1, "price": 49.99}], "total": 249.97, "status": "processing" } ], "pagination": { "page": 1, "limit": 10, "total": 50 } }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid query parameters" }',
          },
        ],
      },
      {
        method: "GET",
        path: "/orders/:id",
        description: "Get an order by ID",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Order ID",
            required: true,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "1", "customer_id": "c123", "items": [ { "product_id": "p1", "quantity": 2, "price": 99.99 } ], "total": 199.98, "status": "processing" }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Order not found" }',
          },
        ],
      },
      {
        method: "POST",
        path: "/orders",
        description: "Create a new order",
        parameters: [
          {
            name: "customer_id",
            type: "body",
            dataType: "string",
            description: "Customer ID",
            required: true,
          },
          {
            name: "items",
            type: "body",
            dataType: "array",
            description: "Order items",
            required: true,
          },
        ],
        requestBodyExample:
          '{ "customer_id": "c123", "items": [ { "product_id": "p1", "quantity": 2 } ] }',
        responses: [
          {
            status: 201,
            description: "Created",
            example:
              '{ "id": "o1", "customer_id": "c123", "items": [ { "product_id": "p1", "quantity": 2, "price": 99.99 } ], "total": 199.98, "status": "pending" }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid order data" }',
          },
        ],
      },
      {
        method: "PUT",
        path: "/orders/:id/status",
        description: "Update order status",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Order ID",
            required: true,
          },
          {
            name: "status",
            type: "body",
            dataType: "string",
            description: "New order status",
            required: true,
          },
        ],
        requestBodyExample: '{ "status": "shipped" }',
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "o1", "status": "shipped", "updated_at": "2023-09-15T14:30:00Z" }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Order not found" }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid status" }',
          },
        ],
      },
      {
        method: "DELETE",
        path: "/orders/:id",
        description: "Cancel an order",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Order ID",
            required: true,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "o1", "status": "cancelled", "updated_at": "2023-09-15T15:45:00Z" }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Order not found" }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Order cannot be cancelled" }',
          },
        ],
      },
    ],
  },
  {
    id: "customers",
    name: "Customers",
    description: "Manage customer accounts",
    endpoints: [
      {
        method: "GET",
        path: "/customers",
        description: "Get all customers",
        parameters: [
          {
            name: "page",
            type: "query",
            dataType: "number",
            description: "Page number",
            required: false,
          },
          {
            name: "limit",
            type: "query",
            dataType: "number",
            description: "Number of items per page",
            required: false,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "data": [ { "id": "c1", "name": "John Doe", "email": "john@example.com" } ], "pagination": { "page": 1, "limit": 10, "total": 50 } }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid query parameters" }',
          },
        ],
      },
      {
        method: "GET",
        path: "/customers/:id",
        description: "Get a customer by ID",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Customer ID",
            required: true,
          },
        ],
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "c1", "name": "John Doe", "email": "john@example.com", "address": { "street": "123 Main St", "city": "Anytown", "zip": "12345" } }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Customer not found" }',
          },
        ],
      },
      {
        method: "POST",
        path: "/customers",
        description: "Create a new customer",
        parameters: [
          {
            name: "name",
            type: "body",
            dataType: "string",
            description: "Customer name",
            required: true,
          },
          {
            name: "email",
            type: "body",
            dataType: "string",
            description: "Customer email",
            required: true,
          },
          {
            name: "password",
            type: "body",
            dataType: "string",
            description: "Customer password",
            required: true,
          },
          {
            name: "address",
            type: "body",
            dataType: "object",
            description: "Customer address",
            required: false,
          },
        ],
        requestBodyExample:
          '{ "name": "Jane Smith", "email": "jane@example.com", "password": "secure123", "address": { "street": "456 Oak Ave", "city": "Somewhere", "zip": "67890" } }',
        responses: [
          {
            status: 201,
            description: "Created",
            example:
              '{ "id": "c2", "name": "Jane Smith", "email": "jane@example.com", "address": { "street": "456 Oak Ave", "city": "Somewhere", "zip": "67890" } }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid customer data" }',
          },
          {
            status: 409,
            description: "Conflict",
            example: '{ "error": "Email already in use" }',
          },
        ],
      },
      {
        method: "PUT",
        path: "/customers/:id",
        description: "Update a customer",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Customer ID",
            required: true,
          },
          {
            name: "name",
            type: "body",
            dataType: "string",
            description: "Customer name",
            required: false,
          },
          {
            name: "email",
            type: "body",
            dataType: "string",
            description: "Customer email",
            required: false,
          },
          {
            name: "address",
            type: "body",
            dataType: "object",
            description: "Customer address",
            required: false,
          },
        ],
        requestBodyExample:
          '{ "name": "Jane Brown", "address": { "street": "789 Pine Ln", "city": "Elsewhere", "zip": "54321" } }',
        responses: [
          {
            status: 200,
            description: "Success",
            example:
              '{ "id": "c2", "name": "Jane Brown", "email": "jane@example.com", "address": { "street": "789 Pine Ln", "city": "Elsewhere", "zip": "54321" } }',
          },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Customer not found" }',
          },
          {
            status: 400,
            description: "Bad Request",
            example: '{ "error": "Invalid customer data" }',
          },
        ],
      },
      {
        method: "DELETE",
        path: "/customers/:id",
        description: "Delete a customer",
        parameters: [
          {
            name: "id",
            type: "path",
            dataType: "string",
            description: "Customer ID",
            required: true,
          },
        ],
        responses: [
          { status: 204, description: "No Content", example: "" },
          {
            status: 404,
            description: "Not Found",
            example: '{ "error": "Customer not found" }',
          },
        ],
      },
    ],
  },
];

function App() {
  const [selectedVersion, setSelectedVersion] = useState(apiVersions[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  // Check if user preferred dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDarkMode);

    // Load preferences from localStorage if available
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedVersion = localStorage.getItem("apiVersion");
    if (savedVersion) {
      const version = apiVersions.find((v) => v.id === savedVersion);
      if (version) {
        setSelectedVersion(version);
      }
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("apiVersion", selectedVersion.id);
  }, [selectedVersion]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleVersionChange = (version: any) => {
    setSelectedVersion(version);
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        <Header
          apiVersions={apiVersions}
          selectedVersion={selectedVersion}
          onVersionChange={handleVersionChange}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          language={language}
          setLanguage={setLanguage}
        />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home
                    apiVersions={apiVersions}
                    selectedVersion={selectedVersion}
                    isDarkMode={isDarkMode}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/docs"
              element={
                <PageTransition>
                  <ApiDocumentation
                    apiVersion={selectedVersion}
                    apiEndpoints={apiEndpoints}
                    isDarkMode={isDarkMode}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/docs/:section"
              element={
                <PageTransition>
                  <ApiDocumentation
                    apiVersion={selectedVersion}
                    apiEndpoints={apiEndpoints}
                    isDarkMode={isDarkMode}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/sandbox"
              element={
                <PageTransition>
                  <ApiSandbox
                    apiVersion={selectedVersion}
                    apiEndpoints={apiEndpoints}
                    isDarkMode={isDarkMode}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/sandbox/:section"
              element={
                <PageTransition>
                  <ApiSandbox
                    apiVersion={selectedVersion}
                    apiEndpoints={apiEndpoints}
                    isDarkMode={isDarkMode}
                  />
                </PageTransition>
              }
            />
          </Routes>
        </main>

        <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>
          <div className="footer-content">
            <div className="footer-logo">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>eCommerce API</span>
            </div>
            <div className="footer-links">
              <div className="footer-links-section">
                <h4>Documentation</h4>
                <ul>
                  <li>
                    <a href="/docs/products">Products API</a>
                  </li>
                  <li>
                    <a href="/docs/orders">Orders API</a>
                  </li>
                  <li>
                    <a href="/docs/customers">Customers API</a>
                  </li>
                </ul>
              </div>
              <div className="footer-links-section">
                <h4>Resources</h4>
                <ul>
                  <li>
                    <a href="/sandbox">API Sandbox</a>
                  </li>
                  <li>
                    <a href="#0">Change Log</a>
                  </li>
                  <li>
                    <a href="#0">API Status</a>
                  </li>
                </ul>
              </div>
              <div className="footer-links-section">
                <h4>Support</h4>
                <ul>
                  <li>
                    <a href="#0">Help Center</a>
                  </li>
                  <li>
                    <a href="#0">Contact Us</a>
                  </li>
                  <li>
                    <a href="#0">Community</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} eCommerce API Documentation. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
