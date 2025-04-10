// components/UniversalSearch.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "react-feather";

interface SearchProps {
  apiEndpoints: ApiSection[];
  onClose: () => void;
  isVisible: boolean;
}

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

interface SearchResult {
  type: "endpoint" | "parameter" | "response";
  sectionId: string;
  sectionName: string;
  endpointIndex: number;
  method: string;
  path: string;
  description: string;
  // For parameters
  paramName?: string;
  // For responses
  statusCode?: number;
}

const UniversalSearch: React.FC<SearchProps> = ({
  apiEndpoints,
  onClose,
  isVisible,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when component becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  // Clear results when closed
  useEffect(() => {
    if (!isVisible) {
      setSearchQuery("");
      setResults([]);
    }
  }, [isVisible]);

  // Handle search when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const performSearch = () => {
      setIsSearching(true);

      const searchResults: SearchResult[] = [];
      const query = searchQuery.toLowerCase();

      // Search through all endpoints
      apiEndpoints.forEach((section) => {
        section.endpoints.forEach((endpoint, endpointIndex) => {
          // Match endpoint paths and descriptions
          if (
            endpoint.path.toLowerCase().includes(query) ||
            endpoint.description.toLowerCase().includes(query)
          ) {
            searchResults.push({
              type: "endpoint",
              sectionId: section.id,
              sectionName: section.name,
              endpointIndex,
              method: endpoint.method,
              path: endpoint.path,
              description: endpoint.description,
            });
          }

          // Match parameters
          endpoint.parameters.forEach((param) => {
            if (
              param.name.toLowerCase().includes(query) ||
              param.description.toLowerCase().includes(query)
            ) {
              searchResults.push({
                type: "parameter",
                sectionId: section.id,
                sectionName: section.name,
                endpointIndex,
                method: endpoint.method,
                path: endpoint.path,
                description: `Parameter: ${param.name}`,
                paramName: param.name,
              });
            }
          });

          // Match response descriptions
          endpoint.responses.forEach((response) => {
            if (response.description.toLowerCase().includes(query)) {
              searchResults.push({
                type: "response",
                sectionId: section.id,
                sectionName: section.name,
                endpointIndex,
                method: endpoint.method,
                path: endpoint.path,
                description: `Response: ${response.description}`,
                statusCode: response.status,
              });
            }
          });
        });
      });

      setResults(searchResults);
      setIsSearching(false);
    };

    // Debounce the search
    const timerId = setTimeout(performSearch, 300);
    return () => clearTimeout(timerId);
  }, [searchQuery, apiEndpoints]);

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the corresponding documentation section
    navigate(`/docs/${result.sectionId}`);

    // Close the search
    onClose();

    // In a real implementation, you might use a ref to scroll to the specific endpoint
    // and highlight the relevant content
    setTimeout(() => {
      const endpointElement = document.querySelector(
        `[data-endpoint-path="${result.path}"][data-endpoint-method="${result.method}"]`,
      );

      if (endpointElement) {
        endpointElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add a temporary highlight class
        endpointElement.classList.add("search-highlight");
        setTimeout(() => {
          endpointElement.classList.remove("search-highlight");
        }, 3000);
      }
    }, 300);
  };

  return (
    <div className={`universal-search ${isVisible ? "visible" : ""}`}>
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search API documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="clear-search" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {searchQuery && (
          <div className="search-results">
            {isSearching ? (
              <div className="search-loading">Searching...</div>
            ) : results.length > 0 ? (
              <>
                {/* Group results by section */}
                {Array.from(new Set(results.map((r) => r.sectionId))).map(
                  (sectionId) => {
                    const sectionResults = results.filter(
                      (r) => r.sectionId === sectionId,
                    );
                    const sectionName = sectionResults[0].sectionName;

                    return (
                      <div key={sectionId} className="search-result-group">
                        <h4>{sectionName}</h4>
                        {sectionResults.map((result, index) => (
                          <div
                            key={`${result.sectionId}-${result.method}-${result.path}-${index}`}
                            className="search-result-item"
                            onClick={() => handleResultClick(result)}
                          >
                            <span
                              className={`method method-${result.method.toLowerCase()}`}
                            >
                              {result.method}
                            </span>
                            <div className="search-result-content">
                              <div className="search-result-title">
                                {result.description}
                              </div>
                              <div className="search-result-path">
                                {result.path}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  },
                )}
              </>
            ) : (
              <div className="no-results">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
      <div className="search-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default UniversalSearch;
