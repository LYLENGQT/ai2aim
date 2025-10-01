import SiteLayout from "../components/SiteLayout";

export default function Terms() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div className="absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-3xl" />
        </div>
        <div className="container py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in-up font-heading">
            Terms of Service
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-foreground/70 animate-fade-in-up animation-delay-200">
            These terms govern your use of our services. Please read them carefully.
          </p>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mx-auto max-w-4xl content-spacing">
          <div className="prose prose-gray max-w-none">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-foreground/70 mb-6">
                By accessing and using our services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-200">
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="text-foreground/70 mb-6">
                Permission is granted to temporarily download one copy of our materials for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not modify or copy the materials.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl font-bold mb-4">Service Description</h2>
              <p className="text-foreground/70 mb-6">
                AI2Aim provides AI-powered solutions and consulting services. We reserve the right to 
                modify, suspend, or discontinue any part of our services at any time without notice. 
                We do not guarantee that our services will be available at all times.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="text-foreground/70 mb-6">
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account 
                or password. You must not use our services for any unlawful purpose or any purpose 
                prohibited under this clause.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-800">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-foreground/70 mb-6">
                The service and its original content, features, and functionality are and will remain 
                the exclusive property of AI2Aim and its licensors. The service is protected by 
                copyright, trademark, and other laws. Our trademarks may not be used in connection 
                with any product or service without our prior written consent.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1000">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-foreground/70 mb-6">
                In no event shall AI2Aim, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or 
                punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the service.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1200">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-foreground/70 mb-6">
                We may terminate or suspend your account and bar access to the service immediately, 
                without prior notice or liability, under our sole discretion, for any reason whatsoever 
                and without limitation, including but not limited to a breach of the Terms.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1400">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-foreground/70 mb-6">
                These Terms shall be interpreted and governed by the laws of Alberta, Canada, without 
                regard to its conflict of law provisions. Our failure to enforce any right or provision 
                of these Terms will not be considered a waiver of those rights.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1600">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-foreground/70 mb-6">
                We reserve the right, at our sole discretion, to modify or replace these Terms at 
                any time. If a revision is material, we will provide at least 30 days notice prior 
                to any new terms taking effect.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-1800">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-foreground/70 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/20 rounded-lg p-6">
                <p className="text-foreground/80">
                  <strong>Email:</strong> legal@ai2aim.ai<br />
                  <strong>Address:</strong> 9623-66 Avenue NW, Edmonton, Alberta T6E 0M2, Canada
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 animate-fade-in-up animation-delay-2000">
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
