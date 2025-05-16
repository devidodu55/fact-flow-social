
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ReactionItem from "@/components/ReactionItem";
import { reactions } from "@/lib/mockData";

const MyReactions = () => {
  const { user } = useAuth();
  
  // Filter reactions to only show the current user's reactions
  const userReactions = user 
    ? reactions.filter(reaction => reaction.userId === user.id)
    : [];

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 space-x-2">
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
          <Link to="/reactions" className={navigationMenuTriggerStyle()}>
            Feed
          </Link>
          <Link to="/my-reactions" className={navigationMenuTriggerStyle({ className: "bg-accent/50" })}>
            My Reactions
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">My Reactions</h1>
        
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="space-y-4 pb-6">
            {userReactions.length > 0 ? (
              userReactions.map((reaction) => (
                <Card key={reaction.id} className="mb-4">
                  <CardContent className="pt-4">
                    <ReactionItem reaction={reaction} />
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">You haven't posted any reactions yet.</p>
                <Link to="/" className="text-primary hover:underline block mt-2">
                  Go react to some facts!
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
