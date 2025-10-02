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

      <section className="container pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur animate-fade-in-up hover-lift">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1 animate-fade-in-up" style={{animationDelay: '100ms'}}>
                <label className="text-xs font-medium">First Name*</label>
                <Input required placeholder="First name" className="h-8 text-sm focus:scale-105 transition-transform duration-300" />
              </div>
              <div className="grid gap-1 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <label className="text-xs font-medium">Last Name*</label>
                <Input required placeholder="Last name" className="h-8 text-sm focus:scale-105 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                <label className="text-xs font-medium">Email*</label>
                <Input type="email" required placeholder="your.email@company.com" className="h-8 text-sm focus:scale-105 transition-transform duration-300" />
              </div>
              <div className="grid gap-1 animate-fade-in-up" style={{animationDelay: '400ms'}}>
                <label className="text-xs font-medium">Phone*</label>
                <Input type="tel" required placeholder="+1 (555) 123-4567" className="h-8 text-sm focus:scale-105 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1 animate-fade-in-up" style={{animationDelay: '500ms'}}>
                <label className="text-xs font-medium">Company Name*</label>
                <Input required placeholder="Company name" className="h-8 text-sm focus:scale-105 transition-transform duration-300" />
              </div>
              <div className="grid gap-1 animate-fade-in-up" style={{animationDelay: '600ms'}}>
                <label className="text-xs font-medium">Employees*</label>
                <Select>
                  <SelectTrigger className="h-8 text-sm focus:scale-105 transition-transform duration-300">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1 - 10</SelectItem>
                    <SelectItem value="11-50">11 - 50</SelectItem>
                    <SelectItem value="51-200">51 - 200</SelectItem>
                    <SelectItem value="201-500">201 - 500</SelectItem>
                    <SelectItem value="501-1000">501 - 1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <label className="text-xs font-medium">Country</label>
                <Select>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="CN">China</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium">Best Time to Call*</label>
                <Select>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select time" />
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
            
            <div className="flex items-center space-x-2 py-2">
              <Checkbox id="contact-permission" required className="h-4 w-4" />
              <label htmlFor="contact-permission" className="text-xs font-medium">
                May We Contact You?*
              </label>
            </div>
            
            <Button type="submit" className="w-full h-10 text-sm font-medium animate-fade-in-up hover:scale-105 transition-all duration-300 hover:shadow-lg" style={{animationDelay: '800ms'}}>
              Book A Demo
            </Button>
          </form>

          <div className="space-y-6">
            {/* Contact Information */}
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 to-background/60 p-6 shadow-sm backdrop-blur-sm animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Get In Touch</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-building text-primary mt-1"></i>
                  <div>
                    <p className="font-medium text-foreground">Headquarters</p>
                    <p className="text-sm text-foreground/70">9623-66 Avenue NW<br />Edmonton, Alberta T6E 0M2, Canada</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-envelope text-accent mt-1"></i>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-foreground/70">contact@ai2aim.ai</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-clock text-primary mt-1"></i>
                  <div>
                    <p className="font-medium text-foreground">Business Hours</p>
                    <p className="text-sm text-foreground/70">Mon–Fri, 9am–6pm (MST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Presence */}
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 via-primary/10 to-background p-6 shadow-sm animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <i className="fas fa-globe text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Global Presence</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center p-6 rounded-lg bg-background/50">
                  <i className="fas fa-map-marker-alt text-3xl mb-3 text-primary"></i>
                  <p className="font-medium text-lg">Edmonton, Alberta</p>
                  <p className="text-sm text-foreground/70">Headquarters & Operations</p>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                  <p className="text-sm text-foreground/80 text-center">
                    <span className="font-medium">24/7 Support</span> across time zones
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-accent/10 to-background p-6 shadow-sm animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className="fas fa-star text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold">Why Choose Us</h3>
              </div>
              <div className="space-y-3">
                {[
                  "90-day delivery cycles",
                  "Enterprise-grade security",
                  "Custom AI solutions",
                  "Dedicated support team"
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary text-sm"></i>
                    <span className="text-sm text-foreground/80">{item}</span>
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
