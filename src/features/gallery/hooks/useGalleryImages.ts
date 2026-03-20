import { useState, useEffect, useCallback } from "react";
import { list } from "@aws-amplify/storage";
import { shuffleArray } from "../utils/shuffleArray";

export interface ImageItem {
  fullKey: string;
  thumbnailKey: string;
}

type StorageListResult = {
  items: { path?: string; key?: string }[];
};

export function useGalleryImages(path: string) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);

      const fullResult = (await list({
        path: `public/${path}/`,
      })) as StorageListResult;

      const fullKeys = (fullResult.items || [])
        .map(i => i.path ?? i.key ?? "")
        .filter(k => !!k && !k.endsWith("/"));

      const thumbResult = (await list({
        path: `public/thumbnails/${path}/`,
      })) as StorageListResult;

      const thumbMap = new Map<string, string>();

      (thumbResult.items || []).forEach(i => {
        const key = (i.path ?? i.key ?? "").replace(/^public\//, "");
        thumbMap.set(key.toLowerCase(), key);
      });

      const items = fullKeys.map(fullKey => {
        const cleanFullKey = fullKey.replace(/^public\//, "");
        const fileName = cleanFullKey.split("/").pop() ?? "";

        const expectedThumb = `thumbnails/${path}/${fileName}`;

        return {
          fullKey: cleanFullKey,
          thumbnailKey:
            thumbMap.get(expectedThumb.toLowerCase()) ?? cleanFullKey
        };
      });

      setImages(shuffleArray(items));

    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading };
}