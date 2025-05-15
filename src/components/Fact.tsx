
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReactionForm from "./ReactionForm";
import ReactionItem from "./ReactionItem";
import { Fact as FactType, Reaction, getReactionsForFact } from "@/lib/mockData";

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

  const handleAddReaction = (newReaction: Reaction) => {
    setReactions((prev) => [newReaction, ...prev]);
    setShowReactionForm(false);
    // Show reactions after adding a new one
    setShowReactions(true);
  };

  const handleReactClick = () => {
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    setShowReactionForm(true);
  };

  const toggleShowReactions = () => {
    setShowReactions(!showReactions);
    if (showReactionForm) {
      setShowReactionForm(false);
    }
  };

  return (
    <div className="snap-item relative w-full h-full flex flex-col items-center justify-center px-4 py-16">
      <Card className="relative w-full max-w-2xl p-6 md:p-8 overflow-hidden bg-opacity-90 backdrop-blur-sm">
        {fact.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-10">
            <img
              src={fact.imageUrl}
              alt={fact.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {fact.title}
          </h2>
          <p className="text-md md:text-lg text-foreground/80">{fact.content}</p>

          {fact.source && (
            <p className="text-sm text-muted-foreground">
              Source: {fact.source}
            </p>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleReactClick}
                className="gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                React
              </Button>
              <Button
                variant="ghost"
                onClick={toggleShowReactions}
                className="gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 6.1H3"></path>
                  <path d="M21 12.1H3"></path>
                  <path d="M15.1 18H3"></path>
                </svg>
                {reactions.length > 0 ? `Reactions (${reactions.length})` : "No Reactions"}
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(fact.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Card>

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
