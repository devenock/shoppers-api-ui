// // components/Home.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
//
// interface ApiVersion {
//     id: string;
//     name: string;
//     description: string;
//     baseUrl: string;
// }
//
// interface HomeProps {
//     apiVersions: ApiVersion[];
//     selectedVersion: ApiVersion;
// }
//
// const Home: React.FC<HomeProps> = ({ apiVersions, selectedVersion }) => {
//     return (
//         <div className="home">
//             <div className="hero-section">
//                 <h1>eCommerce API Documentation</h1>
//                 <p>Comprehensive documentation for the eCommerce API with interactive sandbox</p>
//                 <div className="cta-buttons">
//                     <Link to="/docs" className="cta-button">View Documentation</Link>
//                     <Link to="/sandbox" className="cta-button cta-button-secondary">Try API Sandbox</Link>
//                 </div>
//             </div>
//
//             <div className="version-cards">
//                 <h2>Available API Versions</h2>
//                 <div className="card-container">
//                     {apiVersions.map(version => (
//                         <div
//                             key={version.id}
//                             className={`api-card ${version.id === selectedVersion.id ? 'active' : ''}`}
//                         >
//                             <h3>{version.name}</h3>
//                             <p>{version.description}</p>
//                             <div className="api-info">
//                                 <div className="api-url">
//                                     <strong>Base URL:</strong>
//                                     <code>{version.baseUrl}</code>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//
//             <div className="features-section">
//                 <h2>Documentation Features</h2>
//                 <div className="features-grid">
//                     <div className="feature">
//                         <h3>Comprehensive API Reference</h3>
//                         <p>Detailed information about all endpoints, parameters, and responses</p>
//                     </div>
//                     <div className="feature">
//                         <h3>Interactive API Sandbox</h3>
//                         <p>Test API endpoints directly from your browser</p>
//                     </div>
//                     <div className="feature">
//                         <h3>Multiple API Implementations</h3>
//                         <p>Documentation for Golang, Node.js, and NestJS versions</p>
//                     </div>
//                     <div className="feature">
//                         <h3>Code Examples</h3>
//                         <p>Sample code for various programming languages</p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="getting-started">
//                 <h2>Getting Started</h2>
//                 <ol>
//                     <li>
//                         <h3>Choose an API Version</h3>
//                         <p>Select your preferred implementation from the dropdown menu above</p>
//                     </li>
//                     <li>
//                         <h3>Browse the Documentation</h3>
//                         <p>Explore available endpoints and understand their functionality</p>
//                     </li>
//                     <li>
//                         <h3>Test the API</h3>
//                         <p>Use the interactive sandbox to test API calls with sample data</p>
//                     </li>
//                     <li>
//                         <h3>Implement in Your Application</h3>
//                         <p>Use the provided code examples as a starting point for your integration</p>
//                     </li>
//                 </ol>
//             </div>
//         </div>
//     );
// };
//
// export default Home;

// components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ApiVersion {
    id: string;
    name: string;
    description: string;
    baseUrl: string;
}

interface HomeProps {
    apiVersions: ApiVersion[];
    selectedVersion: ApiVersion;
}

// SVG Icons for the UI
const Icons = {
    Documentation: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    Sandbox: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    Reference: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    Versions: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
    ),
    Interactive: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Code: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    MultiVersion: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
    ),
    Step1: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    ),
    Step2: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    Step3: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
    ),
    Step4: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
};

const Home: React.FC<HomeProps> = ({ apiVersions, selectedVersion }) => {
    return (
        <div className="home">
            <div className="hero-section">
                <h1>eCommerce API Documentation</h1>
                <p>Comprehensive documentation for the eCommerce API with interactive sandbox</p>
                <div className="cta-buttons">
                    <Link to="/docs" className="cta-button">
                        <Icons.Documentation /> View Documentation
                    </Link>
                    <Link to="/sandbox" className="cta-button cta-button-secondary">
                        <Icons.Sandbox /> Try API Sandbox
                    </Link>
                </div>
            </div>

            <div className="version-cards">
                <h2>Available API Versions</h2>
                <div className="card-container">
                    {apiVersions.map(version => (
                        <div
                            key={version.id}
                            className={`api-card ${version.id === selectedVersion.id ? 'active' : ''}`}
                        >
                            <h3>{version.name}</h3>
                            <p>{version.description}</p>
                            <div className="api-info">
                                <div className="api-url">
                                    <strong>Base URL:</strong>
                                    <code>{version.baseUrl}</code>
                                </div>
                            </div>
                            <div className="card-actions">
                                <Link to={`/docs`} className="card-action-link">
                                    View Documentation
                                </Link>
                                <Link to={`/sandbox`} className="card-action-link">
                                    Try in Sandbox
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="features-section">
                <h2>Documentation Features</h2>
                <div className="features-grid">
                    <div className="feature">
                        <div className="feature-icon">
                            <Icons.Reference />
                        </div>
                        <h3>Complete API Reference</h3>
                        <p>Detailed information about all endpoints, parameters, and responses</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <Icons.Interactive />
                        </div>
                        <h3>Interactive API Sandbox</h3>
                        <p>Test API endpoints directly from your browser without writing any code</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <Icons.MultiVersion />
                        </div>
                        <h3>Multiple Implementations</h3>
                        <p>Documentation for Golang, Node.js, and NestJS versions of the API</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <Icons.Code />
                        </div>
                        <h3>Code Examples</h3>
                        <p>Sample code snippets for various programming languages and frameworks</p>
                    </div>
                </div>
            </div>

            <div className="getting-started">
                <h2>Getting Started</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-icon">
                            <Icons.Step1 />
                        </div>
                        <h3>Choose an API Version</h3>
                        <p>Select your preferred implementation from the dropdown menu above</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-icon">
                            <Icons.Step2 />
                        </div>
                        <h3>Browse the Documentation</h3>
                        <p>Explore available endpoints and understand their functionality</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-icon">
                            <Icons.Step3 />
                        </div>
                        <h3>Test the API</h3>
                        <p>Use the interactive sandbox to test API calls with sample data</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-icon">
                            <Icons.Step4 />
                        </div>
                        <h3>Implement in Your Application</h3>
                        <p>Use the provided code examples as a starting point for your integration</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;