
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GifSelector from "./GifSelector";
import { Reaction } from "@/lib/mockData";

interface ReactionFormProps {
  factId: string;
  onSubmit: (reaction: Reaction) => void;
  onCancel: () => void;
}

const ReactionForm: React.FC<ReactionFormProps> = ({ factId, onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [gifUrl, setGifUrl] = useState<string | undefined>(undefined);
  const [showGifSelector, setShowGifSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectGif = (url: string) => {
    setGifUrl(url);
    setShowGifSelector(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!text.trim() && !gifUrl) return;
    
    setIsSubmitting(true);
    
    const newReaction: Reaction = {
      id: `r-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      factId,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      text: text.trim() || undefined,
      gifUrl,
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    
    // Simulate a slight delay to show loading state
    setTimeout(() => {
      onSubmit(newReaction);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showGifSelector ? (
        <GifSelector 
          onSelectGif={handleSelectGif}
          onCancel={() => setShowGifSelector(false)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Write your reaction..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none min-h-[100px]"
            />
            
            {gifUrl && (
              <div className="relative">
                <img 
                  src={gifUrl} 
                  alt="Selected GIF" 
                  className="rounded-md max-h-[150px] object-contain"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setGifUrl(undefined)}
                  className="absolute top-1 right-1 rounded-full bg-background/80 hover:bg-background"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowGifSelector(true)}
              className="gap-2"
              disabled={isSubmitting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <path d="M14 9h2"></path>
                <path d="M14 13h2"></path>
                <path d="M9 9h1"></path>
                <path d="M6 15h12"></path>
                <path d="M9 13h1"></path>
              </svg>
              Add GIF
            </Button>
            
            <div className="space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || (!text.trim() && !gifUrl)}
              >
                {isSubmitting ? "Posting..." : "Post Reaction"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReactionForm;
