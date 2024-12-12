import "./styles/App.css";
import Footer from "./components/Footer";
import VersionDetails from "./components/VersionDetails";
import FeatureHighlights from "./components/FeatureHighlights";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [selectedVersion, setSelectedVersion] = useState("express");
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
      />
      <main className="flex-grow">
        <Hero />
        <FeatureHighlights />
        <VersionDetails selectedVersion={selectedVersion} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
