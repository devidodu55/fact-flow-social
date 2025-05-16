
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Fact from "@/components/Fact";
import AuthModal from "@/components/AuthModal";
import { facts } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // This effect is to ensure proper scroll behavior for mobile devices
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const height = window.innerHeight;
      const scrollTop = container.scrollTop;
      const snapPoint = Math.round(scrollTop / height) * height;
      
      if (Math.abs(scrollTop - snapPoint) < 10) {
        container.scrollTo({
          top: snapPoint,
          behavior: "smooth"
        });
      }
    };

    container.addEventListener("scrollend", handleScroll);
    
    return () => {
      container.removeEventListener("scrollend", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/reactions">
          <Button variant="default" size="lg" className="rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Global Reactions
          </Button>
        </Link>
      </div>
      
      <div ref={containerRef} className="snap-container no-scrollbar">
        {facts.map((fact) => (
          <Fact 
            key={fact.id} 
            fact={fact} 
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        ))}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
