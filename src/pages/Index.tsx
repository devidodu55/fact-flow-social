
import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Fact from "@/components/Fact";
import AuthModal from "@/components/AuthModal";
import { facts } from "@/lib/mockData";

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
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
          
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
