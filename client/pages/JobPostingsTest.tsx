import SiteLayout from "../components/SiteLayout";

export default function JobPostingsTest() {
  return (
    <SiteLayout>
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Jobs Test Page</h1>
          <p className="text-xl text-foreground/70">
            This is a test page to verify the routing works.
          </p>
          <div className="mt-8">
            <p>If you can see this, the basic routing is working!</p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
