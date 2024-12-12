import Hero from "../components/Hero";
import FeatureHighlights from "../components/FeatureHighlights";
import VersionDetails from "../components/VersionDetails";

export default function Home({ selectedVersion }) {
  return (
    <main className="flex-grow">
      <Hero />
      <FeatureHighlights />
      <VersionDetails selectedVersion={selectedVersion} />
    </main>
  );
}
