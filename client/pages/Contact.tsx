import SiteLayout from "../components/SiteLayout";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Thanks!", description: "We’ll get back to you shortly." });
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div className="absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-3xl animate-pulse" />
        </div>
        <div className="container py-16 md:py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in-up px-4 sm:px-0">
              Schedule A <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Demo</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-foreground/70 animate-fade-in-up animation-delay-200 px-4 sm:px-0">
              Ready to transform your business with AI? Let's discuss how our solutions can accelerate your success.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Custom Solutions
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Expert Support
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-6">
        <div className="grid gap-3 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="grid gap-2 rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm backdrop-blur animate-fade-in-up hover-lift">
            <div className="grid grid-cols-2 gap-1">
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">First*</label>
                <Input required placeholder="First name" className="h-6 text-xs" />
              </div>
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Last*</label>
                <Input required placeholder="Last name" className="h-6 text-xs" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-1">
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Email*</label>
                <Input type="email" required placeholder="email@company.com" className="h-6 text-xs" />
              </div>
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Phone*</label>
                <Input type="tel" required placeholder="+1 (555) 123-4567" className="h-6 text-xs" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-1">
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Company*</label>
                <Input required placeholder="Company" className="h-6 text-xs" />
              </div>
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Size*</label>
                <Select>
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-1">
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Country</label>
                <Select>
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="CA">CA</SelectItem>
                    <SelectItem value="GB">UK</SelectItem>
                    <SelectItem value="AU">AU</SelectItem>
                    <SelectItem value="DE">DE</SelectItem>
                    <SelectItem value="FR">FR</SelectItem>
                    <SelectItem value="JP">JP</SelectItem>
                    <SelectItem value="IN">IN</SelectItem>
                    <SelectItem value="CN">CN</SelectItem>
                    <SelectItem value="BR">BR</SelectItem>
                    <SelectItem value="MX">MX</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-0.5">
                <label className="text-xs font-medium">Time*</label>
                <Select>
                  <SelectTrigger className="h-6 text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 py-0.5">
              <Checkbox id="contact-permission" required className="h-3 w-3" />
              <label htmlFor="contact-permission" className="text-xs font-medium">
                Contact Permission*
              </label>
            </div>
            
            <Button type="submit" className="w-full h-7 text-xs font-medium">
              Book Demo
            </Button>
          </form>

          <div className="space-y-3">
            {/* Contact Information */}
            <div className="rounded-xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-3 shadow-sm backdrop-blur-sm animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-white text-xs"></i>
                </div>
                <h3 className="text-sm font-bold">Get In Touch</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-1">
                  <i className="fas fa-building text-primary mt-0.5 text-xs"></i>
                  <div>
                    <p className="font-medium text-foreground text-xs">Headquarters</p>
                    <p className="text-xs text-foreground/70">9623-66 Avenue NW<br />Edmonton, Alberta T6E 0M2</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <i className="fas fa-envelope text-accent mt-0.5 text-xs"></i>
                  <div>
                    <p className="font-medium text-foreground text-xs">Email</p>
                    <p className="text-xs text-foreground/70">contact@ai2aim.ai</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <i className="fas fa-clock text-primary mt-0.5 text-xs"></i>
                  <div>
                    <p className="font-medium text-foreground text-xs">Hours</p>
                    <p className="text-xs text-foreground/70">Mon–Fri, 9am–6pm (MST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Presence */}
            <div className="rounded-xl border border-border/60 bg-gradient-to-br from-accent/10 via-primary/10 to-background p-3 shadow-sm animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <i className="fas fa-globe text-white text-xs"></i>
                </div>
                <h3 className="text-sm font-bold">Global Presence</h3>
              </div>
              <div className="space-y-2">
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <i className="fas fa-map-marker-alt text-xl mb-1 text-primary"></i>
                  <p className="font-medium text-sm">Edmonton, Alberta</p>
                  <p className="text-xs text-foreground/70">Headquarters & Operations</p>
                </div>
                <div className="mt-1 p-2 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                  <p className="text-xs text-foreground/80 text-center">
                    <span className="font-medium">24/7 Support</span> across time zones
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-accent/10 to-background p-3 shadow-sm animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-star text-white text-xs"></i>
                </div>
                <h3 className="text-sm font-bold">Why Choose Us</h3>
              </div>
              <div className="space-y-1">
                {[
                  "90-day delivery cycles",
                  "Enterprise-grade security",
                  "Custom AI solutions",
                  "Dedicated support team"
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-1">
                    <i className="fas fa-check-circle text-primary text-xs"></i>
                    <span className="text-xs text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
