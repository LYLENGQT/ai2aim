import SiteLayout from "../components/SiteLayout";

export default function About() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div className="absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-3xl" />
        </div>
        <div className="container section-padding-lg text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in-up px-4 sm:px-0">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">AI2Aim</span>
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-sm sm:text-base text-foreground/70 animate-fade-in-up animation-delay-200 px-4 sm:px-0">
            Ai2Aim Inc. is an emerging technology startup focused on harnessing the power of artificial intelligence to solve complex organizational challenges. Founded with the mission to enhance knowledge management and collaboration in modern enterprises, Ai2Aim is developing its flagship platforms designed to streamline operations and solve intricate business problems.
          </p>
          
          {/* Key Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto px-4 sm:px-0">
            <div className="text-center animate-scale-in" style={{animationDelay: '400ms'}}>
              <div className="text-3xl font-bold text-primary hover:scale-110 transition-transform duration-300">2025</div>
              <div className="text-sm text-foreground/70 mt-1">Founded</div>
            </div>
            <div className="text-center animate-scale-in" style={{animationDelay: '500ms'}}>
              <div className="text-3xl font-bold text-accent hover:scale-110 transition-transform duration-300">11-50</div>
              <div className="text-sm text-foreground/70 mt-1">Employees</div>
            </div>
            <div className="text-center animate-scale-in" style={{animationDelay: '600ms'}}>
              <div className="text-3xl font-bold text-primary hover:scale-110 transition-transform duration-300">90%</div>
              <div className="text-sm text-foreground/70 mt-1">Success Rate</div>
            </div>
            <div className="text-center animate-scale-in" style={{animationDelay: '700ms'}}>
              <div className="text-3xl font-bold text-accent hover:scale-110 transition-transform duration-300">AI</div>
              <div className="text-sm text-foreground/70 mt-1">Powered</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="mx-auto max-w-4xl content-spacing">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl text-center px-4 sm:px-0">Company Overview</h2>
          <p className="text-center text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto mt-4 px-4 sm:px-0">
            Building the future of AI-powered business solutions with a focus on innovation and enterprise excellence.
          </p>
          
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 mt-12">
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-accent/10 to-background p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white text-lg">🏢</span>
                </div>
                <h3 className="text-xl font-bold">Key Information</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground/70">Founded:</span>
                  <span className="text-foreground">2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground/70">Headquarters:</span>
                  <span className="text-foreground">Edmonton, Alberta, Canada</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground/70">Company Size:</span>
                  <span className="text-foreground">11-50 employees</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground/70">Industry:</span>
                  <span className="text-foreground">Technology, Information and Internet</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 via-primary/10 to-background p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <h3 className="text-xl font-bold">Our Focus</h3>
              </div>
              <div className="space-y-3 text-sm text-foreground/70">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>AI-powered solutions for organizational challenges</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>Knowledge management and collaboration</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>Streamlining operations and business processes</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>Enterprise-grade platform development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container section-padding">
          <div className="mx-auto max-w-4xl content-spacing">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-center">What We Do</h2>
            <p className="text-center text-lg text-foreground/70 max-w-3xl mx-auto">
              We deliver a comprehensive, enterprise-grade ecosystem that empowers organizations of all sizes across industries to accelerate innovation, streamline operations, achieve scalable growth, simplify decision-making, and unlock new growth opportunities by using the power of Artificial Intelligence.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 mt-12">
              <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    SaaS Solutions & AI-Powered Platforms
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    Business Automation & Workflow Optimization
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    Educational Technology (EdTech) & Corporate Training
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    Digital Transformation & Innovation Consulting
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                    Cloud-Based Applications & Performance Analytics
                  </li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Who We Serve</h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    Startups & MSMEs
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    Multinational Enterprises
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    Non-profit Organizations
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    Educational Institutions
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
                    Government Agencies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="mx-auto max-w-4xl content-spacing">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-center">Our Approach</h2>
          <p className="text-center text-lg text-foreground/70 max-w-2xl mx-auto">
            We are more than just a software. We provide you with the AI infrastructure to achieve the AIM that matters you the most.
          </p>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Strategy First</h3>
              <p className="text-foreground/70">We start with understanding your business goals and challenges before proposing solutions.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid Execution</h3>
              <p className="text-foreground/70">From strategy to implementation, we deliver results quickly with measurable outcomes.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Scalable Growth</h3>
              <p className="text-foreground/70">Our solutions grow with your business, ensuring long-term success and adaptability.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
