import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="container py-8 sm:py-10 px-10">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info - Full width on mobile, spans 2 columns on larger screens */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Ai2Aim Logo" 
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
              />
              <span className="text-base sm:text-lg font-extrabold tracking-tight">Ai2Aim</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-md leading-relaxed">
              Applied AI engineering and automation. We design, build, and scale systems that turn data into measurable outcomes.
            </p>
          </div>

          {/* Company Links */}
          <div className="sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground/80 mb-3">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/" className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors duration-200">About</Link></li>
              <li><Link to="/solutions" className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors duration-200">Solutions</Link></li>
              <li><Link to="/contact" className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground/80 mb-3">Get in touch</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="https://ca.linkedin.com/company/ai2aim" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors duration-200">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:contact@ai2aim.ai" className="text-xs sm:text-sm text-foreground/70 hover:text-foreground transition-colors duration-200">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/60">
        <div className="container py-4 sm:py-6 px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs text-foreground/60 text-center sm:text-left">
              © {new Date().getFullYear()} Ai2Aim. All rights reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/privacy" className="text-xs text-foreground/60 hover:text-foreground transition-colors duration-200">Privacy</Link>
              <Link to="/terms" className="text-xs text-foreground/60 hover:text-foreground transition-colors duration-200">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
