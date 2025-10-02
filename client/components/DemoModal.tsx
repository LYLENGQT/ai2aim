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
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden [&>button]:hidden">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-bold text-center">
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
        
        <div className="mt-3">
          <p className="text-center text-foreground/70 mb-4 text-sm">
            Ready to transform your business with AI? Let's discuss how our solutions can accelerate your success.
          </p>
          
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <label className="text-xs font-medium">First Name*</label>
                <Input required placeholder="First name" className="h-8 text-sm" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium">Last Name*</label>
                <Input required placeholder="Last name" className="h-8 text-sm" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <label className="text-xs font-medium">Email*</label>
                <Input type="email" required placeholder="your.email@company.com" className="h-8 text-sm" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium">Phone*</label>
                <Input type="tel" required placeholder="+1 (555) 123-4567" className="h-8 text-sm" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <label className="text-xs font-medium">Company Name*</label>
                <Input required placeholder="Company name" className="h-8 text-sm" />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium">Employees*</label>
                <Select>
                  <SelectTrigger className="h-8 text-sm">
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
            
            <Button type="submit" className="w-full h-10 text-sm font-medium">
              Book A Demo
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}