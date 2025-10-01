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

      <section className="container pb-20">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="grid gap-6 rounded-2xl border border-border/60 bg-background/80 p-6 sm:p-8 shadow-sm backdrop-blur animate-fade-in-up hover-lift">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2 animate-fade-in-up" style={{animationDelay: '100ms'}}>
                <label className="text-sm font-medium">First Name*</label>
                <Input required placeholder="First name" className="focus:scale-105 transition-transform duration-300" />
              </div>
              <div className="grid gap-2 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <label className="text-sm font-medium">Last Name*</label>
                <Input required placeholder="Last name" className="focus:scale-105 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="grid gap-2 animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <label className="text-sm font-medium">Email*</label>
              <Input type="email" required placeholder="your.email@company.com" className="focus:scale-105 transition-transform duration-300" />
            </div>
            
            <div className="grid gap-2 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <label className="text-sm font-medium">Phone*</label>
              <Input type="tel" required placeholder="+1 (555) 123-4567" className="focus:scale-105 transition-transform duration-300" />
            </div>
            
            <div className="grid gap-2 animate-fade-in-up" style={{animationDelay: '500ms'}}>
              <label className="text-sm font-medium">Your Company Name*</label>
              <Input required placeholder="Company name" className="focus:scale-105 transition-transform duration-300" />
            </div>
            
            <div className="grid gap-2 animate-fade-in-up" style={{animationDelay: '600ms'}}>
              <label className="text-sm font-medium">Number Of Employees*</label>
              <Select>
                <SelectTrigger className="focus:scale-105 transition-transform duration-300">
                  <SelectValue placeholder="Select employee count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1 - 10 Employees</SelectItem>
                  <SelectItem value="11-50">11 - 50 Employees</SelectItem>
                  <SelectItem value="51-200">51 - 200 Employees</SelectItem>
                  <SelectItem value="201-500">201 - 500 Employees</SelectItem>
                  <SelectItem value="501-1000">501 - 1000 Employees</SelectItem>
                  <SelectItem value="1000+">1000+ Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Country</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AF">Afghanistan</SelectItem>
                  <SelectItem value="AL">Albania</SelectItem>
                  <SelectItem value="DZ">Algeria</SelectItem>
                  <SelectItem value="AR">Argentina</SelectItem>
                  <SelectItem value="AM">Armenia</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="AT">Austria</SelectItem>
                  <SelectItem value="AZ">Azerbaijan</SelectItem>
                  <SelectItem value="BH">Bahrain</SelectItem>
                  <SelectItem value="BD">Bangladesh</SelectItem>
                  <SelectItem value="BY">Belarus</SelectItem>
                  <SelectItem value="BE">Belgium</SelectItem>
                  <SelectItem value="BO">Bolivia</SelectItem>
                  <SelectItem value="BA">Bosnia and Herzegovina</SelectItem>
                  <SelectItem value="BR">Brazil</SelectItem>
                  <SelectItem value="BG">Bulgaria</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="CL">Chile</SelectItem>
                  <SelectItem value="CN">China</SelectItem>
                  <SelectItem value="CO">Colombia</SelectItem>
                  <SelectItem value="CR">Costa Rica</SelectItem>
                  <SelectItem value="HR">Croatia</SelectItem>
                  <SelectItem value="CY">Cyprus</SelectItem>
                  <SelectItem value="CZ">Czech Republic</SelectItem>
                  <SelectItem value="DK">Denmark</SelectItem>
                  <SelectItem value="DO">Dominican Republic</SelectItem>
                  <SelectItem value="EC">Ecuador</SelectItem>
                  <SelectItem value="EG">Egypt</SelectItem>
                  <SelectItem value="EE">Estonia</SelectItem>
                  <SelectItem value="FI">Finland</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="GE">Georgia</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="GH">Ghana</SelectItem>
                  <SelectItem value="GR">Greece</SelectItem>
                  <SelectItem value="GT">Guatemala</SelectItem>
                  <SelectItem value="HN">Honduras</SelectItem>
                  <SelectItem value="HK">Hong Kong</SelectItem>
                  <SelectItem value="HU">Hungary</SelectItem>
                  <SelectItem value="IS">Iceland</SelectItem>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="ID">Indonesia</SelectItem>
                  <SelectItem value="IE">Ireland</SelectItem>
                  <SelectItem value="IL">Israel</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="JM">Jamaica</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                  <SelectItem value="JO">Jordan</SelectItem>
                  <SelectItem value="KZ">Kazakhstan</SelectItem>
                  <SelectItem value="KE">Kenya</SelectItem>
                  <SelectItem value="KR">South Korea</SelectItem>
                  <SelectItem value="KW">Kuwait</SelectItem>
                  <SelectItem value="LV">Latvia</SelectItem>
                  <SelectItem value="LB">Lebanon</SelectItem>
                  <SelectItem value="LT">Lithuania</SelectItem>
                  <SelectItem value="LU">Luxembourg</SelectItem>
                  <SelectItem value="MY">Malaysia</SelectItem>
                  <SelectItem value="MT">Malta</SelectItem>
                  <SelectItem value="MX">Mexico</SelectItem>
                  <SelectItem value="MD">Moldova</SelectItem>
                  <SelectItem value="MA">Morocco</SelectItem>
                  <SelectItem value="NL">Netherlands</SelectItem>
                  <SelectItem value="NZ">New Zealand</SelectItem>
                  <SelectItem value="NI">Nicaragua</SelectItem>
                  <SelectItem value="NG">Nigeria</SelectItem>
                  <SelectItem value="NO">Norway</SelectItem>
                  <SelectItem value="OM">Oman</SelectItem>
                  <SelectItem value="PK">Pakistan</SelectItem>
                  <SelectItem value="PA">Panama</SelectItem>
                  <SelectItem value="PE">Peru</SelectItem>
                  <SelectItem value="PH">Philippines</SelectItem>
                  <SelectItem value="PL">Poland</SelectItem>
                  <SelectItem value="PT">Portugal</SelectItem>
                  <SelectItem value="QA">Qatar</SelectItem>
                  <SelectItem value="RO">Romania</SelectItem>
                  <SelectItem value="RU">Russia</SelectItem>
                  <SelectItem value="SA">Saudi Arabia</SelectItem>
                  <SelectItem value="SG">Singapore</SelectItem>
                  <SelectItem value="SK">Slovakia</SelectItem>
                  <SelectItem value="SI">Slovenia</SelectItem>
                  <SelectItem value="ZA">South Africa</SelectItem>
                  <SelectItem value="ES">Spain</SelectItem>
                  <SelectItem value="LK">Sri Lanka</SelectItem>
                  <SelectItem value="SE">Sweden</SelectItem>
                  <SelectItem value="CH">Switzerland</SelectItem>
                  <SelectItem value="TW">Taiwan</SelectItem>
                  <SelectItem value="TH">Thailand</SelectItem>
                  <SelectItem value="TR">Turkey</SelectItem>
                  <SelectItem value="UA">Ukraine</SelectItem>
                  <SelectItem value="AE">United Arab Emirates</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UY">Uruguay</SelectItem>
                  <SelectItem value="VE">Venezuela</SelectItem>
                  <SelectItem value="VN">Vietnam</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="contact-permission" required />
              <label htmlFor="contact-permission" className="text-sm font-medium">
                May We Contact You?*
              </label>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Best Time to Call*</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select best time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning [ 10:00 AM - 11:59 AM ]</SelectItem>
                  <SelectItem value="afternoon">Afternoon [ 12:00 PM - 5:00 PM ]</SelectItem>
                  <SelectItem value="evening">Evening [ 5:00 PM - 8:00 PM ]</SelectItem>
                  <SelectItem value="flexible">Flexible - Any time works</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full h-12 text-base font-medium animate-fade-in-up hover:scale-105 transition-all duration-300 hover:shadow-lg" style={{animationDelay: '800ms'}}>
              Book A Demo
            </Button>
          </form>

          <div className="space-y-8">
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
