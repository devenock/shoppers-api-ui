import DocsSidebar from "../components/docs/DocsSidebar";

const Documentation = () => {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <DocsSidebar />
      <div className="flex-1 overflow-auto">
        <main className="flex w-full">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome to the API Documentation
            </h2>
            <p>Select a version from the sidebar to get started.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
