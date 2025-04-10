// // components/ApiDocumentation.tsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//
// interface Parameter {
//     name: string;
//     type: string;
//     dataType: string;
//     description: string;
//     required: boolean;
// }
//
// interface Response {
//     status: number;
//     description: string;
//     example: string;
// }
//
// interface Endpoint {
//     method: string;
//     path: string;
//     description: string;
//     parameters: Parameter[];
//     requestBodyExample?: string;
//     responses: Response[];
// }
//
// interface ApiSection {
//     id: string;
//     name: string;
//     description: string;
//     endpoints: Endpoint[];
// }
//
// interface ApiVersion {
//     id: string;
//     name: string;
//     description: string;
//     baseUrl: string;
// }
//
// interface ApiDocumentationProps {
//     apiVersion: ApiVersion;
//     apiEndpoints: ApiSection[];
// }
//
// const ApiDocumentation: React.FC<ApiDocumentationProps> = ({ apiVersion, apiEndpoints }) => {
//     const { section } = useParams<{ section?: string }>();
//     const [activeSection, setActiveSection] = useState<string | null>(null);
//     const [expandedEndpoints, setExpandedEndpoints] = useState<Record<string, boolean>>({});
//
//     useEffect(() => {
//         // Set the active section based on URL param or default to first section
//         if (section && apiEndpoints.some(s => s.id === section)) {
//             setActiveSection(section);
//         } else if (apiEndpoints.length > 0) {
//             setActiveSection(apiEndpoints[0].id);
//         }
//     }, [section, apiEndpoints]);
//
//     const toggleEndpoint = (sectionId: string, endpointIndex: number) => {
//         const key = `${sectionId}-${endpointIndex}`;
//         setExpandedEndpoints(prev => ({
//             ...prev,
//             [key]: !prev[key]
//         }));
//     };
//
//     const isEndpointExpanded = (sectionId: string, endpointIndex: number) => {
//         const key = `${sectionId}-${endpointIndex}`;
//         return expandedEndpoints[key] || false;
//     };
//
//     // Generate code examples for different languages
//     const generateCodeExample = (endpoint: Endpoint, baseUrl: string) => {
//         const url = `${baseUrl}${endpoint.path}`;
//         const hasBody = endpoint.method === 'POST' || endpoint.method === 'PUT' || endpoint.method === 'PATCH';
//
//         // Replace path parameters with placeholder values
//         let formattedUrl = url;
//         endpoint.parameters.forEach(param => {
//             if (param.type === 'path') {
//                 formattedUrl = formattedUrl.replace(`:${param.name}`, `{${param.name}}`);
//             }
//         });
//
//         const examples = {
//             curl: `curl -X ${endpoint.method} "${formattedUrl}"${hasBody && endpoint.requestBodyExample ? ` \\
//   -H "Content-Type: application/json" \\
//   -d '${endpoint.requestBodyExample}'` : ''}`,
//
//             javascript: `fetch("${formattedUrl}", {
//   method: "${endpoint.method}",${hasBody && endpoint.requestBodyExample ? `
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(${endpoint.requestBodyExample})` : ''}
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));`,
//
//             golang: `package main
//
// import (
// 	"fmt"
// 	"net/http"${hasBody ? `
// 	"bytes"
// 	"encoding/json"` : ''}
// )
//
// func main() {${hasBody && endpoint.requestBodyExample ? `
// 	// Prepare request body
// 	requestBody, err := json.Marshal(${endpoint.requestBodyExample})
// 	if err != nil {
// 		fmt.Println("Error marshalling JSON:", err)
// 		return
// 	}
//
// 	// Create request
// 	req, err := http.NewRequest("${endpoint.method}", "${formattedUrl}", bytes.NewBuffer(requestBody))` : `
// 	// Create request
// 	req, err := http.NewRequest("${endpoint.method}", "${formattedUrl}", nil)`}
// 	if err != nil {
// 		fmt.Println("Error creating request:", err)
// 		return
// 	}
//
// 	// Set headers${hasBody ? `
// 	req.Header.Set("Content-Type", "application/json")` : ''}
//
// 	// Send request
// 	client := &http.Client{}
// 	resp, err := client.Do(req)
// 	if err != nil {
// 		fmt.Println("Error sending request:", err)
// 		return
// 	}
// 	defer resp.Body.Close()
//
// 	// Process response
// 	fmt.Println("Response Status:", resp.Status)
// }`
//         };
//
//         return examples;
//     };
//
//     // Render code examples with tabs for different languages
//     const CodeExamples: React.FC<{ endpoint: Endpoint, baseUrl: string }> = ({ endpoint, baseUrl }) => {
//         const [activeTab, setActiveTab] = useState<'curl' | 'javascript' | 'golang'>('curl');
//         const examples = generateCodeExample(endpoint, baseUrl);
//
//         return (
//             <div className="code-examples">
//                 <div className="code-tabs">
//                     <button
//                         className={activeTab === 'curl' ? 'active' : ''}
//                         onClick={() => setActiveTab('curl')}
//                     >
//                         cURL
//                     </button>
//                     <button
//                         className={activeTab === 'javascript' ? 'active' : ''}
//                         onClick={() => setActiveTab('javascript')}
//                     >
//                         JavaScript
//                     </button>
//                     <button
//                         className={activeTab === 'golang' ? 'active' : ''}
//                         onClick={() => setActiveTab('golang')}
//                     >
//                         Go
//                     </button>
//                 </div>
//                 <div className="code-content">
//                     <SyntaxHighlighter
//                         language={activeTab === 'curl' ? 'bash' : activeTab === 'javascript' ? 'javascript' : 'go'}
//                         style={docco}
//                     >
//                         {examples[activeTab]}
//                     </SyntaxHighlighter>
//                 </div>
//             </div>
//         );
//     };
//
//     return (
//         <div className="api-documentation">
//             <div className="sidebar">
//                 <h2>API Sections</h2>
//                 <ul>
//                     {apiEndpoints.map(section => (
//                         <li key={section.id}>
//                             <Link
//                                 to={`/docs/${section.id}`}
//                                 className={activeSection === section.id ? 'active' : ''}
//                                 onClick={() => setActiveSection(section.id)}
//                             >
//                                 {section.name}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//
//             <div className="content-area">
//                 <div className="api-version-info">
//                     <h2>{apiVersion.name}</h2>
//                     <p>{apiVersion.description}</p>
//                     <div className="base-url">
//                         <strong>Base URL:</strong> <code>{apiVersion.baseUrl}</code>
//                     </div>
//                 </div>
//
//                 {apiEndpoints.map(section => (
//                     <div
//                         key={section.id}
//                         className={`api-section ${activeSection === section.id ? 'active' : 'hidden'}`}
//                     >
//                         <h2 id={section.id}>{section.name}</h2>
//                         <p className="section-description">{section.description}</p>
//
//                         {section.endpoints.map((endpoint, index) => (
//                             <div key={index} className="endpoint">
//                                 <div
//                                     className="endpoint-header"
//                                     onClick={() => toggleEndpoint(section.id, index)}
//                                 >
//                                     <div className={`method method-${endpoint.method.toLowerCase()}`}>
//                                         {endpoint.method}
//                                     </div>
//                                     <div className="path">{endpoint.path}</div>
//                                     <div className="description">{endpoint.description}</div>
//                                     <div className="toggle-icon">
//                                         {isEndpointExpanded(section.id, index) ? '−' : '+'}
//                                     </div>
//                                 </div>
//
//                                 {isEndpointExpanded(section.id, index) && (
//                                     <div className="endpoint-details">
//                                         <h4>Parameters</h4>
//                                         {endpoint.parameters.length > 0 ? (
//                                             <table className="parameters-table">
//                                                 <thead>
//                                                 <tr>
//                                                     <th>Name</th>
//                                                     <th>Type</th>
//                                                     <th>Data Type</th>
//                                                     <th>Required</th>
//                                                     <th>Description</th>
//                                                 </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                 {endpoint.parameters.map((param, paramIndex) => (
//                                                     <tr key={paramIndex}>
//                                                         <td><code>{param.name}</code></td>
//                                                         <td>{param.type}</td>
//                                                         <td>{param.dataType}</td>
//                                                         <td>{param.required ? 'Yes' : 'No'}</td>
//                                                         <td>{param.description}</td>
//                                                     </tr>
//                                                 ))}
//                                                 </tbody>
//                                             </table>
//                                         ) : (
//                                             <p>No parameters required</p>
//                                         )}
//
//                                         {endpoint.requestBodyExample && (
//                                             <>
//                                                 <h4>Request Body Example</h4>
//                                                 <SyntaxHighlighter language="json" style={docco}>
//                                                     {endpoint.requestBodyExample}
//                                                 </SyntaxHighlighter>
//                                             </>
//                                         )}
//
//                                         <h4>Responses</h4>
//                                         <table className="responses-table">
//                                             <thead>
//                                             <tr>
//                                                 <th>Status</th>
//                                                 <th>Description</th>
//                                             </tr>
//                                             </thead>
//                                             <tbody>
//                                             {endpoint.responses.map((response, respIndex) => (
//                                                 <tr key={respIndex}>
//                                                     <td>{response.status}</td>
//                                                     <td>{response.description}</td>
//                                                 </tr>
//                                             ))}
//                                             </tbody>
//                                         </table>
//
//                                         {endpoint.responses.some(r => r.example) && (
//                                             <>
//                                                 <h4>Response Examples</h4>
//                                                 <div className="response-examples">
//                                                     {endpoint.responses.filter(r => r.example).map((response, respIndex) => (
//                                                         <div key={respIndex} className="response-example">
//                                                             <div className="response-status">Status: {response.status}</div>
//                                                             {response.example ? (
//                                                                 <SyntaxHighlighter language="json" style={docco}>
//                                                                     {response.example}
//                                                                 </SyntaxHighlighter>
//                                                             ) : (
//                                                                 <p>No example available</p>
//                                                             )}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </>
//                                         )}
//
//                                         <h4>Code Examples</h4>
//                                         <CodeExamples endpoint={endpoint} baseUrl={apiVersion.baseUrl} />
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default ApiDocumentation;

// components/ApiDocumentation.tsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

interface ApiDocumentationProps {
  apiVersion: ApiVersion;
  apiEndpoints: ApiSection[];
  isDarkMode?: boolean;
}

// SVG Icons for the UI
const Icons = {
  Parameter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 11l5-5m0 0l5 5m-5-5v12"
      />
    </svg>
  ),
  Response: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 13l-5 5m0 0l-5-5m5 5V6"
      />
    </svg>
  ),
  Code: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  Copy: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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
};

const ApiDocumentation: React.FC<ApiDocumentationProps> = ({
  apiVersion,
  apiEndpoints,
  isDarkMode = false,
}) => {
  const { section } = useParams<{ section?: string }>();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedEndpoints, setExpandedEndpoints] = useState<
    Record<string, boolean>
  >({});
  const [copySuccess, setCopySuccess] = useState<string>("");
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the active section based on URL param or default to first section
    if (section && apiEndpoints.some((s) => s.id === section)) {
      setActiveSection(section);
    } else if (apiEndpoints.length > 0) {
      setActiveSection(apiEndpoints[0].id);
      // Update URL to first section if none specified
      if (!section && apiEndpoints.length > 0) {
        navigate(`/docs/${apiEndpoints[0].id}`, { replace: true });
      }
    }
  }, [section, apiEndpoints, navigate]);

  // Scroll to top when changing sections
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  const toggleEndpoint = (sectionId: string, endpointIndex: number) => {
    const key = `${sectionId}-${endpointIndex}`;
    setExpandedEndpoints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isEndpointExpanded = (sectionId: string, endpointIndex: number) => {
    const key = `${sectionId}-${endpointIndex}`;
    return expandedEndpoints[key] || false;
  };

  // Copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy");
        setTimeout(() => setCopySuccess(""), 2000);
      },
    );
  };

  // Generate code examples for different languages
  const generateCodeExample = (endpoint: Endpoint, baseUrl: string) => {
    const url = `${baseUrl}${endpoint.path}`;
    const hasBody =
      endpoint.method === "POST" ||
      endpoint.method === "PUT" ||
      endpoint.method === "PATCH";

    // Replace path parameters with placeholder values
    let formattedUrl = url;
    endpoint.parameters.forEach((param) => {
      if (param.type === "path") {
        formattedUrl = formattedUrl.replace(
          `:${param.name}`,
          `{${param.name}}`,
        );
      }
    });

    const examples = {
      curl: `curl -X ${endpoint.method} "${formattedUrl}"${
        hasBody && endpoint.requestBodyExample
          ? ` \\
  -H "Content-Type: application/json" \\
  -d '${endpoint.requestBodyExample}'`
          : ""
      }`,

      javascript: `// Using fetch API
fetch("${formattedUrl}", {
  method: "${endpoint.method}",${
    hasBody && endpoint.requestBodyExample
      ? `
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(${endpoint.requestBodyExample})`
      : ""
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

      nodejs: `// Using Node.js with axios
const axios = require('axios');

async function makeRequest() {
  try {
    const response = await axios({
      method: '${endpoint.method}',
      url: '${formattedUrl}',${
        hasBody && endpoint.requestBodyExample
          ? `
      headers: { 'Content-Type': 'application/json' },
      data: ${endpoint.requestBodyExample}`
          : ""
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

makeRequest();`,

      golang: `package main

import (
	"fmt"
	"net/http"${
    hasBody
      ? `
	"bytes"
	"encoding/json"`
      : ""
  }
)

func main() {${
        hasBody && endpoint.requestBodyExample
          ? `
	// Prepare request body
	requestBody, err := json.Marshal(${endpoint.requestBodyExample})
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}
	
	// Create request
	req, err := http.NewRequest("${endpoint.method}", "${formattedUrl}", bytes.NewBuffer(requestBody))`
          : `
	// Create request
	req, err := http.NewRequest("${endpoint.method}", "${formattedUrl}", nil)`
      }
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	
	// Set headers${
    hasBody
      ? `
	req.Header.Set("Content-Type", "application/json")`
      : ""
  }
	
	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()
	
	// Process response
	fmt.Println("Response Status:", resp.Status)
}`,
    };

    return examples;
  };

  // Render code examples with tabs for different languages
  const CodeExamples: React.FC<{ endpoint: Endpoint; baseUrl: string }> = ({
    endpoint,
    baseUrl,
  }) => {
    const [activeTab, setActiveTab] = useState<
      "curl" | "javascript" | "nodejs" | "golang"
    >("curl");
    const examples = generateCodeExample(endpoint, baseUrl);

    return (
      <div className="code-examples">
        <div className="code-tabs">
          <button
            className={activeTab === "curl" ? "active" : ""}
            onClick={() => setActiveTab("curl")}
          >
            cURL
          </button>
          <button
            className={activeTab === "javascript" ? "active" : ""}
            onClick={() => setActiveTab("javascript")}
          >
            JavaScript
          </button>
          <button
            className={activeTab === "nodejs" ? "active" : ""}
            onClick={() => setActiveTab("nodejs")}
          >
            Node.js
          </button>
          <button
            className={activeTab === "golang" ? "active" : ""}
            onClick={() => setActiveTab("golang")}
          >
            Go
          </button>
        </div>
        <div className="code-content">
          <div
            className="tooltip"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
            }}
          >
            {copySuccess && <span className="tooltip-text">{copySuccess}</span>}
            <button
              onClick={() => copyToClipboard(examples[activeTab])}
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <Icons.Copy />
            </button>
          </div>
          <SyntaxHighlighter
            language={
              activeTab === "curl"
                ? "bash"
                : activeTab === "javascript" || activeTab === "nodejs"
                  ? "javascript"
                  : "go"
            }
            style={docco}
            customStyle={{ padding: "1.5rem", fontSize: "0.9rem" }}
          >
            {examples[activeTab]}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  };

  return (
    <div className="api-documentation">
      <div className="sidebar">
        <h2>API Sections</h2>
        <ul>
          {apiEndpoints.map((section) => (
            <li key={section.id}>
              <Link
                to={`/docs/${section.id}`}
                className={activeSection === section.id ? "active" : ""}
                onClick={() => setActiveSection(section.id)}
              >
                {section.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="content-area" ref={contentRef}>
        <div className="api-version-info">
          <h2>{apiVersion.name}</h2>
          <p>{apiVersion.description}</p>
          <div className="base-url">
            <strong>Base URL:</strong> <code>{apiVersion.baseUrl}</code>
          </div>
        </div>

        {apiEndpoints.map((section) => (
          <div
            key={section.id}
            className={`api-section ${activeSection === section.id ? "active" : "hidden"}`}
          >
            <h2 id={section.id}>{section.name}</h2>
            <p className="section-description">{section.description}</p>

            {section.endpoints.map((endpoint, index) => (
              <div key={index} className="endpoint">
                <div
                  className="endpoint-header"
                  onClick={() => toggleEndpoint(section.id, index)}
                >
                  <div
                    className={`method method-${endpoint.method.toLowerCase()}`}
                  >
                    {endpoint.method}
                  </div>
                  <div className="path">{endpoint.path}</div>
                  <div className="description">{endpoint.description}</div>
                  <div className="toggle-icon">
                    {isEndpointExpanded(section.id, index) ? "−" : "+"}
                  </div>
                </div>

                {isEndpointExpanded(section.id, index) && (
                  <div className="endpoint-details">
                    <h4>
                      <Icons.Parameter /> Parameters
                    </h4>
                    {endpoint.parameters.length > 0 ? (
                      <table className="parameters-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Data Type</th>
                            <th>Required</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.parameters.map((param, paramIndex) => (
                            <tr key={paramIndex}>
                              <td>
                                <code>{param.name}</code>
                              </td>
                              <td>{param.type}</td>
                              <td>{param.dataType}</td>
                              <td>{param.required ? "Yes" : "No"}</td>
                              <td>{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No parameters required</p>
                    )}

                    {endpoint.requestBodyExample && (
                      <>
                        <h4>Request Body Example</h4>
                        <div style={{ position: "relative" }}>
                          <div
                            className="tooltip"
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              zIndex: 10,
                            }}
                          >
                            {copySuccess && (
                              <span className="tooltip-text">
                                {copySuccess}
                              </span>
                            )}
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  endpoint.requestBodyExample || "",
                                )
                              }
                              style={{
                                background: "none",
                                border: "none",
                                color: "#6b7280",
                                cursor: "pointer",
                                padding: "4px",
                              }}
                            >
                              <Icons.Copy />
                            </button>
                          </div>
                          <SyntaxHighlighter
                            language="json"
                            style={docco}
                            customStyle={{
                              marginBottom: "1.5rem",
                              borderRadius: "var(--border-radius)",
                              boxShadow: "var(--box-shadow-sm)",
                            }}
                          >
                            {endpoint.requestBodyExample}
                          </SyntaxHighlighter>
                        </div>
                      </>
                    )}

                    <h4>
                      <Icons.Response /> Responses
                    </h4>
                    <table className="responses-table">
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.responses.map((response, respIndex) => (
                          <tr key={respIndex}>
                            <td>
                              <span
                                className={`status-${Math.floor(response.status / 100)}xx`}
                              >
                                <span className="status-dot"></span>
                                {response.status}
                              </span>
                            </td>
                            <td>{response.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {endpoint.responses.some((r) => r.example) && (
                      <>
                        <h4>Response Examples</h4>
                        <div className="response-examples">
                          {endpoint.responses
                            .filter((r) => r.example)
                            .map((response, respIndex) => (
                              <div key={respIndex} className="response-example">
                                <div className="response-status">
                                  <span
                                    className={`status-${Math.floor(response.status / 100)}xx`}
                                  >
                                    <span className="status-dot"></span>
                                    Status: {response.status}
                                  </span>
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
                                      onClick={() =>
                                        copyToClipboard(response.example)
                                      }
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: "#6b7280",
                                        cursor: "pointer",
                                        padding: "4px",
                                      }}
                                    >
                                      <Icons.Copy />
                                    </button>
                                  </div>
                                </div>
                                {response.example ? (
                                  <SyntaxHighlighter
                                    language="json"
                                    style={docco}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius:
                                        "0 0 var(--border-radius) var(--border-radius)",
                                    }}
                                  >
                                    {response.example}
                                  </SyntaxHighlighter>
                                ) : (
                                  <p>No example available</p>
                                )}
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    <h4>
                      <Icons.Code /> Code Examples
                    </h4>
                    <CodeExamples
                      endpoint={endpoint}
                      baseUrl={apiVersion.baseUrl}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocumentation;
