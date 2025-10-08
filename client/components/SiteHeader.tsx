import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import DemoModal from "./DemoModal";
import ChatButton from "./ChatButton";

interface SiteHeaderProps {
  onOpenChat?: () => void;
}

export default function SiteHeader({ onOpenChat }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 transform rounded-md ${
      isActive ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/60">
      <div className="container relative flex h-16 items-center px-10">
        {/* Logo - Left */}
        <div className="flex-shrink-0 ml-4">
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="Ai2Aim Logo" 
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain"
            />
            <span className="text-base sm:text-lg font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">Ai2</span>
              <span>Aim</span>
            </span>
          </Link>
        </div>

        {/* Navigation - Absolute Center */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/solutions" className={navLinkClass}>
            Solutions
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Buttons - Right */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <ChatButton variant="outline" size="sm" onClick={onOpenChat}>
            Ask AimBot
          </ChatButton>
          <DemoModal>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_-10px_hsl(var(--primary))]">
              Schedule a demo
            </Button>
          </DemoModal>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-border/60 p-2 hover:bg-muted/50 transition-colors duration-200"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <div className="relative w-5 h-5">
            <Menu className={`h-5 w-5 absolute transition-all duration-500 ease-out ${
              open ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`} />
            <X className={`h-5 w-5 absolute transition-all duration-500 ease-out ${
              open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`} />
          </div>
        </button>
      </div>

      <div className={`md:hidden border-t border-border/60 transition-all duration-500 ease-out overflow-hidden ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container py-6">
          <div className="space-y-2">
            <NavLink 
              to="/" 
              className={`${navLinkClass} block transform transition-all duration-500 ease-out ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`} 
              end 
              onClick={() => setOpen(false)}
              style={{transitionDelay: open ? '150ms' : '0ms'}}
            >
              Home
            </NavLink>
            <NavLink 
              to="/solutions" 
              className={`${navLinkClass} block transform transition-all duration-500 ease-out ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`} 
              onClick={() => setOpen(false)}
              style={{transitionDelay: open ? '200ms' : '0ms'}}
            >
              Solutions
            </NavLink>
            <NavLink 
              to="/about" 
              className={`${navLinkClass} block transform transition-all duration-500 ease-out ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`} 
              onClick={() => setOpen(false)}
              style={{transitionDelay: open ? '250ms' : '0ms'}}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={`${navLinkClass} block transform transition-all duration-500 ease-out ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`} 
              onClick={() => setOpen(false)}
              style={{transitionDelay: open ? '300ms' : '0ms'}}
            >
              Contact
            </NavLink>
          </div>
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className={`transform transition-all duration-500 ease-out ${
              open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
            }`} style={{transitionDelay: open ? '350ms' : '0ms'}}>
              <div className="flex items-center justify-center gap-3">
                <ThemeToggle />
                <ChatButton variant="outline" size="sm" onClick={() => { setOpen(false); onOpenChat?.(); }}>
                  Ask AimBot
                </ChatButton>
                <DemoModal>
                  <Button size="sm" className="px-4" onClick={() => setOpen(false)}>Schedule a demo</Button>
                </DemoModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
