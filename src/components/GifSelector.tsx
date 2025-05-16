import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface TenorGifResult {
    id: string;
    media_formats: {
        gif: {
            url: string;
            preview: string;
        };
    };
}

const GifSelector: React.FC<GifSelectorProps> = ({ onSelectGif, onCancel }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("trending");
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [loading, setLoading] = useState(false);

    const TENOR_API_KEY = import.meta.env.VITE_TENOR_API_KEY;

    const fetchGifs = async (query?: string) => {
        setLoading(true);
        try {
            const response = await axios.get("https://tenor.googleapis.com/v2/search", {
                params: {
                    key: TENOR_API_KEY,
                    q: query || "trending",
                    limit: 12,
                    media_filter: "minimal",
                    contentfilter: "medium"
                }
            });

            const results = response.data.results as TenorGifResult[];

            const gifs: Gif[] = results.map((r) => ({
                id: r.id,
                url: r.media_formats.gif.url,
                preview: r.media_formats.gif.preview,
            }));

            setGifs(gifs);
        } catch (error) {
            console.error("Erreur lors du chargement des GIFs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "trending") {
            fetchGifs(); // Trending by default
        } else {
            fetchGifs(activeTab); // Use tab as category query
        }
    }, [activeTab]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            fetchGifs(searchQuery.trim());
        }
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Select a GIF</h3>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="M6 6l12 12" />
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

                <TabsContent value={activeTab}>
                    {loading ? (
                        <p className="text-center text-sm text-muted-foreground">Loading GIFs...</p>
                    ) : (
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
                                        referrerPolicy="no-referrer"
                                    />

                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <div className="text-xs text-muted-foreground text-center pt-2">
                Powered by Tenor
            </div>
        </div>
    );
};

export default GifSelector;
