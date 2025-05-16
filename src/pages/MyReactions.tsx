
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ReactionItem from "@/components/ReactionItem";
import { reactions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MyReactions = () => {
  const { user } = useAuth();
  
  // Filter reactions to only show the current user's reactions
  const userReactions = user 
    ? reactions.filter(reaction => reaction.userId === user.id)
    : [];

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 space-x-2 sticky top-16 z-10 bg-background/80 backdrop-blur-sm py-2">
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
          <Link to="/reactions" className={navigationMenuTriggerStyle()}>
            Feed
          </Link>
          <Link to="/my-reactions" className={navigationMenuTriggerStyle({ className: "bg-accent/50" })}>
            My Reactions
          </Link>
          <Link to="/profile" className={navigationMenuTriggerStyle()}>
            Profile
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Reactions</h1>
          {userReactions.length > 0 && (
            <Button 
              size="sm"
              variant="outline"
              onClick={() => toast.success("Coming soon: Bulk actions for your reactions!")}
            >
              Manage
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="space-y-4 pb-6">
            {userReactions.length > 0 ? (
              userReactions.map((reaction) => (
                <Card key={reaction.id} className="mb-4 hover:shadow-md transition-all">
                  <CardContent className="pt-4">
                    <ReactionItem reaction={reaction} />
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 bg-muted/30 rounded-lg border border-dashed">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p className="text-muted-foreground mb-3">You haven't posted any reactions yet.</p>
                <Link to="/" className="text-primary hover:underline block mt-2 font-medium">
                  <Button variant="outline" className="animate-bounce">
                    Go react to some facts!
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MyReactions;
