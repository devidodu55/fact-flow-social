
import React from "react";
import { facts, reactions } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import ReactionItem from "@/components/ReactionItem";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

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
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <header className="border-b py-4">
            <div className="container mx-auto px-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Facts Feed
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/reactions">
                      <NavigationMenuLink className={navigationMenuTriggerStyle({ 
                        className: "bg-accent/50" 
                      })}>
                        Global Reactions
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Global Reactions</h1>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4 pb-6">
                {allReactions.map((reaction) => (
                  <Card key={reaction.id} className="mb-4">
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default GlobalReactions;
