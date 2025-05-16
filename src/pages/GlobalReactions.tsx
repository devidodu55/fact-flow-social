
import React from "react";
import { facts, reactions } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import ReactionItem from "@/components/ReactionItem";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const GlobalReactions = () => {
  // Combine all reactions from all facts and sort by date (newest first)
  const allReactions = [...reactions].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Helper function to find the fact title for a reaction
  const getFactTitle = (factId: string) => {
    const fact = facts.find(f => f.id === factId);
    return fact ? fact.title : "Unknown Fact";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/reactions">
                  <NavigationMenuLink className={navigationMenuTriggerStyle({ 
                    className: "bg-accent/50" 
                  })}>
                    Feed
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/my-reactions">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My Reactions
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pt-20">
        <h1 className="text-3xl font-bold mb-6">Feed</h1>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-4 pb-6 max-w-2xl mx-auto">
            {allReactions.map((reaction) => (
              <Card key={reaction.id} className="mb-4 overflow-hidden border-border hover:bg-muted/20 transition-colors">
                <CardContent className="pt-4">
                  <div className="mb-3 pb-2 border-b">
                    <Link to="/" className="text-primary hover:underline">
                      Responding to: <strong>{getFactTitle(reaction.factId)}</strong>
                    </Link>
                  </div>
                  <ReactionItem reaction={reaction} />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default GlobalReactions;
