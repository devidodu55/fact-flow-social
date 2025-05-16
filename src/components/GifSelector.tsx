
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, RefreshCcw } from "lucide-react";

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
                    q: query || activeTab,
                    limit: 12,
                    media_filter: "minimal",
                    contentfilter: "medium"
                }
            });

            const results = response.data.results as TenorGifResult[];

            const gifs: Gif[] = results.map((r) => ({
                id: r.id,
                url: r.media_formats.gif.url,
                preview: r.media_formats.gif.url, // Using full URL for preview to ensure it works
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
            fetchGifs("trending"); // Use "trending" explicitly as query
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

    const handleRefresh = () => {
        fetchGifs(activeTab === "trending" ? "trending" : activeTab);
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Sélectionner un GIF</h3>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="M6 6l12 12" />
                    </svg>
                </Button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Rechercher des GIFs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button type="submit">Rechercher</Button>
                <Button type="button" variant="outline" size="icon" onClick={handleRefresh} title="Actualiser">
                    <RefreshCcw size={16} />
                </Button>
            </form>

            <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="trending">Tendances</TabsTrigger>
                    <TabsTrigger value="funny">Drôles</TabsTrigger>
                    <TabsTrigger value="science">Science</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-[300px]">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Chargement des GIFs...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                            {gifs.length > 0 ? (
                                gifs.map((gif) => (
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
                                            loading="lazy"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 text-center p-4">
                                    <p>Aucun GIF trouvé. Essayez une autre recherche.</p>
                                </div>
                            )}
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
