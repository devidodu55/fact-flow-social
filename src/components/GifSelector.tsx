
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Gif {
  id: string;
  url: string;
  preview: string;
}

interface GifSelectorProps {
  onSelectGif: (url: string) => void;
  onCancel: () => void;
}

// For demo purposes we'll just use hardcoded GIFs since we can't use the actual Tenor API key here
const mockGifs: Record<string, Gif[]> = {
  trending: [
    { id: "1", url: "https://media.tenor.com/i3uWiBRg1dQAAAAd/wow-omg.gif", preview: "https://media.tenor.com/i3uWiBRg1dQAAAAd/wow-omg.gif" },
    { id: "2", url: "https://media.tenor.com/YMRpF8dNIC8AAAAd/omg-shocked.gif", preview: "https://media.tenor.com/YMRpF8dNIC8AAAAd/omg-shocked.gif" },
    { id: "3", url: "https://media.tenor.com/pweSlBcehWcAAAAd/shocked-what.gif", preview: "https://media.tenor.com/pweSlBcehWcAAAAd/shocked-what.gif" },
    { id: "4", url: "https://media.tenor.com/7jLF8h0LbMIAAAAd/schedule-idea.gif", preview: "https://media.tenor.com/7jLF8h0LbMIAAAAd/schedule-idea.gif" },
  ],
  funny: [
    { id: "5", url: "https://media.tenor.com/SotF7ssgJH8AAAAd/that-is-so-funny-crying.gif", preview: "https://media.tenor.com/SotF7ssgJH8AAAAd/that-is-so-funny-crying.gif" },
    { id: "6", url: "https://media.tenor.com/x4q5v7MfQdgAAAAd/cat-laugh.gif", preview: "https://media.tenor.com/x4q5v7MfQdgAAAAd/cat-laugh.gif" },
    { id: "7", url: "https://media.tenor.com/ofSbpuTUJyEAAAAd/lol-scuola.gif", preview: "https://media.tenor.com/ofSbpuTUJyEAAAAd/lol-scuola.gif" },
    { id: "8", url: "https://media.tenor.com/r_ciR0ONJAMAAAAd/laughing-laugh.gif", preview: "https://media.tenor.com/r_ciR0ONJAMAAAAd/laughing-laugh.gif" },
  ],
  science: [
    { id: "9", url: "https://media.tenor.com/ijFDtYC--QUAAAAd/chemistry-experiment.gif", preview: "https://media.tenor.com/ijFDtYC--QUAAAAd/chemistry-experiment.gif" },
    { id: "10", url: "https://media.tenor.com/VszqpvMyhYEAAAAd/ancient-egypt-simpsons.gif", preview: "https://media.tenor.com/VszqpvMyhYEAAAAd/ancient-egypt-simpsons.gif" },
    { id: "11", url: "https://media.tenor.com/3--pPH7IXLAAAAAC/bill-nye-bill.gif", preview: "https://media.tenor.com/3--pPH7IXLAAAAAC/bill-nye-bill.gif" },
    { id: "12", url: "https://media.tenor.com/H-NXH7iOy_gAAAAd/cosmos-carl-sagan.gif", preview: "https://media.tenor.com/H-NXH7iOy_gAAAAd/cosmos-carl-sagan.gif" },
  ]
};

const GifSelector: React.FC<GifSelectorProps> = ({ onSelectGif, onCancel }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");
  const [gifs, setGifs] = useState<Gif[]>(mockGifs.trending);

  useEffect(() => {
    if (activeTab in mockGifs) {
      setGifs(mockGifs[activeTab]);
    }
  }, [activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we would search the Tenor API here
    // For now, we'll just switch to one of our predefined categories if the search matches
    
    const query = searchQuery.toLowerCase();
    if (query === "funny" || query === "fun") {
      setActiveTab("funny");
    } else if (query === "science" || query === "education") {
      setActiveTab("science");
    } else {
      setActiveTab("trending");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select a GIF</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </Button>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search for GIFs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="funny">Funny</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-2 gap-2">
          {gifs.map((gif) => (
            <div
              key={gif.id}
              className="cursor-pointer rounded-md overflow-hidden border border-border hover:border-primary transition-colors"
              onClick={() => onSelectGif(gif.url)}
            >
              <img 
                src={gif.preview} 
                alt="GIF" 
                className="w-full h-24 object-cover"
              />
            </div>
          ))}
        </div>
      </Tabs>
      
      <div className="text-xs text-muted-foreground text-center pt-2">
        Powered by Tenor (note: this is a mock implementation for the demo)
      </div>
    </div>
  );
};

export default GifSelector;
