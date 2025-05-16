const API_KEY = import.meta.env.VITE_TENOR_API_KEY;
const BASE_URL = "https://tenor.googleapis.com/v2";

export interface Gif {
    id: string;
    url: string;
    preview: string;
}

interface TenorGifResult {
    id: string;
    media_formats: {
        gif: { url: string };
    };
}

function mapResults(results: TenorGifResult[]): Gif[] {
    return results.map((r) => ({
        id: r.id,
        url: r.media_formats.gif.url,
        preview: r.media_formats.gif.url, // Affiche directement le GIF complet
    }));
}

export async function fetchTrendingGifs(): Promise<Gif[]> {
    const res = await fetch(`${BASE_URL}/featured?key=${API_KEY}&limit=20&media_filter=gif`);
    const data = await res.json();
    return mapResults(data.results as TenorGifResult[]);
}

export async function searchGifs(query: string): Promise<Gif[]> {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&key=${API_KEY}&limit=20&media_filter=gif`);
    const data = await res.json();
    return mapResults(data.results as TenorGifResult[]);
}
