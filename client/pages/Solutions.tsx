import SiteLayout from "../components/SiteLayout";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { BrainCircuit, Workflow, Building2, Layers, Rocket, ShieldCheck } from "lucide-react";

export default function Solutions() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div className="absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-3xl" />
        </div>
        <div className="container py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight px-4 sm:px-0" data-aos="fade-up">Solutions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-foreground/70 px-4 sm:px-0" data-aos="fade-up" data-aos-delay="200">One platform, myriad solutions. A modular ecosystem to accelerate innovation and scale outcomes across your org.</p>
        </div>
      </section>

      <section className="container pb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            icon: BrainCircuit,
            title: "AI-Powered Platforms",
            desc: "Unified AI services with guardrails, evaluation, and observability.",
          },{
            icon: Workflow,
            title: "Workflow Automation",
            desc: "Orchestrate people, data, and tools to eliminate manual toil.",
          },{
            icon: Building2,
            title: "Enterprise Enablement",
            desc: "Security, compliance, tenancy, and RBAC built-in.",
          },{
            icon: Layers,
            title: "Data & Integration",
            desc: "Connect SaaS, databases, and APIs with reliable pipelines.",
          },{
            icon: ShieldCheck,
            title: "Trust & Safety",
            desc: "Policy, red-teaming, and governance for responsible AI.",
          },{
            icon: Rocket,
            title: "Go-to-Market Speed",
            desc: "90-day delivery cycles that ship value, not just slides.",
          }].map(({icon:Icon, title, desc}, index) => (
            <Card key={title} className="group border-border/60 bg-background/80 backdrop-blur hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-lg" data-aos="fade-up" data-aos-delay={index * 100}>
              <CardHeader>
                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-primary/80 to-accent/70 grid place-items-center text-white shadow group-hover:scale-110 transition-transform duration-300" aria-hidden>
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4 text-lg group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
                <CardDescription className="group-hover:text-foreground/90 transition-colors duration-300">{desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="mx-auto max-w-6xl" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-aos="fade-up" data-aos-delay="200">Full Catalog</h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
              Comprehensive solutions across industries. From AI-powered platforms to enterprise software, we deliver the technology your business needs.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* AI & Automation Solutions */}
            <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-robot text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">AI & Automation</h3>
              </div>
              <div className="space-y-2">
                {["AI-Powered Platforms", "Intelligent Process Automation", "Workflow Optimization", "Smart Data Integration", "AI for Enterprises"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* SaaS & Cloud Solutions */}
            <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-lg hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <i className="fas fa-cloud text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">SaaS & Cloud</h3>
              </div>
              <div className="space-y-2">
                {["SaaS Solutions", "Cloud-Based Applications", "Scalable Software Solutions", "Enterprise Software Solutions", "Custom SaaS Development"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Solutions */}
            <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-building text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Business Solutions</h3>
              </div>
              <div className="space-y-2">
                {["Business Automation", "Digital Transformation", "Innovation Consulting", "Performance Analytics", "Productivity Software"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Training */}
            <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-lg hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Education & Training</h3>
              </div>
              <div className="space-y-2">
                {["Educational Technology (EdTech)", "Corporate Training Solutions", "Academic & Corporate Collaboration Tools", "Skill Development Tools", "AI in Education"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Systems */}
            <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-brain text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Learning Systems</h3>
              </div>
              <div className="space-y-2">
                {["Intelligent Learning Systems", "Learning Management Systems (LMS)", "AI-Powered Learning", "Adaptive Learning Platforms", "Knowledge Management"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Solutions */}
            <div className="group rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-lg hover:scale-[1.02]" data-aos="fade-up" data-aos-delay="600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <i className="fas fa-tools text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Enterprise Solutions</h3>
              </div>
              <div className="space-y-2">
                {["Enterprise Software Solutions", "Large-scale Implementations", "Enterprise Integration", "Scalable Architecture", "Enterprise Security"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
                {item}
                  </div>
            ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="700">
            <Link to="/contact">
              <Button className="h-12 px-8 text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Start Your Project
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container py-16">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {["Discover","Design","Deliver"].map((step, i) => (
              <div key={step} className="relative rounded-xl border border-border/60 bg-background p-6 shadow-sm" data-aos="fade-up" data-aos-delay={i * 200}>
                <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow">{i+1}</div>
                <h3 className="text-lg font-semibold">{step}</h3>
                <p className="mt-2 text-sm text-foreground/70">{step === "Discover" ? "Assess opportunities, risks, and ROI; align with KPIs." : step === "Design" ? "Prototype, evaluate, and set guardrails with stakeholders." : "Ship, observe, iterate—every cycle improves outcomes."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
