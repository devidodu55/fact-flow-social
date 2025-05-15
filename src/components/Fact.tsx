
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReactionForm from "./ReactionForm";
import ReactionItem from "./ReactionItem";
import { Fact as FactType, Reaction, getReactionsForFact } from "@/lib/mockData";
import { MessageSquare, Heart, Bookmark, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface FactProps {
  fact: FactType;
  onOpenAuthModal: () => void;
}

const Fact: React.FC<FactProps> = ({ fact, onOpenAuthModal }) => {
  const { isAuthenticated } = useAuth();
  const [showReactionForm, setShowReactionForm] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>(
    getReactionsForFact(fact.id)
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleAddReaction = (newReaction: Reaction) => {
    setReactions((prev) => [newReaction, ...prev]);
    setShowReactionForm(false);
    // Show reactions after adding a new one
    setShowReactions(true);
    
    // Navigate to Global Reactions page
    toast({
      title: "Reaction posted!",
      description: "Your reaction is now visible in the Global Reactions feed.",
      action: (
        <Link to="/reactions" className="text-primary hover:underline">
          View All Reactions
        </Link>
      ),
    });
  };

  const handleReactClick = () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    setShowReactionForm(true);
  };

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed like" : "Fact liked!",
      description: isLiked 
        ? "You've unliked this fact" 
        : "This fact will be shown more prominently in your feed",
    });
  };

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Fact saved!",
      description: isSaved 
        ? "This fact has been removed from your saved items" 
        : "You can access this fact later in your profile",
    });
  };

  const handleShareClick = () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    toast({
      title: "Share feature",
      description: "The friends system will be implemented soon!",
    });
  };

  const toggleShowReactions = () => {
    setShowReactions(!showReactions);
    if (showReactionForm) {
      setShowReactionForm(false);
    }
  };

  return (
    <div className="snap-item relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md h-[80vh] flex items-stretch relative">
        {/* Main content area - TikTok style vertical card */}
        <Card className="flex-grow relative overflow-hidden bg-opacity-90 backdrop-blur-sm flex flex-col">
          {fact.imageUrl && (
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src={fact.imageUrl}
                alt={fact.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {fact.title}
              </h2>
              <p className="text-md md:text-lg text-foreground/80">{fact.content}</p>

              {fact.source && (
                <p className="text-sm text-muted-foreground">
                  Source: {fact.source}
                </p>
              )}
            </div>
            
            <div className="mt-auto pt-4">
              <span className="text-xs text-muted-foreground">
                {new Date(fact.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>
        
        {/* Side buttons - Similar to TikTok */}
        <div className="flex flex-col justify-center items-center gap-5 pl-4">
          {/* Comment button */}
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleShowReactions}
              className="rounded-full h-12 w-12 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <MessageSquare size={24} />
            </Button>
            <span className="text-xs mt-1">{reactions.length}</span>
          </div>
          
          {/* Like button */}
          <div className="flex flex-col items-center">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="icon" 
              onClick={handleLikeClick}
              className="rounded-full h-12 w-12 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </Button>
            <span className="text-xs mt-1">Like</span>
          </div>
          
          {/* Save button */}
          <div className="flex flex-col items-center">
            <Button
              variant={isSaved ? "default" : "outline"}
              size="icon"
              onClick={handleSaveClick}
              className="rounded-full h-12 w-12 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
            </Button>
            <span className="text-xs mt-1">Save</span>
          </div>
          
          {/* Share button */}
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareClick}
              className="rounded-full h-12 w-12 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <Share2 size={24} />
            </Button>
            <span className="text-xs mt-1">Share</span>
          </div>
          
          {/* React button */}
          <div className="flex flex-col items-center mt-4">
            <Button
              variant="default"
              size="icon"
              onClick={handleReactClick}
              className="rounded-full h-12 w-12 flex items-center justify-center animate-pulse-light"
            >
              <MessageSquare size={24} />
            </Button>
            <span className="text-xs mt-1">React</span>
          </div>
        </div>
      </div>

      {/* Reaction Form */}
      {showReactionForm && (
        <div className="fixed bottom-0 left-0 right-0 p-4 animate-slide-up glass z-40">
          <ReactionForm
            factId={fact.id}
            onCancel={() => setShowReactionForm(false)}
            onSubmit={handleAddReaction}
          />
        </div>
      )}

      {/* Reactions List */}
      {showReactions && (
        <div className="fixed inset-0 pt-16 pb-0 z-30 bg-background/95 overflow-y-auto animate-fade-in">
          <div className="container mx-auto p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Reactions</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReactions(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>

            {reactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No reactions yet. Be the first to react!</p>
                <Button
                  onClick={handleReactClick}
                  className="mt-4 bg-primary hover:bg-primary/90"
                >
                  Add Reaction
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reactions.map((reaction) => (
                  <ReactionItem key={reaction.id} reaction={reaction} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-pulse-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>
    </div>
  );
};

export default Fact;
