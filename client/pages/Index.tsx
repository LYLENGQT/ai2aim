import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Button } from "../components/ui/button";
import { ArrowRight, Linkedin } from "lucide-react";
import DemoModal from "../components/DemoModal";

export default function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-accent/25 to-transparent blur-3xl animate-pulse" />
        </div>
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-xs text-foreground/70 shadow-sm animate-fade-in-up">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              AI Engineering & Automation
            </div>
            <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in-up animation-delay-200 font-heading">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                We build AI systems that convert intent into outcomes
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-foreground/70 animate-fade-in-up animation-delay-400 px-4 sm:px-0">
            Ai2Aim is a dedicated team building and scaling practical and secure AI solutions, including LLM applications, automation, data platforms, and MLOps, to streamline operations and solve complex business challenges for measurable results.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up animation-delay-600">
              <DemoModal>
                <Button className="h-12 px-6 text-base shadow-[0_0_35px_-10px_hsl(var(--primary))] hover:shadow-[0_0_50px_-10px_hsl(var(--primary))] transition-all duration-300 hover:scale-105">
                  Book a demo
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </DemoModal>
              <a href="#solutions" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 no-underline">
                See solutions
              </a>
            </div>
            <div className="grid place-items-center animate-fade-in-up animation-delay-800">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border border-white/70 bg-gradient-to-br from-primary/70 to-accent/70 animate-bounce" style={{animationDelay: '0s'}} />
                  <span className="h-7 w-7 rounded-full border border-white/70 bg-gradient-to-br from-accent/70 to-primary/70 animate-bounce" style={{animationDelay: '0.2s'}} />
                  <span className="h-7 w-7 rounded-full border border-white/70 bg-gradient-to-br from-primary/70 to-accent/70 animate-bounce" style={{animationDelay: '0.4s'}} />
                </div>
                <span>
                Trusted by businesses seeking practical AI solutions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed right-4 top-1/3 hidden flex-col items-center gap-2 rounded-full border border-border/60 bg-background/80 p-2 shadow-sm md:flex">
          <a href="https://ca.linkedin.com/company/ai2aim" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-foreground/70 hover:text-foreground">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="solutions" className="border-t border-border/60 bg-muted/20">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Solutions</h2>
            <p className="text-foreground/70">
              Modular capabilities. Enterprise-grade delivery. Start focused, scale with confidence.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI-Powered Platforms",
                description: "Intelligent systems that learn and adapt to your business needs",
                icon: "fas fa-robot",
                color: "from-primary/10 to-primary/5"
              },
              {
                title: "Business Automation",
                description: "Streamline operations with smart workflow automation",
                icon: "fas fa-bolt",
                color: "from-accent/10 to-accent/5"
              },
              {
                title: "SaaS Solutions",
                description: "Scalable cloud-based applications for modern enterprises",
                icon: "fas fa-cloud",
                color: "from-primary/10 to-accent/5"
              },
              {
                title: "Digital Transformation",
                description: "Complete digital overhaul with measurable business outcomes",
                icon: "fas fa-rocket",
                color: "from-accent/10 to-primary/5"
              },
              {
                title: "Data Analytics",
                description: "Turn data into actionable insights with advanced analytics",
                icon: "fas fa-chart-bar",
                color: "from-primary/10 to-primary/5"
              },
              {
                title: "Enterprise Software",
                description: "Custom solutions built for your specific requirements",
                icon: "fas fa-building",
                color: "from-accent/10 to-accent/5"
              }
            ].map((solution, index) => (
              <div
                key={solution.title}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:scale-[1.05] hover:-translate-y-2 animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <i className={`${solution.icon} text-3xl text-primary group-hover:scale-110 transition-transform duration-300`}></i>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-lg text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    {solution.description}
                  </p>
                  <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for outcomes, not hype</h2>
              <p className="text-foreground/70">
                We focus on shipping systems that make work faster, smarter, and safer—measured by your KPIs. From discovery to production, we align AI with your operating reality.
              </p>
              <ul className="grid gap-3 text-sm text-foreground/80">
                <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />Rapid 90-day delivery cycles</li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />Security, privacy, and compliance-first</li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />Transparent evaluation and guardrails</li>
              </ul>
              <div>
                <Link to="/solutions" className="text-primary font-medium hover:text-primary/80 transition-colors duration-300 no-underline">Explore solutions</Link>
              </div>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-accent/10 to-background p-8 shadow-sm">
                <div className="text-center">
                  <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <i className="fas fa-bullseye text-2xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Focused on Results</h3>
                  <p className="text-foreground/70">
                    We measure success by your business outcomes, not just technical metrics. Every solution is designed to deliver measurable value to your organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="border-t border-border/60 bg-muted/20">
        <div className="container py-12 md:py-16">
          <div className="grid items-center gap-6 rounded-2xl border border-border/60 bg-background p-6 shadow-sm md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">Ready to aim AI at your goals?</h3>
              <p className="text-foreground/70">Share your objectives and constraints—we will propose a practical path that respects your reality.</p>
            </div>
            <div className="md:text-right">
              <DemoModal>
                <Button className="h-11 px-6">Start a project</Button>
              </DemoModal>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
