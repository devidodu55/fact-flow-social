
import React, { useState } from "react";
import { facts, reactions } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import ReactionItem from "@/components/ReactionItem";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GlobalReactions = () => {
  // State for sorting and filtering
  const [sortOrder, setSortOrder] = useState<"newest" | "popular">("newest");
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Helper function to find the fact title for a reaction
  const getFactTitle = (factId: string) => {
    const fact = facts.find(f => f.id === factId);
    return fact ? fact.title : "Unknown Fact";
  };

  // Sort reactions based on current sort order
  const sortedReactions = [...reactions].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by popularity (likes)
      return (b.likes || 0) - (a.likes || 0);
    }
  });

  const handleSortChange = (order: "newest" | "popular") => {
    setSortOrder(order);
    toast.success(`Sorting by ${order === "newest" ? "most recent" : "most popular"} reactions`);
  };
  
  const triggerFunMode = () => {
    setShowConfetti(true);
    toast.success("🎉 Fun mode activated! 🎉");
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute top-0 left-1/4 animate-fall text-5xl">🎉</div>
          <div className="absolute top-0 left-1/2 animate-fall-delay text-5xl">✨</div>
          <div className="absolute top-0 right-1/4 animate-fall-delay-2 text-5xl">🎊</div>
          <div className="absolute top-0 left-1/3 animate-fall-delay-3 text-5xl">🌟</div>
          <div className="absolute top-0 right-1/3 animate-fall text-5xl">🎈</div>
        </div>
      )}
    
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
              <NavigationMenuItem>
                <Link to="/profile">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Feed</h1>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant={sortOrder === "newest" ? "default" : "outline"}
              onClick={() => handleSortChange("newest")}
              className="rounded-full"
            >
              <ArrowDown className="mr-1" size={14} /> Newest
            </Button>
            <Button 
              size="sm" 
              variant={sortOrder === "popular" ? "default" : "outline"}
              onClick={() => handleSortChange("popular")}
              className="rounded-full"
            >
              <Sparkles className="mr-1" size={14} /> Popular
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={triggerFunMode}
            >
              <Sparkles size={16} />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-4 pb-6 max-w-2xl mx-auto">
            {sortedReactions.map((reaction) => (
              <Card key={reaction.id} className="mb-4 overflow-hidden border-border hover:bg-muted/20 hover:border-primary/30 transition-colors">
                <CardContent className="pt-4">
                  <div className="mb-3 pb-2 border-b flex items-center text-sm text-muted-foreground">
                    <ArrowRight className="mr-1" size={14} />
                    <Link to="/" className="text-primary hover:underline">
                      <strong>{getFactTitle(reaction.factId)}</strong>
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
