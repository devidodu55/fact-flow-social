
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Fact from "@/components/Fact";
import AuthModal from "@/components/AuthModal";
import { facts } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../animations.css";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // This effect creates smooth scrolling between facts
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const height = window.innerHeight;
      
      const newIndex = Math.max(
        0, 
        Math.min(facts.length - 1, currentFactIndex + direction)
      );
      
      if (newIndex !== currentFactIndex) {
        setCurrentFactIndex(newIndex);
        window.scrollTo({
          top: newIndex * height,
          behavior: 'smooth'
        });
      }
    };
    
    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentFactIndex]);

  // Handle touch events for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) < 50) return;
      
      const direction = diff > 0 ? 1 : -1;
      const height = window.innerHeight;
      
      const newIndex = Math.max(
        0, 
        Math.min(facts.length - 1, currentFactIndex + direction)
      );
      
      if (newIndex !== currentFactIndex) {
        setCurrentFactIndex(newIndex);
        window.scrollTo({
          top: newIndex * height,
          behavior: 'smooth'
        });
      }
    };
    
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentFactIndex]);

  // Navigation with keyboard arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        const newIndex = Math.min(facts.length - 1, currentFactIndex + 1);
        if (newIndex !== currentFactIndex) {
          setCurrentFactIndex(newIndex);
          window.scrollTo({
            top: newIndex * window.innerHeight,
            behavior: 'smooth'
          });
        }
      } else if (e.key === 'ArrowUp') {
        const newIndex = Math.max(0, currentFactIndex - 1);
        if (newIndex !== currentFactIndex) {
          setCurrentFactIndex(newIndex);
          window.scrollTo({
            top: newIndex * window.innerHeight,
            behavior: 'smooth'
          });
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFactIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/reactions">
          <Button variant="default" size="lg" className="rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Commentaires globaux
          </Button>
        </Link>
      </div>
      
      <div ref={containerRef} className="overflow-hidden h-screen">
        <div 
          className="transition-transform duration-500 ease-in-out" 
          style={{
            transform: `translateY(-${currentFactIndex * 100}vh)`,
            height: `${facts.length * 100}vh`
          }}
        >
          {facts.map((fact, index) => (
            <div 
              key={fact.id} 
              className="h-screen"
              style={{ transform: `translateY(${index * 100}vh)` }}
            >
              <Fact 
                fact={fact} 
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-2">
          {facts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentFactIndex 
                  ? "bg-primary" 
                  : "bg-muted hover:bg-primary/50"
              } transition-all`}
              onClick={() => {
                setCurrentFactIndex(index);
                window.scrollTo({
                  top: index * window.innerHeight,
                  behavior: 'smooth'
                });
              }}
            />
          ))}
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
