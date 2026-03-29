import { useState, useCallback, useRef } from "react";
import { list } from "@aws-amplify/storage";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
    fullUrl: string;
    thumbnailUrl: string;
};

const BASE_URL = "https://kevanmwiegand602cade65ed14b9c8cd3291cda903157c36e8-staging.s3.amazonaws.com/public/";

export const useGalleryImages = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [nextToken, setNextToken] = useState<string | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);
    const nextTokenRef = useRef<string | undefined>(undefined);
    const hasMoreRef = useRef(true);

    const fetchImages = useCallback(async (path: string, reset = false) => {
        if (loadingRef.current) return;

        const currentNextToken = reset ? undefined : nextTokenRef.current;
        const currentHasMore = reset ? true : hasMoreRef.current;

        if (!currentHasMore) return;

        try {
            loadingRef.current = true;
            setLoading(true);

            if (reset) {
                setImages([]);
                setNextToken(undefined);
                setHasMore(true);

                nextTokenRef.current = undefined;
                hasMoreRef.current = true;
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

                const thumbnailKey = matchedThumb ?? cleanFullKey;

                return {
                    fullKey: cleanFullKey,
                    thumbnailKey,
                    thumbnailUrl: `${BASE_URL}${thumbnailKey}`,
                    fullUrl: `${BASE_URL}${cleanFullKey}`,
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
            nextTokenRef.current = fullResult.nextToken;

            if (!fullResult.nextToken) {
                setHasMore(false);
                hasMoreRef.current = false;
            }
        } catch (err) {
            console.error("Error listing images", err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, []);

    return {
        images,
        loading,
        fetchImages,
        hasMore,
    };
};