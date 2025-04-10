// import React, { useState, useRef, useEffect } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { JSONTree } from "react-json-tree";
//
// interface Parameter {
//   name: string;
//   type: string;
//   dataType: string;
//   description: string;
//   required: boolean;
// }
//
// interface Response {
//   status: number;
//   description: string;
//   example: string;
// }
//
// interface Endpoint {
//   method: string;
//   path: string;
//   description: string;
//   parameters: Parameter[];
//   requestBodyExample?: string;
//   responses: Response[];
// }
//
// interface ApiSection {
//   id: string;
//   name: string;
//   description: string;
//   endpoints: Endpoint[];
// }
//
// interface ApiVersion {
//   id: string;
//   name: string;
//   description: string;
//   baseUrl: string;
// }
//
// interface ApiSandboxProps {
//   apiVersion: ApiVersion;
//   apiEndpoints: ApiSection[];
// }
//
// // SVG Icons for UI enhancement
// const Icons = {
//   Send: () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//       />
//     </svg>
//   ),
//   Format: () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M4 6h16M4 12h16m-7 6h7"
//       />
//     </svg>
//   ),
//   Copy: () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//       />
//     </svg>
//   ),
//   Clear: () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//       />
//     </svg>
//   ),
//   ApiIcon: () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="60"
//       height="60"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="#d1d5db"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={1}
//         d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
//       />
//     </svg>
//   ),
// };
//
// // Mock API response function with improved delay simulation
// const mockApiResponse = (
//   endpoint: Endpoint,
//   paramValues: Record<string, any>,
// ): Promise<{ status: number; data: any }> => {
//   return new Promise((resolve) => {
//     // Randomize delay a bit for more realistic feel (300-1200ms)
//     const delay = Math.floor(Math.random() * 900) + 300;
//
//     // Determine if this should randomly fail (10% chance for demo purposes)
//     const shouldFail = Math.random() < 0.1;
//
//     setTimeout(() => {
//       if (shouldFail && endpoint.method !== "GET") {
//         // Simulate a 400 or 500 error occasionally
//         const errorStatus = Math.random() < 0.5 ? 400 : 500;
//         const errorResponse = endpoint.responses.find(
//           (r) => r.status === errorStatus,
//         );
//
//         if (errorResponse && errorResponse.example) {
//           try {
//             resolve({
//               status: errorStatus,
//               data: JSON.parse(errorResponse.example),
//             });
//           } catch (e) {
//             resolve({
//               status: errorStatus,
//               data: {
//                 error: "An error occurred",
//                 message: errorResponse.example,
//               },
//             });
//           }
//         } else {
//           resolve({
//             status: errorStatus,
//             data: {
//               error: errorStatus === 400 ? "Bad Request" : "Server Error",
//               message:
//                 errorStatus === 400
//                   ? "Invalid request parameters"
//                   : "An unexpected error occurred",
//             },
//           });
//         }
//         return;
//       }
//
//       // Find the success response example
//       const successResponse = endpoint.responses.find(
//         (r) => r.status >= 200 && r.status < 300,
//       );
//
//       if (successResponse && successResponse.example) {
//         try {
//           // Try to parse the example as JSON
//           let exampleData = successResponse.example.trim()
//             ? JSON.parse(successResponse.example)
//             : null;
//
//           // For GET requests of specific items, customize the response with the ID if available
//           if (
//             endpoint.method === "GET" &&
//             endpoint.path.includes(":id") &&
//             paramValues.id
//           ) {
//             if (exampleData && typeof exampleData === "object") {
//               exampleData.id = paramValues.id;
//             }
//           }
//
//           resolve({ status: successResponse.status, data: exampleData });
//         } catch (e) {
//           // If parsing fails, return the example as a string
//           resolve({
//             status: successResponse.status,
//             data: successResponse.example,
//           });
//         }
//       } else {
//         // Default success response if no example is provided
//         resolve({ status: 200, data: { message: "Success" } });
//       }
//     }, delay);
//   });
// };
//
// // Helper to create an initial parameter values object
// const createInitialValues = (endpoint: Endpoint): Record<string, any> => {
//   const initialValues: Record<string, any> = {};
//
//   endpoint.parameters.forEach((param) => {
//     if (param.type === "body" && endpoint.requestBodyExample) {
//       try {
//         // If there's a request body example, use it to populate initial values
//         const exampleData = JSON.parse(endpoint.requestBodyExample);
//         Object.keys(exampleData).forEach((key) => {
//           initialValues[key] = exampleData[key];
//         });
//       } catch (e) {
//         // If parsing fails, set individual parameters
//         initialValues[param.name] = getDefaultValueForType(param.dataType);
//       }
//     } else {
//       initialValues[param.name] = getDefaultValueForType(param.dataType);
//     }
//   });
//
//   return initialValues;
// };
//
// // Helper to generate default values based on data type
// const getDefaultValueForType = (dataType: string): any => {
//   switch (dataType) {
//     case "string":
//       return "";
//     case "number":
//       return 0;
//     case "boolean":
//       return false;
//     case "array":
//       return [];
//     case "object":
//       return {};
//     default:
//       return "";
//   }
// };
//
// // Helper to replace path parameters in the URL
// const replacePath = (path: string, values: Record<string, any>): string => {
//   let result = path;
//   // Replace path parameters with their values
//   Object.keys(values).forEach((key) => {
//     result = result.replace(`:${key}`, values[key]);
//   });
//   return result;
// };
//
// // Helper component for response status
// const StatusIndicator: React.FC<{ status: number }> = ({ status }) => {
//   const statusClass =
//     status >= 200 && status < 300
//       ? "status-2xx"
//       : status >= 300 && status < 400
//         ? "status-3xx"
//         : status >= 400 && status < 500
//           ? "status-4xx"
//           : "status-5xx";
//
//   return (
//     <span className={statusClass}>
//       <span className="status-dot"></span>
//       {status}
//       {status >= 200 && status < 300
//         ? "Success"
//         : status >= 300 && status < 400
//           ? "Redirect"
//           : status >= 400 && status < 500
//             ? "Client Error"
//             : "Server Error"}
//     </span>
//   );
// };
//
// type TabType = "params" | "body" | "headers" | "response";
//
// const ApiSandbox: React.FC<ApiSandboxProps> = ({
//   apiVersion,
//   apiEndpoints,
// }) => {
//   const [selectedSection, setSelectedSection] = useState<string>(
//     apiEndpoints[0]?.id || "",
//   );
//   const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
//   const [paramValues, setParamValues] = useState<Record<string, any>>({});
//   const [requestBody, setRequestBody] = useState<string>("");
//   const [response, setResponse] = useState<{
//     status: number;
//     data: any;
//   } | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [showResponse, setShowResponse] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState<TabType>("params");
//   const editorRef = useRef<HTMLTextAreaElement>(null);
//   const [copySuccess, setCopySuccess] = useState<string>("");
//
//   // Get the current section and endpoint
//   const currentSection = apiEndpoints.find(
//     (section) => section.id === selectedSection,
//   );
//   const currentEndpoint = currentSection?.endpoints[selectedEndpoint];
//
//   // When section or endpoint changes, reset the form
//   useEffect(() => {
//     if (currentEndpoint) {
//       // Set appropriate default tab based on endpoint method
//       if (["POST", "PUT", "PATCH"].includes(currentEndpoint.method)) {
//         setActiveTab("body");
//       } else {
//         setActiveTab("params");
//       }
//     }
//   }, [currentEndpoint]);
//
//   const handleEndpointChange = (sectionId: string, endpointIndex: number) => {
//     setSelectedSection(sectionId);
//     setSelectedEndpoint(endpointIndex);
//     setResponse(null);
//     setShowResponse(false);
//
//     const section = apiEndpoints.find((s) => s.id === sectionId);
//     const endpoint = section?.endpoints[endpointIndex];
//
//     if (endpoint) {
//       const initialValues = createInitialValues(endpoint);
//       setParamValues(initialValues);
//
//       if (endpoint.requestBodyExample) {
//         setRequestBody(endpoint.requestBodyExample);
//       } else {
//         setRequestBody("");
//       }
//     }
//   };
//
//   // Handle parameter value changes
//   const handleParamChange = (name: string, value: any) => {
//     setParamValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//
//   // Handle request body changes
//   const handleRequestBodyChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement>,
//   ) => {
//     setRequestBody(e.target.value);
//   };
//
//   // Format the JSON in the editor
//   const formatJson = () => {
//     try {
//       const parsed = JSON.parse(requestBody);
//       const formatted = JSON.stringify(parsed, null, 2);
//       setRequestBody(formatted);
//     } catch (e) {
//       // If not valid JSON, leave as is
//       alert("Invalid JSON format. Please check your syntax.");
//     }
//   };
//
//   // Copy request or response to clipboard
//   const copyToClipboard = (text: string, type: "request" | "response") => {
//     navigator.clipboard.writeText(text).then(
//       () => {
//         setCopySuccess(
//           `${type === "request" ? "Request URL" : "Response"} copied!`,
//         );
//         setTimeout(() => setCopySuccess(""), 2000);
//       },
//       () => {
//         setCopySuccess("Failed to copy");
//         setTimeout(() => setCopySuccess(""), 2000);
//       },
//     );
//   };
//
//   // Clear the response
//   const clearResponse = () => {
//     setResponse(null);
//     setShowResponse(false);
//   };
//
//   // Execute the API request
//   const executeRequest = async () => {
//     if (!currentEndpoint) return;
//
//     setIsLoading(true);
//     setShowResponse(true);
//     setActiveTab("response");
//
//     try {
//       const result = await mockApiResponse(currentEndpoint, paramValues);
//       setResponse(result);
//     } catch (error) {
//       setResponse({
//         status: 500,
//         data: { error: "An error occurred while processing your request" },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   // Render request URL with query parameters
//   const renderRequestUrl = (): string => {
//     if (!currentEndpoint) return "";
//
//     let url = `${apiVersion.baseUrl}${replacePath(currentEndpoint.path, paramValues)}`;
//
//     // Add query parameters
//     const queryParams = currentEndpoint.parameters
//       .filter((param) => param.type === "query" && paramValues[param.name])
//       .map(
//         (param) =>
//           `${param.name}=${encodeURIComponent(paramValues[param.name])}`,
//       );
//
//     if (queryParams.length > 0) {
//       url += `?${queryParams.join("&")}`;
//     }
//
//     return url;
//   };
//
//   // Render request body (for POST, PUT, PATCH)
//   const renderRequestBody = (): Record<string, any> | null => {
//     if (!currentEndpoint) return null;
//     if (!["POST", "PUT", "PATCH"].includes(currentEndpoint.method)) return null;
//
//     try {
//       return requestBody ? JSON.parse(requestBody) : null;
//     } catch (e) {
//       return null;
//     }
//   };
//
//   // Animation style for the tab content
//   const getTabAnimation = () => {
//     return { animation: "fadeIn 0.3s ease-out" };
//   };
//
//   return (
//     <div className="api-sandbox">
//       <h2>API Sandbox</h2>
//       <p>Test the API endpoints directly in your browser with sample data</p>
//
//       <div className="sandbox-layout">
//         <div className="endpoint-selector">
//           <h3>Select Endpoint</h3>
//           <div className="endpoint-tree">
//             {apiEndpoints.map((section) => (
//               <div key={section.id} className="section-group">
//                 <h4>{section.name}</h4>
//                 <ul>
//                   {section.endpoints.map((endpoint, index) => (
//                     <li
//                       key={index}
//                       className={
//                         selectedSection === section.id &&
//                         selectedEndpoint === index
//                           ? "selected"
//                           : ""
//                       }
//                     >
//                       <a
//                         onClick={() => handleEndpointChange(section.id, index)}
//                       >
//                         <span
//                           className={`method method-${endpoint.method.toLowerCase()}`}
//                         >
//                           {endpoint.method}
//                         </span>
//                         <span className="path">{endpoint.path}</span>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//
//         <div className="request-builder">
//           {currentEndpoint ? (
//             <>
//               <div className="endpoint-info">
//                 <h3>
//                   <span
//                     className={`method method-${currentEndpoint.method.toLowerCase()}`}
//                   >
//                     {currentEndpoint.method}
//                   </span>
//                   {currentEndpoint.path}
//                 </h3>
//                 <p>{currentEndpoint.description}</p>
//               </div>
//
//               <div className="request-tabs">
//                 <button
//                   className={activeTab === "params" ? "active" : ""}
//                   onClick={() => setActiveTab("params")}
//                 >
//                   Parameters
//                 </button>
//                 {["POST", "PUT", "PATCH"].includes(currentEndpoint.method) && (
//                   <button
//                     className={activeTab === "body" ? "active" : ""}
//                     onClick={() => setActiveTab("body")}
//                   >
//                     Request Body
//                   </button>
//                 )}
//                 <button
//                   className={activeTab === "headers" ? "active" : ""}
//                   onClick={() => setActiveTab("headers")}
//                 >
//                   Headers
//                 </button>
//                 {showResponse && (
//                   <button
//                     className={activeTab === "response" ? "active" : ""}
//                     onClick={() => setActiveTab("response")}
//                   >
//                     Response
//                   </button>
//                 )}
//               </div>
//
//               <div className="request-content">
//                 {/* URL Display is always shown */}
//                 <div className="request-url">
//                   <div className="url-display">
//                     <strong>Request URL</strong>
//                     <div className="tooltip">
//                       {copySuccess && (
//                         <span className="tooltip-text">{copySuccess}</span>
//                       )}
//                       <code
//                         onClick={() =>
//                           copyToClipboard(renderRequestUrl(), "request")
//                         }
//                       >
//                         {renderRequestUrl()}
//                       </code>
//                     </div>
//                   </div>
//                 </div>
//
//                 {/* Parameters Tab */}
//                 {activeTab === "params" && (
//                   <div className="tab-content" style={getTabAnimation()}>
//                     <div className="request-params">
//                       <h4>Path & Query Parameters</h4>
//                       {currentEndpoint.parameters.filter(
//                         (param) =>
//                           param.type === "path" || param.type === "query",
//                       ).length > 0 ? (
//                         currentEndpoint.parameters
//                           .filter(
//                             (param) =>
//                               param.type === "path" || param.type === "query",
//                           )
//                           .map((param, index) => (
//                             <div key={index} className="param-field">
//                               <label>
//                                 {param.name}
//                                 {param.required && (
//                                   <span className="required">*</span>
//                                 )}
//                                 <span className="param-type">{param.type}</span>
//                               </label>
//                               <input
//                                 type={
//                                   param.dataType === "number"
//                                     ? "number"
//                                     : "text"
//                                 }
//                                 value={paramValues[param.name] || ""}
//                                 onChange={(e) =>
//                                   handleParamChange(
//                                     param.name,
//                                     param.dataType === "number"
//                                       ? Number(e.target.value)
//                                       : e.target.value,
//                                   )
//                                 }
//                                 placeholder={param.description}
//                               />
//                               <div className="param-description">
//                                 {param.description}
//                               </div>
//                             </div>
//                           ))
//                       ) : (
//                         <p>No parameters required for this endpoint</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//
//                 {/* Request Body Tab */}
//                 {activeTab === "body" &&
//                   ["POST", "PUT", "PATCH"].includes(currentEndpoint.method) && (
//                     <div className="tab-content" style={getTabAnimation()}>
//                       <div className="request-body">
//                         <h4>Request Body (JSON)</h4>
//                         <div className="editor-toolbar">
//                           <button onClick={formatJson}>
//                             <Icons.Format /> Format JSON
//                           </button>
//                           <button
//                             onClick={() =>
//                               setRequestBody(
//                                 currentEndpoint.requestBodyExample || "",
//                               )
//                             }
//                           >
//                             <Icons.Clear /> Reset
//                           </button>
//                         </div>
//                         <textarea
//                           ref={editorRef}
//                           className="json-editor"
//                           value={requestBody}
//                           onChange={handleRequestBodyChange}
//                           placeholder="Enter JSON request body"
//                           rows={10}
//                         />
//                       </div>
//                     </div>
//                   )}
//
//                 {/* Headers Tab */}
//                 {activeTab === "headers" && (
//                   <div className="tab-content" style={getTabAnimation()}>
//                     <div className="request-headers">
//                       <h4>Request Headers</h4>
//                       <div className="param-field">
//                         <label>
//                           Content-Type
//                           <span className="param-type">header</span>
//                         </label>
//                         <input type="text" value="application/json" disabled />
//                         <div className="param-description">
//                           The format of the request body
//                         </div>
//                       </div>
//                       <div className="param-field">
//                         <label>
//                           Accept
//                           <span className="param-type">header</span>
//                         </label>
//                         <input type="text" value="application/json" disabled />
//                         <div className="param-description">
//                           The preferred response format
//                         </div>
//                       </div>
//                       <div className="param-field">
//                         <label>
//                           Authorization
//                           <span className="param-type">header</span>
//                         </label>
//                         <input
//                           type="text"
//                           placeholder="Bearer token123"
//                           disabled
//                         />
//                         <div className="param-description">
//                           Authentication token (disabled in sandbox)
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//
//                 {/* Response Tab */}
//                 {activeTab === "response" && showResponse && (
//                   <div className="tab-content" style={getTabAnimation()}>
//                     <div className="response-section">
//                       <h4>Response</h4>
//                       {isLoading ? (
//                         <div className="loading">
//                           <div className="loading-spinner"></div>
//                           <p>Sending request...</p>
//                         </div>
//                       ) : response ? (
//                         <div className="response-content">
//                           <div className="response-status">
//                             <StatusIndicator status={response.status} />
//
//                             <div
//                               className="tooltip"
//                               style={{ marginLeft: "auto" }}
//                             >
//                               {copySuccess && (
//                                 <span className="tooltip-text">
//                                   {copySuccess}
//                                 </span>
//                               )}
//                               <button
//                                 className="secondary-button"
//                                 onClick={() =>
//                                   copyToClipboard(
//                                     JSON.stringify(response.data, null, 2),
//                                     "response",
//                                   )
//                                 }
//                                 style={{
//                                   padding: "0.25rem 0.5rem",
//                                   fontSize: "var(--font-size-xs)",
//                                 }}
//                               >
//                                 <Icons.Copy /> Copy
//                               </button>
//                             </div>
//                           </div>
//                           <div className="response-body">
//                             {typeof response.data === "object" ? (
//                               <JSONTree
//                                 data={response.data}
//                                 theme={{
//                                   scheme: "monokai",
//                                   base00: "#ffffff",
//                                   base01: "#f5f5f5",
//                                   base02: "#e5e7eb",
//                                   base03: "#6b7280",
//                                   base04: "#4b5563",
//                                   base05: "#374151",
//                                   base06: "#111827",
//                                   base07: "#000000",
//                                   base08: "#ef4444",
//                                   base09: "#f97316",
//                                   base0A: "#f59e0b",
//                                   base0B: "#10b981",
//                                   base0C: "#06b6d4",
//                                   base0D: "#3b82f6",
//                                   base0E: "#8b5cf6",
//                                   base0F: "#ec4899",
//                                 }}
//                                 invertTheme={false}
//                                 // Remove the shouldExpandNode prop that's causing the type error
//                               />
//                             ) : (
//                               <SyntaxHighlighter language="json" style={docco}>
//                                 {String(response.data)}
//                               </SyntaxHighlighter>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="no-response">
//                           Execute the request to see the response
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//
//               <div className="request-controls">
//                 {showResponse && (
//                   <button className="secondary-button" onClick={clearResponse}>
//                     <Icons.Clear /> Clear Response
//                   </button>
//                 )}
//                 <button
//                   className="execute-button"
//                   onClick={executeRequest}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>Sending...</>
//                   ) : (
//                     <>
//                       <Icons.Send /> Execute Request
//                     </>
//                   )}
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="no-endpoint-selected">
//               <Icons.ApiIcon />
//               <p>Select an endpoint from the list to get started</p>
//               <div className="hint">
//                 Choose an API endpoint from the left panel to test it in the
//                 sandbox. You can set parameters, customize the request body, and
//                 see the response.
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ApiSandbox;

// components/ApiSandbox.tsx
import React, { useState, useRef, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { JSONTree } from "react-json-tree";
import { useParams, useNavigate } from "react-router-dom";

interface Parameter {
  name: string;
  type: string;
  dataType: string;
  description: string;
  required: boolean;
}

interface Response {
  status: number;
  description: string;
  example: string;
}

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters: Parameter[];
  requestBodyExample?: string;
  responses: Response[];
}

interface ApiSection {
  id: string;
  name: string;
  description: string;
  endpoints: Endpoint[];
}

interface ApiVersion {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
}

interface ApiSandboxProps {
  apiVersion: ApiVersion;
  apiEndpoints: ApiSection[];
  isDarkMode?: boolean;
}

// SVG Icons for UI enhancement
const Icons = {
  Send: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  ),
  Format: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  ),
  Copy: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
  Clear: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  ApiIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#d1d5db"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  ),
};

// Mock API response function with improved delay simulation
const mockApiResponse = (
  endpoint: Endpoint,
  paramValues: Record<string, any>,
): Promise<{ status: number; data: any }> => {
  return new Promise((resolve) => {
    // Randomize delay a bit for more realistic feel (300-1200ms)
    const delay = Math.floor(Math.random() * 900) + 300;

    // Determine if this should randomly fail (10% chance for demo purposes)
    const shouldFail = Math.random() < 0.1;

    setTimeout(() => {
      if (shouldFail && endpoint.method !== "GET") {
        // Simulate a 400 or 500 error occasionally
        const errorStatus = Math.random() < 0.5 ? 400 : 500;
        const errorResponse = endpoint.responses.find(
          (r) => r.status === errorStatus,
        );

        if (errorResponse && errorResponse.example) {
          try {
            resolve({
              status: errorStatus,
              data: JSON.parse(errorResponse.example),
            });
          } catch (e) {
            resolve({
              status: errorStatus,
              data: {
                error: "An error occurred",
                message: errorResponse.example,
              },
            });
          }
        } else {
          resolve({
            status: errorStatus,
            data: {
              error: errorStatus === 400 ? "Bad Request" : "Server Error",
              message:
                errorStatus === 400
                  ? "Invalid request parameters"
                  : "An unexpected error occurred",
            },
          });
        }
        return;
      }

      // Find the success response example
      const successResponse = endpoint.responses.find(
        (r) => r.status >= 200 && r.status < 300,
      );

      if (successResponse && successResponse.example) {
        try {
          // Try to parse the example as JSON
          let exampleData = successResponse.example.trim()
            ? JSON.parse(successResponse.example)
            : null;

          // For GET requests of specific items, customize the response with the ID if available
          if (
            endpoint.method === "GET" &&
            endpoint.path.includes(":id") &&
            paramValues.id
          ) {
            if (exampleData && typeof exampleData === "object") {
              exampleData.id = paramValues.id;
            }
          }

          resolve({ status: successResponse.status, data: exampleData });
        } catch (e) {
          // If parsing fails, return the example as a string
          resolve({
            status: successResponse.status,
            data: successResponse.example,
          });
        }
      } else {
        // Default success response if no example is provided
        resolve({ status: 200, data: { message: "Success" } });
      }
    }, delay);
  });
};

// Helper to create an initial parameter values object
const createInitialValues = (endpoint: Endpoint): Record<string, any> => {
  const initialValues: Record<string, any> = {};

  endpoint.parameters.forEach((param) => {
    if (param.type === "body" && endpoint.requestBodyExample) {
      try {
        // If there's a request body example, use it to populate initial values
        const exampleData = JSON.parse(endpoint.requestBodyExample);
        Object.keys(exampleData).forEach((key) => {
          initialValues[key] = exampleData[key];
        });
      } catch (e) {
        // If parsing fails, set individual parameters
        initialValues[param.name] = getDefaultValueForType(param.dataType);
      }
    } else {
      initialValues[param.name] = getDefaultValueForType(param.dataType);
    }
  });

  return initialValues;
};

// Helper to generate default values based on data type
const getDefaultValueForType = (dataType: string): any => {
  switch (dataType) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return "";
  }
};

// Helper to replace path parameters in the URL
const replacePath = (path: string, values: Record<string, any>): string => {
  let result = path;
  // Replace path parameters with their values
  Object.keys(values).forEach((key) => {
    result = result.replace(`:${key}`, values[key]);
  });
  return result;
};

// Helper component for response status
const StatusIndicator: React.FC<{ status: number }> = ({ status }) => {
  const statusClass =
    status >= 200 && status < 300
      ? "status-2xx"
      : status >= 300 && status < 400
        ? "status-3xx"
        : status >= 400 && status < 500
          ? "status-4xx"
          : "status-5xx";

  return (
    <span className={statusClass}>
      <span className="status-dot"></span>
      {status}
      {status >= 200 && status < 300
        ? "Success"
        : status >= 300 && status < 400
          ? "Redirect"
          : status >= 400 && status < 500
            ? "Client Error"
            : "Server Error"}
    </span>
  );
};

type TabType = "params" | "body" | "headers" | "response";

const ApiSandbox: React.FC<ApiSandboxProps> = ({
  apiVersion,
  apiEndpoints,
  isDarkMode = false,
}) => {
  // Get section from URL params (if available)
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [requestBody, setRequestBody] = useState<string>("");
  const [response, setResponse] = useState<{
    status: number;
    data: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("params");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");

  // Set the active section based on URL param or default to first section
  useEffect(() => {
    if (section && apiEndpoints.some((s) => s.id === section)) {
      setActiveSection(section);
    } else if (apiEndpoints.length > 0) {
      setActiveSection(apiEndpoints[0].id);

      // If no section is specified in URL, navigate to the first section
      if (!section && apiEndpoints.length > 0) {
        navigate(`/sandbox/${apiEndpoints[0].id}`, { replace: true });
      }
    }
  }, [section, apiEndpoints, navigate]);

  // Get the current section and endpoint
  const currentSection = apiEndpoints.find(
    (section) => section.id === activeSection,
  );
  const currentEndpoint = currentSection?.endpoints[selectedEndpoint];

  // When section changes, reset to the first endpoint of that section
  useEffect(() => {
    setSelectedEndpoint(0);
    setResponse(null);
    setShowResponse(false);

    if (currentSection && currentSection.endpoints.length > 0) {
      const initialEndpoint = currentSection.endpoints[0];
      const initialValues = createInitialValues(initialEndpoint);
      setParamValues(initialValues);

      if (initialEndpoint.requestBodyExample) {
        setRequestBody(initialEndpoint.requestBodyExample);
      } else {
        setRequestBody("");
      }
    }
  }, [activeSection, currentSection]);

  // When endpoint changes, reset the form
  useEffect(() => {
    if (currentEndpoint) {
      // Set appropriate default tab based on endpoint method
      if (["POST", "PUT", "PATCH"].includes(currentEndpoint.method)) {
        setActiveTab("body");
      } else {
        setActiveTab("params");
      }
    }
  }, [currentEndpoint]);

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/sandbox/${sectionId}`);
  };

  // Handle endpoint change within a section
  const handleEndpointChange = (endpointIndex: number) => {
    setSelectedEndpoint(endpointIndex);
    setResponse(null);
    setShowResponse(false);

    const endpoint = currentSection?.endpoints[endpointIndex];

    if (endpoint) {
      const initialValues = createInitialValues(endpoint);
      setParamValues(initialValues);

      if (endpoint.requestBodyExample) {
        setRequestBody(endpoint.requestBodyExample);
      } else {
        setRequestBody("");
      }

      // Set appropriate default tab based on endpoint method
      if (["POST", "PUT", "PATCH"].includes(endpoint.method)) {
        setActiveTab("body");
      } else {
        setActiveTab("params");
      }
    }
  };

  // Handle parameter value changes
  const handleParamChange = (name: string, value: any) => {
    setParamValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle request body changes
  const handleRequestBodyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRequestBody(e.target.value);
  };

  // Format the JSON in the editor
  const formatJson = () => {
    try {
      const parsed = JSON.parse(requestBody);
      const formatted = JSON.stringify(parsed, null, 2);
      setRequestBody(formatted);
    } catch (e) {
      // If not valid JSON, leave as is
      alert("Invalid JSON format. Please check your syntax.");
    }
  };

  // Copy request or response to clipboard
  const copyToClipboard = (text: string, type: "request" | "response") => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(
          `${type === "request" ? "Request URL" : "Response"} copied!`,
        );
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy");
        setTimeout(() => setCopySuccess(""), 2000);
      },
    );
  };

  // Clear the response
  const clearResponse = () => {
    setResponse(null);
    setShowResponse(false);
  };

  // Execute the API request
  const executeRequest = async () => {
    if (!currentEndpoint) return;

    setIsLoading(true);
    setShowResponse(true);
    setActiveTab("response");

    try {
      const result = await mockApiResponse(currentEndpoint, paramValues);
      setResponse(result);
    } catch (error) {
      setResponse({
        status: 500,
        data: { error: "An error occurred while processing your request" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render request URL with query parameters
  const renderRequestUrl = (): string => {
    if (!currentEndpoint) return "";

    let url = `${apiVersion.baseUrl}${replacePath(currentEndpoint.path, paramValues)}`;

    // Add query parameters
    const queryParams = currentEndpoint.parameters
      .filter((param) => param.type === "query" && paramValues[param.name])
      .map(
        (param) =>
          `${param.name}=${encodeURIComponent(paramValues[param.name])}`,
      );

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    return url;
  };

  // Render request body (for POST, PUT, PATCH)
  const renderRequestBody = (): Record<string, any> | null => {
    if (!currentEndpoint) return null;
    if (!["POST", "PUT", "PATCH"].includes(currentEndpoint.method)) return null;

    try {
      return requestBody ? JSON.parse(requestBody) : null;
    } catch (e) {
      return null;
    }
  };

  // Animation style for the tab content
  const getTabAnimation = () => {
    return { animation: "tabFadeIn 0.3s ease-out forwards" };
  };

  return (
    <div className="api-sandbox">
      <h2>API Sandbox</h2>
      <p>Test the API endpoints directly in your browser with sample data</p>

      <div className="sandbox-nav">
        {apiEndpoints.map((section) => (
          <button
            key={section.id}
            className={activeSection === section.id ? "active" : ""}
            onClick={() => handleSectionChange(section.id)}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div className="sandbox-layout">
        <div className="endpoint-selector">
          <h3>Select Endpoint</h3>
          {currentSection && (
            <div className="endpoint-tree">
              <ul>
                {currentSection.endpoints.map((endpoint, index) => (
                  <li
                    key={index}
                    className={selectedEndpoint === index ? "selected" : ""}
                  >
                    <a onClick={() => handleEndpointChange(index)}>
                      <span
                        className={`method method-${endpoint.method.toLowerCase()}`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="path">{endpoint.path}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="request-builder">
          {currentEndpoint ? (
            <>
              <div className="endpoint-info">
                <h3>
                  <span
                    className={`method method-${currentEndpoint.method.toLowerCase()}`}
                  >
                    {currentEndpoint.method}
                  </span>
                  {currentEndpoint.path}
                </h3>
                <p>{currentEndpoint.description}</p>
              </div>

              <div className="request-tabs">
                <button
                  className={activeTab === "params" ? "active" : ""}
                  onClick={() => setActiveTab("params")}
                >
                  Parameters
                </button>
                {["POST", "PUT", "PATCH"].includes(currentEndpoint.method) && (
                  <button
                    className={activeTab === "body" ? "active" : ""}
                    onClick={() => setActiveTab("body")}
                  >
                    Request Body
                  </button>
                )}
                <button
                  className={activeTab === "headers" ? "active" : ""}
                  onClick={() => setActiveTab("headers")}
                >
                  Headers
                </button>
                {showResponse && (
                  <button
                    className={activeTab === "response" ? "active" : ""}
                    onClick={() => setActiveTab("response")}
                  >
                    Response
                  </button>
                )}
              </div>

              <div className="request-content">
                {/* URL Display is always shown */}
                <div className="request-url">
                  <div className="url-display">
                    <strong>Request URL</strong>
                    <div className="tooltip">
                      {copySuccess && (
                        <span className="tooltip-text">{copySuccess}</span>
                      )}
                      <code
                        onClick={() =>
                          copyToClipboard(renderRequestUrl(), "request")
                        }
                      >
                        {renderRequestUrl()}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Parameters Tab */}
                {activeTab === "params" && (
                  <div className="tab-content" style={getTabAnimation()}>
                    <div className="request-params">
                      <h4>Path & Query Parameters</h4>
                      {currentEndpoint.parameters.filter(
                        (param) =>
                          param.type === "path" || param.type === "query",
                      ).length > 0 ? (
                        currentEndpoint.parameters
                          .filter(
                            (param) =>
                              param.type === "path" || param.type === "query",
                          )
                          .map((param, index) => (
                            <div key={index} className="param-field">
                              <label>
                                {param.name}
                                {param.required && (
                                  <span className="required">*</span>
                                )}
                                <span className="param-type">{param.type}</span>
                              </label>
                              <input
                                type={
                                  param.dataType === "number"
                                    ? "number"
                                    : "text"
                                }
                                value={paramValues[param.name] || ""}
                                onChange={(e) =>
                                  handleParamChange(
                                    param.name,
                                    param.dataType === "number"
                                      ? Number(e.target.value)
                                      : e.target.value,
                                  )
                                }
                                placeholder={param.description}
                              />
                              <div className="param-description">
                                {param.description}
                              </div>
                            </div>
                          ))
                      ) : (
                        <p>No parameters required for this endpoint</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Request Body Tab */}
                {activeTab === "body" &&
                  ["POST", "PUT", "PATCH"].includes(currentEndpoint.method) && (
                    <div className="tab-content" style={getTabAnimation()}>
                      <div className="request-body">
                        <h4>Request Body (JSON)</h4>
                        <div className="editor-toolbar">
                          <button onClick={formatJson}>
                            <Icons.Format /> Format JSON
                          </button>
                          <button
                            onClick={() =>
                              setRequestBody(
                                currentEndpoint.requestBodyExample || "",
                              )
                            }
                          >
                            <Icons.Clear /> Reset
                          </button>
                        </div>
                        <textarea
                          ref={editorRef}
                          className="json-editor"
                          value={requestBody}
                          onChange={handleRequestBodyChange}
                          placeholder="Enter JSON request body"
                          rows={10}
                        />
                      </div>
                    </div>
                  )}

                {/* Headers Tab */}
                {activeTab === "headers" && (
                  <div className="tab-content" style={getTabAnimation()}>
                    <div className="request-headers">
                      <h4>Request Headers</h4>
                      <div className="param-field">
                        <label>
                          Content-Type
                          <span className="param-type">header</span>
                        </label>
                        <input type="text" value="application/json" disabled />
                        <div className="param-description">
                          The format of the request body
                        </div>
                      </div>
                      <div className="param-field">
                        <label>
                          Accept
                          <span className="param-type">header</span>
                        </label>
                        <input type="text" value="application/json" disabled />
                        <div className="param-description">
                          The preferred response format
                        </div>
                      </div>
                      <div className="param-field">
                        <label>
                          Authorization
                          <span className="param-type">header</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Bearer token123"
                          disabled
                        />
                        <div className="param-description">
                          Authentication token (disabled in sandbox)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Response Tab */}
                {activeTab === "response" && showResponse && (
                  <div className="tab-content" style={getTabAnimation()}>
                    <div className="response-section">
                      <h4>Response</h4>
                      {isLoading ? (
                        <div className="loading">
                          <div className="loading-spinner"></div>
                          <p>Sending request...</p>
                        </div>
                      ) : response ? (
                        <div className="response-content">
                          <div className="response-status">
                            <StatusIndicator status={response.status} />

                            <div
                              className="tooltip"
                              style={{ marginLeft: "auto" }}
                            >
                              {copySuccess && (
                                <span className="tooltip-text">
                                  {copySuccess}
                                </span>
                              )}
                              <button
                                className="secondary-button"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(response.data, null, 2),
                                    "response",
                                  )
                                }
                                style={{
                                  padding: "0.25rem 0.5rem",
                                  fontSize: "var(--font-size-xs)",
                                }}
                              >
                                <Icons.Copy /> Copy
                              </button>
                            </div>
                          </div>
                          <div className="response-body">
                            {typeof response.data === "object" ? (
                              <JSONTree
                                data={response.data}
                                theme={{
                                  scheme: "monokai",
                                  base00: "#ffffff",
                                  base01: "#f5f5f5",
                                  base02: "#e5e7eb",
                                  base03: "#6b7280",
                                  base04: "#4b5563",
                                  base05: "#374151",
                                  base06: "#111827",
                                  base07: "#000000",
                                  base08: "#ef4444",
                                  base09: "#f97316",
                                  base0A: "#f59e0b",
                                  base0B: "#10b981",
                                  base0C: "#06b6d4",
                                  base0D: "#3b82f6",
                                  base0E: "#8b5cf6",
                                  base0F: "#ec4899",
                                }}
                                invertTheme={false}
                              />
                            ) : (
                              <SyntaxHighlighter language="json" style={docco}>
                                {String(response.data)}
                              </SyntaxHighlighter>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="no-response">
                          Execute the request to see the response
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="request-controls">
                {showResponse && (
                  <button className="secondary-button" onClick={clearResponse}>
                    <Icons.Clear /> Clear Response
                  </button>
                )}
                <button
                  className="execute-button"
                  onClick={executeRequest}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Icons.Send /> Execute Request
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="no-endpoint-selected">
              <Icons.ApiIcon />
              <p>Select an endpoint from the list to get started</p>
              <div className="hint">
                Choose an API endpoint from the left panel to test it in the
                sandbox. You can set parameters, customize the request body, and
                see the response.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiSandbox;
