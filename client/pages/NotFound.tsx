import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteLayout from "../components/SiteLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="container py-24">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-2">404</h1>
          <p className="text-lg text-foreground/70 mb-4">Page not found</p>
          <a href="/" className="text-primary hover:underline">Return to Home</a>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
