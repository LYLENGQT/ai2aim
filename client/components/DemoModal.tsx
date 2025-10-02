import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "../hooks/use-toast";
import { X } from "lucide-react";

interface DemoModalProps {
  children: React.ReactNode;
}

export default function DemoModal({ children }: DemoModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Thanks!", description: "We'll get back to you shortly." });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-center">
            Schedule A <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Demo</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-8 w-8 p-0"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-center text-foreground/70 mb-6">
            Ready to transform your business with AI? Let's discuss how our solutions can accelerate your success.
          </p>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">First Name*</label>
                <Input required placeholder="First name" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Last Name*</label>
                <Input required placeholder="Last name" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email*</label>
              <Input type="email" required placeholder="your.email@company.com" />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Phone*</label>
              <Input type="tel" required placeholder="+1 (555) 123-4567" />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Your Company Name*</label>
              <Input required placeholder="Company name" />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Number Of Employees*</label>
              <Select>
                <SelectTrigger>
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
            
            <Button type="submit" className="w-full h-12 text-base font-medium">
              Book A Demo
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
