
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GifSelector from "./GifSelector";
import { Reaction } from "@/lib/mockData";
import { Image, Sparkles } from "lucide-react";
import { toast } from "sonner";

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
    toast.success("GIF sélectionné avec succès!");
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
      toast.success("Réaction publiée avec succès!");
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
              placeholder="Écrivez votre réaction..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none min-h-[100px] focus:border-primary"
            />
            
            {gifUrl && (
              <div className="relative">
                <img 
                  src={gifUrl} 
                  alt="GIF sélectionné" 
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
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGifSelector(true)}
                className="gap-2"
                disabled={isSubmitting}
              >
                <Image size={18} />
                GIF
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => toast.info("Fonctionnalité à venir!")}
                disabled={isSubmitting}
              >
                <Sparkles size={18} />
                Effets
              </Button>
            </div>
            
            <div className="space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || (!text.trim() && !gifUrl)}
              >
                {isSubmitting ? "Publication..." : "Publier"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReactionForm;
