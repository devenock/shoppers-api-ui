// // import React, { useState, useEffect, useRef } from "react";
// // import { Link, useLocation } from "react-router-dom";
// //
// // // Import icons
// // import {
// //   Search,
// //   Moon,
// //   Sun,
// //   ChevronDown,
// //   Globe,
// //   DollarSign,
// //   ShoppingCart,
// //   Users,
// //   Settings,
// //   X,
// //   Menu,
// // } from "react-feather";
// //
// // interface HeaderProps {
// //   apiVersions: ApiVersion[];
// //   selectedVersion: ApiVersion;
// //   onVersionChange: (version: ApiVersion) => void;
// //   isDarkMode: boolean;
// //   toggleDarkMode: () => void;
// //   language: string;
// //   setLanguage: (lang: string) => void;
// //   currency: string;
// //   setCurrency: (currency: string) => void;
// //   tenant: string;
// //   setTenant: (tenant: string) => void;
// //   store: string;
// //   setStore: (store: string) => void;
// // }
// //
// // interface ApiVersion {
// //   id: string;
// //   name: string;
// //   description: string;
// //   baseUrl: string;
// // }
// //
// // // Sample data for multi-tenant, multi-store, etc.
// // const AVAILABLE_LANGUAGES = [
// //   { code: "en", name: "English" },
// //   { code: "es", name: "Español" },
// //   { code: "fr", name: "Français" },
// //   { code: "de", name: "Deutsch" },
// //   { code: "zh", name: "Chinese" },
// //   { code: "ar", name: "Arabic" },
// // ];
// //
// // const AVAILABLE_CURRENCIES = [
// //   { code: "USD", symbol: "$", name: "US Dollar" },
// //   { code: "EUR", symbol: "€", name: "Euro" },
// //   { code: "GBP", symbol: "£", name: "British Pound" },
// //   { code: "JPY", symbol: "¥", name: "Japanese Yen" },
// //   { code: "INR", symbol: "₹", name: "Indian Rupee" },
// // ];
// //
// // const AVAILABLE_TENANTS = [
// //   { id: "default", name: "Default" },
// //   { id: "vendor1", name: "Vendor 1" },
// //   { id: "vendor2", name: "Vendor 2" },
// //   { id: "vendor3", name: "Vendor 3" },
// // ];
// //
// // const AVAILABLE_STORES = [
// //   { id: "main", name: "Main Store" },
// //   { id: "eu-store", name: "EU Store" },
// //   { id: "asia-store", name: "Asia Store" },
// //   { id: "us-store", name: "US Store" },
// // ];
// //
// // const Header: React.FC<HeaderProps> = ({
// //   apiVersions,
// //   selectedVersion,
// //   onVersionChange,
// //   isDarkMode,
// //   toggleDarkMode,
// //   language,
// //   setLanguage,
// //   currency,
// //   setCurrency,
// //   tenant,
// //   setTenant,
// //   store,
// //   setStore,
// // }) => {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
// //   const searchInputRef = useRef<HTMLInputElement>(null);
// //   const location = useLocation();
// //
// //   // Listen for scroll events to change header appearance
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 10);
// //     };
// //
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);
// //
// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (
// //         activeDropdown &&
// //         !(event.target as Element).closest(".dropdown-container")
// //       ) {
// //         setActiveDropdown(null);
// //       }
// //     };
// //
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [activeDropdown]);
// //
// //   // Focus search input when search is shown
// //   useEffect(() => {
// //     if (showSearch && searchInputRef.current) {
// //       searchInputRef.current.focus();
// //     }
// //   }, [showSearch]);
// //
// //   // Reset mobile menu and search on navigation
// //   useEffect(() => {
// //     setMobileMenuOpen(false);
// //     setShowSearch(false);
// //   }, [location.pathname]);
// //
// //   const toggleDropdown = (dropdownName: string) => {
// //     setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
// //   };
// //
// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Implement search functionality here
// //     console.log("Searching for:", searchQuery);
// //     // For this example, we'll just close the search bar
// //     // In a real implementation, you would navigate to search results
// //     // setShowSearch(false);
// //   };
// //
// //   return (
// //     <header
// //       className={`header ${isScrolled ? "header-scrolled" : ""} ${isDarkMode ? "dark-mode" : ""}`}
// //     >
// //       <div className="header-container">
// //         {/* Logo and mobile menu toggle */}
// //         <div className="header-left">
// //           <button
// //             className="mobile-menu-toggle"
// //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //             aria-label="Toggle menu"
// //           >
// //             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
// //           </button>
// //
// //           <Link to="/" className="logo">
// //             <svg
// //               width="30"
// //               height="30"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="logo-svg"
// //             >
// //               <path
// //                 d="M12 2L2 7L12 12L22 7L12 2Z"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               />
// //               <path
// //                 d="M2 17L12 22L22 17"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               />
// //               <path
// //                 d="M2 12L12 17L22 12"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               />
// //             </svg>
// //             <h1>eCommerce API Docs</h1>
// //           </Link>
// //         </div>
// //
// //         {/* Universal search */}
// //         <div className={`search-container ${showSearch ? "active" : ""}`}>
// //           {showSearch ? (
// //             <form onSubmit={handleSearch} className="search-form">
// //               <input
// //                 ref={searchInputRef}
// //                 type="text"
// //                 placeholder="Search API documentation..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //               <button type="submit" aria-label="Search">
// //                 <Search size={18} />
// //               </button>
// //               <button
// //                 type="button"
// //                 className="close-search"
// //                 onClick={() => setShowSearch(false)}
// //                 aria-label="Close search"
// //               >
// //                 <X size={18} />
// //               </button>
// //             </form>
// //           ) : (
// //             <button
// //               className="search-button"
// //               onClick={() => setShowSearch(true)}
// //               aria-label="Open search"
// //             >
// //               <Search size={20} />
// //             </button>
// //           )}
// //         </div>
// //
// //         {/* Navigation and Controls */}
// //         <nav className={`main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
// //           <div className="nav-links">
// //             <Link to="/">Home</Link>
// //             <Link to="/docs">Documentation</Link>
// //             <Link to="/sandbox">API Sandbox</Link>
// //           </div>
// //
// //           <div className="header-controls">
// //             {/* Version selector */}
// //             <div className="dropdown-container">
// //               <button
// //                 className="control-button version-button"
// //                 onClick={() => toggleDropdown("version")}
// //                 aria-label="Select API version"
// //               >
// //                 <span className="control-label">Version:</span>
// //                 <span className="selected-item">{selectedVersion.id}</span>
// //                 <ChevronDown size={16} />
// //               </button>
// //               {activeDropdown === "version" && (
// //                 <div className="dropdown-menu">
// //                   <div className="dropdown-header">
// //                     <h3>Select API Version</h3>
// //                   </div>
// //                   <div className="dropdown-body">
// //                     {apiVersions.map((version) => (
// //                       <button
// //                         key={version.id}
// //                         className={`dropdown-item ${version.id === selectedVersion.id ? "active" : ""}`}
// //                         onClick={() => {
// //                           onVersionChange(version);
// //                           setActiveDropdown(null);
// //                         }}
// //                       >
// //                         <div className="item-main">
// //                           <span className="item-label">{version.name}</span>
// //                         </div>
// //                         <span className="item-description">
// //                           {version.description}
// //                         </span>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //
// //             {/* Language selector */}
// //             <div className="dropdown-container">
// //               <button
// //                 className="control-button"
// //                 onClick={() => toggleDropdown("language")}
// //                 aria-label="Select language"
// //               >
// //                 <Globe size={18} />
// //                 <span className="selected-item control-label">
// //                   {language.toUpperCase()}
// //                 </span>
// //                 <ChevronDown size={16} />
// //               </button>
// //               {activeDropdown === "language" && (
// //                 <div className="dropdown-menu">
// //                   <div className="dropdown-header">
// //                     <h3>Select Language</h3>
// //                   </div>
// //                   <div className="dropdown-body">
// //                     {AVAILABLE_LANGUAGES.map((lang) => (
// //                       <button
// //                         key={lang.code}
// //                         className={`dropdown-item ${lang.code === language ? "active" : ""}`}
// //                         onClick={() => {
// //                           setLanguage(lang.code);
// //                           setActiveDropdown(null);
// //                         }}
// //                       >
// //                         <span className="item-label">{lang.name}</span>
// //                         <span className="item-code">
// //                           {lang.code.toUpperCase()}
// //                         </span>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //
// //             {/* Theme toggle */}
// //             <button
// //               className="control-button theme-toggle"
// //               onClick={toggleDarkMode}
// //               aria-label={
// //                 isDarkMode ? "Switch to light mode" : "Switch to dark mode"
// //               }
// //             >
// //               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
// //             </button>
// //
// //             {/* Settings */}
// //             <div className="dropdown-container">
// //               <button
// //                 className="control-button"
// //                 onClick={() => toggleDropdown("settings")}
// //                 aria-label="Settings"
// //               >
// //                 <Settings size={18} />
// //               </button>
// //               {activeDropdown === "settings" && (
// //                 <div className="dropdown-menu">
// //                   <div className="dropdown-header">
// //                     <h3>Settings</h3>
// //                   </div>
// //                   <div className="dropdown-body settings-menu">
// //                     <div className="settings-group">
// //                       <h4>Display</h4>
// //                       <div className="setting-item">
// //                         <label htmlFor="code-theme">Code Theme</label>
// //                         <select id="code-theme" defaultValue="default">
// //                           <option value="default">Default</option>
// //                           <option value="dark">Dark</option>
// //                           <option value="light">Light</option>
// //                         </select>
// //                       </div>
// //                       <div className="setting-item">
// //                         <label htmlFor="font-size">Font Size</label>
// //                         <select id="font-size" defaultValue="medium">
// //                           <option value="small">Small</option>
// //                           <option value="medium">Medium</option>
// //                           <option value="large">Large</option>
// //                         </select>
// //                       </div>
// //                     </div>
// //                     <div className="settings-group">
// //                       <h4>Preferences</h4>
// //                       <div className="setting-item checkbox">
// //                         <input
// //                           type="checkbox"
// //                           id="show-examples"
// //                           defaultChecked
// //                         />
// //                         <label htmlFor="show-examples">
// //                           Show Code Examples
// //                         </label>
// //                       </div>
// //                       <div className="setting-item checkbox">
// //                         <input type="checkbox" id="auto-expand" />
// //                         <label htmlFor="auto-expand">
// //                           Auto-expand Endpoints
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };
// //
// // export default Header;
//
// // components/Header.tsx
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
//
// // Import icons
// import { Search, Moon, Sun, ChevronDown, Globe, X, Menu } from "react-feather";
//
// interface HeaderProps {
//   apiVersions: ApiVersion[];
//   selectedVersion: ApiVersion;
//   onVersionChange: (version: ApiVersion) => void;
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
//   language: string;
//   setLanguage: (lang: string) => void;
// }
//
// interface ApiVersion {
//   id: string;
//   name: string;
//   description: string;
//   baseUrl: string;
// }
//
// // Sample data for languages
// const AVAILABLE_LANGUAGES = [
//   { code: "en", name: "English" },
//   { code: "es", name: "Español" },
//   { code: "fr", name: "Français" },
//   { code: "de", name: "Deutsch" },
//   { code: "zh", name: "Chinese" },
//   { code: "ar", name: "Arabic" },
// ];
//
// const Header: React.FC<HeaderProps> = ({
//   apiVersions,
//   selectedVersion,
//   onVersionChange,
//   isDarkMode,
//   toggleDarkMode,
//   language,
//   setLanguage,
// }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const location = useLocation();
//
//   // Listen for scroll events to change header appearance
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         activeDropdown &&
//         !(event.target as Element).closest(".dropdown-container")
//       ) {
//         setActiveDropdown(null);
//       }
//     };
//
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [activeDropdown]);
//
//   // Focus search input when search is shown
//   useEffect(() => {
//     if (showSearch && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [showSearch]);
//
//   // Reset mobile menu and search on navigation
//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setShowSearch(false);
//   }, [location.pathname]);
//
//   const toggleDropdown = (dropdownName: string) => {
//     setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
//   };
//
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement search functionality here
//     console.log("Searching for:", searchQuery);
//     // For this example, we'll just close the search bar
//     // In a real implementation, you would navigate to search results
//     // setShowSearch(false);
//   };
//
//   return (
//     <header
//       className={`header ${isScrolled ? "header-scrolled" : ""} ${isDarkMode ? "dark-mode" : ""}`}
//     >
//       <div className="header-container">
//         {/* Logo and mobile menu toggle */}
//         <div className="header-left">
//           <button
//             className="mobile-menu-toggle"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//
//           <Link to="/" className="logo">
//             <svg
//               width="30"
//               height="30"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="logo-svg"
//             >
//               <path
//                 d="M12 2L2 7L12 12L22 7L12 2Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 17L12 22L22 17"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 12L12 17L22 12"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <h1>eCommerce API Docs</h1>
//           </Link>
//         </div>
//
//         {/* Universal search */}
//         <div className={`search-container ${showSearch ? "active" : ""}`}>
//           {showSearch ? (
//             <form onSubmit={handleSearch} className="search-form">
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search API documentation..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" aria-label="Search">
//                 <Search size={18} />
//               </button>
//               <button
//                 type="button"
//                 className="close-search"
//                 onClick={() => setShowSearch(false)}
//                 aria-label="Close search"
//               >
//                 <X size={18} />
//               </button>
//             </form>
//           ) : (
//             <button
//               className="search-button"
//               onClick={() => setShowSearch(true)}
//               aria-label="Open search"
//             >
//               <Search size={20} />
//             </button>
//           )}
//         </div>
//
//         {/* Navigation and Controls */}
//         <nav className={`main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
//           <div className="nav-links">
//             <Link to="/">Home</Link>
//             <Link to="/docs">Documentation</Link>
//             <Link to="/sandbox">API Sandbox</Link>
//           </div>
//
//           <div className="header-controls">
//             {/* Version selector */}
//             <div className="dropdown-container">
//               <button
//                 className="control-button version-button"
//                 onClick={() => toggleDropdown("version")}
//                 aria-label="Select API version"
//               >
//                 <span className="control-label">Version:</span>
//                 <span className="selected-item">{selectedVersion.id}</span>
//                 <ChevronDown size={16} />
//               </button>
//               {activeDropdown === "version" && (
//                 <div className="dropdown-menu">
//                   <div className="dropdown-header">
//                     <h3>Select API Version</h3>
//                   </div>
//                   <div className="dropdown-body">
//                     {apiVersions.map((version) => (
//                       <button
//                         key={version.id}
//                         className={`dropdown-item ${version.id === selectedVersion.id ? "active" : ""}`}
//                         onClick={() => {
//                           onVersionChange(version);
//                           setActiveDropdown(null);
//                         }}
//                       >
//                         <div className="item-main">
//                           <span className="item-label">{version.name}</span>
//                         </div>
//                         <span className="item-description">
//                           {version.description}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//
//             {/* Language selector */}
//             <div className="dropdown-container">
//               <button
//                 className="control-button"
//                 onClick={() => toggleDropdown("language")}
//                 aria-label="Select language"
//               >
//                 <Globe size={18} />
//                 <span className="selected-item control-label">
//                   {language.toUpperCase()}
//                 </span>
//                 <ChevronDown size={16} />
//               </button>
//               {activeDropdown === "language" && (
//                 <div className="dropdown-menu">
//                   <div className="dropdown-header">
//                     <h3>Select Language</h3>
//                   </div>
//                   <div className="dropdown-body">
//                     {AVAILABLE_LANGUAGES.map((lang) => (
//                       <button
//                         key={lang.code}
//                         className={`dropdown-item ${lang.code === language ? "active" : ""}`}
//                         onClick={() => {
//                           setLanguage(lang.code);
//                           setActiveDropdown(null);
//                         }}
//                       >
//                         <span className="item-label">{lang.name}</span>
//                         <span className="item-code">
//                           {lang.code.toUpperCase()}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//
//             {/* Theme toggle */}
//             <button
//               className="control-button theme-toggle"
//               onClick={toggleDarkMode}
//               aria-label={
//                 isDarkMode ? "Switch to light mode" : "Switch to dark mode"
//               }
//             >
//               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
//             </button>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };
//
// export default Header;

// components/Header.tsx - Improved structure
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// Import icons
import { Search, Moon, Sun, ChevronDown, Globe, X, Menu } from "react-feather";

interface HeaderProps {
  apiVersions: ApiVersion[];
  selectedVersion: ApiVersion;
  onVersionChange: (version: ApiVersion) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

interface ApiVersion {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
}

// Sample data for languages
const AVAILABLE_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
];

const Header: React.FC<HeaderProps> = ({
  apiVersions,
  selectedVersion,
  onVersionChange,
  isDarkMode,
  toggleDarkMode,
  language,
  setLanguage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Listen for scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        !(event.target as Element).closest(".dropdown-container")
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Reset mobile menu and search on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearch(false);
  }, [location.pathname]);

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowSearch(false);
  };

  return (
    <header
      className={`header ${isScrolled ? "header-scrolled" : ""} ${isDarkMode ? "dark-mode" : ""}`}
    >
      <div className="header-container">
        {/* Left section with logo and mobile menu toggle */}
        <div className="header-left">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="logo">
            <svg
              width="30"
              height="30"
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
            <h1>Shoppers API</h1>
          </Link>

          {/* Universal search - moved inside header-left */}
          <div className={`search-container ${showSearch ? "active" : ""}`}>
            {showSearch ? (
              <form onSubmit={handleSearch} className="search-form">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search API documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  className="close-search"
                  onClick={() => setShowSearch(false)}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                className="search-button"
                onClick={() => setShowSearch(true)}
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation and Controls */}
        <nav className={`main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/docs">Documentation</Link>
            <Link to="/sandbox">API Sandbox</Link>
          </div>

          <div className="header-controls">
            {/* Version selector */}
            <div className="dropdown-container">
              <button
                className="control-button version-button"
                onClick={() => toggleDropdown("version")}
                aria-label="Select API version"
              >
                <span className="control-label">Version:</span>
                <span className="selected-item">{selectedVersion.id}</span>
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "version" && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <h3>Select API Version</h3>
                  </div>
                  <div className="dropdown-body">
                    {apiVersions.map((version) => (
                      <button
                        key={version.id}
                        className={`dropdown-item ${version.id === selectedVersion.id ? "active" : ""}`}
                        onClick={() => {
                          onVersionChange(version);
                          setActiveDropdown(null);
                        }}
                      >
                        <div className="item-main">
                          <span className="item-label">{version.name}</span>
                        </div>
                        <span className="item-description">
                          {version.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language selector */}
            <div className="dropdown-container">
              <button
                className="control-button"
                onClick={() => toggleDropdown("language")}
                aria-label="Select language"
              >
                <Globe size={18} />
                <span className="selected-item control-label">
                  {language.toUpperCase()}
                </span>
                <ChevronDown size={16} />
              </button>
              {activeDropdown === "language" && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <h3>Select Language</h3>
                  </div>
                  <div className="dropdown-body">
                    {AVAILABLE_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        className={`dropdown-item ${lang.code === language ? "active" : ""}`}
                        onClick={() => {
                          setLanguage(lang.code);
                          setActiveDropdown(null);
                        }}
                      >
                        <span className="item-label">{lang.name}</span>
                        <span className="item-code">
                          {lang.code.toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              className="control-button theme-toggle"
              onClick={toggleDarkMode}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
