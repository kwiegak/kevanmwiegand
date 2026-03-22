import { useState, useCallback } from "react";
import { list } from "@aws-amplify/storage";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
};

export const useGalleryImages = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [nextToken, setNextToken] = useState<string | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);
    const [currentPath, setCurrentPath] = useState<string | null>(null);

 const fetchImages = useCallback(async (path: string, reset = false) => {
    if (loading) return;

    const currentNextToken = reset ? undefined : nextToken;
    const currentHasMore = reset ? true : hasMore;

    if (!currentHasMore) return;

    try {
        setLoading(true);

        if (reset) {
            setImages([]);
            setNextToken(undefined);
            setHasMore(true);
        }

        const fullResult = await list({
            path: `public/${path}/`,
            options: {
                pageSize: 50,
                nextToken: currentNextToken,
            },
        });

        const fullKeys: string[] = (fullResult.items || [])
            .map((i) => i.path)
            .filter((k) => !!k && !k.endsWith("/"));

        const thumbResult = await list({
            path: `public/thumbnails/${path}/`,
        });

        const thumbMap = new Map<string, string>();
        (thumbResult.items || []).forEach((kObj) => {
            const k = kObj.path;
            if (!k || k.endsWith("/")) return;

            const clean = k.replace(/^public\//, "");
            thumbMap.set(clean.toLowerCase(), clean);
        });

        const items: ImageItem[] = fullKeys.map((fullKey) => {
            const cleanFullKey = fullKey.replace(/^public\//, "");
            const fileName = cleanFullKey.split("/").pop() ?? "";

            const expectedThumb = `thumbnails/${path}/${fileName}`;
            const matchedThumb = thumbMap.get(expectedThumb.toLowerCase());

            return {
                fullKey: cleanFullKey,
                thumbnailKey: matchedThumb ?? cleanFullKey,
            };
        });

        setImages((prev) => {
            const merged = reset ? items : [...prev, ...items];
            const seen = new Set<string>();
            return merged.filter((img) => {
                if (seen.has(img.fullKey)) return false;
                seen.add(img.fullKey);
                return true;
            });
        });

        setNextToken(fullResult.nextToken);

        if (!fullResult.nextToken) {
            setHasMore(false);
        }
    } catch (err) {
        console.error("Error listing images", err);
    } finally {
        setLoading(false);
    }
}, [loading, nextToken, hasMore]);

    return {
        images,
        loading,
        fetchImages,
        hasMore,
    };
};