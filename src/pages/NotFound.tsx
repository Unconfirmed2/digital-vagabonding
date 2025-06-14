import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center max-w-4xl">
          <a href="/" className="mr-4">
            <span className="text-blue-500 hover:text-blue-700 underline">
              Home
            </span>
          </a>
          <h1 className="text-2xl font-bold text-gray-900 ml-2">
            404 Not Found
          </h1>
        </div>
      </div>
      {/* Spacer for fixed header */}
      <div style={{ paddingTop: "80px" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
