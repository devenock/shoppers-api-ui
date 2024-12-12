import "./styles/App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [selectedVersion, setSelectedVersion] = useState("express");
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={<Home selectedVersion={selectedVersion} />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
