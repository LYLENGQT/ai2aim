import SiteLayout from "../components/SiteLayout";

export default function Privacy() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div className="absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-3xl" />
        </div>
        <div className="container py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in-up font-heading">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-foreground/70 animate-fade-in-up animation-delay-200">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mx-auto max-w-4xl content-spacing">
          <div className="prose prose-gray max-w-none">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-foreground/70 mb-6">
                We collect information you provide directly to us, such as when you create an account, 
                contact us, or use our services. This may include your name, email address, phone number, 
                company information, and any other information you choose to provide.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-200">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-foreground/70 mb-6">
                We use the information we collect to provide, maintain, and improve our services, 
                communicate with you, and ensure the security of our platform. We may also use 
                your information for analytics and to personalize your experience.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-foreground/70 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy. We may share information with 
                trusted service providers who assist us in operating our website and conducting our business.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-foreground/70 mb-6">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-800">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-foreground/70 mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1000">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-foreground/70 mb-6">
                You have the right to access, update, or delete your personal information. You may also 
                opt out of certain communications from us. To exercise these rights, please contact us 
                using the information provided below.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1200">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-foreground/70 mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1400">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-foreground/70 mb-6">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <div className="bg-muted/20 rounded-lg p-6">
                <p className="text-foreground/80">
                  <strong>Email:</strong> privacy@ai2aim.ai<br />
                  <strong>Address:</strong> 9623-66 Avenue NW, Edmonton, Alberta T6E 0M2, Canada
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 animate-fade-in-up animation-delay-1600">
              <p className="text-sm text-foreground/60">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
