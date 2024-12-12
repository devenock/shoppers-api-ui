import "./styles/App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Documentation from "./pages/Documentation";

const App = () => {
  const [selectedVersion, setSelectedVersion] = useState("express");
  const location = useLocation();
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {location.pathname.includes("docs") ? (
          <p>Navbar New</p>
        ) : (
          <Navbar
            selectedVersion={selectedVersion}
            setSelectedVersion={setSelectedVersion}
          />
        )}
        <Routes>
          <Route
            path="/"
            exact
            element={<Home selectedVersion={selectedVersion} />}
          />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
        {location.pathname === "/" ? <Footer /> : ""}
      </div>
    </BrowserRouter>
  );
};

export default App;
