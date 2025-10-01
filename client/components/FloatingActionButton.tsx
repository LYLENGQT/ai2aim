import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', toggleVisibility);
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        size="icon"
      >
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}
