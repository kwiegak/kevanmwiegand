import { useState, useCallback } from "react";
import { list } from "@aws-amplify/storage";
import { shuffleArray } from "../utils/shuffleArray";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
};

type StorageListResult = {
    items: { path?: string; key?: string }[];
};

export const useGalleryImages = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchImages = useCallback(async (path: string) => {
        try {
            setLoading(true);

            const fullResult = (await list({
                path: `public/${path}/`,
            })) as StorageListResult;

            const fullKeys: string[] = (fullResult.items || [])
                .map((i) => i.path ?? i.key ?? "")
                .filter((k) => !!k && !k.endsWith("/"));

            const thumbResult = (await list({
                path: `public/thumbnails/${path}/`,
            })) as StorageListResult;

            const rawThumbKeys: string[] = (thumbResult.items || [])
                .map((i) => i.path ?? i.key ?? "")
                .filter((k) => !!k && !k.endsWith("/"));

            const thumbMap = new Map<string, string>();
            rawThumbKeys.forEach((k) => {
                const clean = k.replace(/^public\//, "");
                thumbMap.set(clean.toLowerCase(), clean);
            });

            const items: ImageItem[] = fullKeys.map((fullKey: string) => {
                const cleanFullKey = fullKey.replace(/^public\//, "");
                const fileName = cleanFullKey.split("/").pop() ?? "";

                const expectedThumbClean = `thumbnails/${path}/${fileName}`;
                const matchedThumb = thumbMap.get(expectedThumbClean.toLowerCase());

                return {
                    fullKey: cleanFullKey,
                    thumbnailKey: matchedThumb ?? cleanFullKey,
                };
            });

            setImages(shuffleArray(items));
        } catch (err) {
            console.error("Error listing images", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        images,
        loading,
        fetchImages,
    };
};