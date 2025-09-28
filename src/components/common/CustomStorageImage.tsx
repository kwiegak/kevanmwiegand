import React, {
    FC,
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from "react";
import { list, getUrl } from "@aws-amplify/storage";
import styles from "./CustomStorageImage.module.css";

interface CustomStorageProps {
    path: string;
}

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
};

const PAGE_SIZE = 20;

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const ThumbnailTile: FC<{
    item: ImageItem;
    onClick: (fullKey: string) => void;
}> = ({ item, onClick }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                // ask Amplify for a signed URL for the thumbnail (or full image if no thumbnail)
                const res = await getUrl({ key: item.thumbnailKey });
                if (mounted) setUrl(String(res?.url ?? res));
            } catch (err) {
                console.error("getUrl error", err);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [item.thumbnailKey]);

    return (
        <div className={styles.imageWrapper} onClick={() => onClick(item.fullKey)}>
            {!loaded && <div className={styles.placeholder} />}
            {url && (
                <img
                    src={url}
                    alt={item.fullKey}
                    loading="lazy"
                    className={`${styles.image} ${loaded ? styles.visible : ""}`}
                    onLoad={() => setLoaded(true)}
                    width="400"
                    height="300"
                />
            )}
        </div>
    );
};

const FullSizeImage: FC<{ fullKey: string }> = ({ fullKey }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const r = await getUrl({ key: fullKey });
                if (mounted) setUrl(String(r?.url ?? r));
            } catch (err) {
                console.error("getUrl full image", err);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [fullKey]);

    return (
        <>
            {!loaded && <div className={styles.modalPlaceholder} />}
            {url && (
                <img
                    src={url}
                    alt={fullKey}
                    className={`${styles.modalImage} ${loaded ? styles.visible : ""}`}
                    onLoad={() => setLoaded(true)}
                />
            )}
        </>
    );
};

const CustomStorageImage: FC<CustomStorageProps> = ({ path }) => {
    const [allImages, setAllImages] = useState<ImageItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingList, setLoadingList] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const fetchAll = useCallback(async () => {
        try {
            setLoadingList(true);

            const fullResult: any = await list({ path: `public/${path}/` });
            const fullKeys: string[] = (fullResult.items || [])
                .map((i: any) => i.path ?? i.key ?? "")
                .filter((k: string) => !!k && !k.endsWith("/"));

            const thumbResult: any = await list({ path: `public/thumbnails/${path}/` });
            const rawThumbKeys: string[] = (thumbResult.items || [])
                .map((i: any) => i.path ?? i.key ?? "")
                .filter((k: string) => !!k && !k.endsWith("/"));

            // Build a map: cleanedThumbPathLowercase -> cleanedThumbPath (no 'public/')
            const thumbMap = new Map<string, string>();
            rawThumbKeys.forEach((k) => {
                const clean = k.replace(/^public\//, ""); // e.g. "thumbnails/nyc/DSC01788.jpg"
                thumbMap.set(clean.toLowerCase(), clean);
            });

            const items: ImageItem[] = fullKeys.map((fullKey: string) => {
                const cleanFullKey = fullKey.replace(/^public\//, ""); // e.g. "nyc/DSC01788.JPG"
                const fileName = cleanFullKey.split("/").pop() ?? "";
                const expectedThumbClean = `thumbnails/${path}/${fileName}`; // desired thumbnail path (cleaned)
                const matchedThumb = thumbMap.get(expectedThumbClean.toLowerCase());

                // If we found a real thumbnail, use it (with the exact casing from S3).
                // Otherwise fall back to the full image.
                const thumbnailKey = matchedThumb ?? cleanFullKey;

                return { fullKey: cleanFullKey, thumbnailKey };
            });

            // helpful dev logs — remove in production
            console.debug("fullKeys", fullKeys);
            console.debug("rawThumbKeys", rawThumbKeys);
            console.debug("items (final)", items);

            setAllImages(shuffleArray(items));
        } catch (err) {
            console.error("Error listing images", err);
        } finally {
            setLoadingList(false);
        }
    }, [path]);



    // initial fetch
    useEffect(() => {
        setAllImages([]);
        setVisibleCount(PAGE_SIZE);
        fetchAll();
    }, [path, fetchAll]);

    // infinite scroll sentinel: load next page when near bottom
    useEffect(() => {
        if (!sentinelRef.current) return;
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((v) => Math.min(allImages.length, v + PAGE_SIZE));
                }
            },
            { rootMargin: "300px" }
        );
        obs.observe(sentinelRef.current);
        return () => obs.disconnect();
    }, [allImages.length]);

    const visibleImages = useMemo(
        () => allImages.slice(0, visibleCount),
        [allImages, visibleCount]
    );

    return (
        <>
            {loadingList && <p className={styles.loading}>Loading...</p>}

            <div className={styles.gallery}>
                {visibleImages.map((it) => (
                    <ThumbnailTile
                        key={it.thumbnailKey}
                        item={it}
                        onClick={(fullKey) => setSelectedImage(fullKey)}
                    />
                ))}
            </div>

            <div ref={sentinelRef} style={{ height: 1 }} />

            {/* Lightbox modal */}
            {selectedImage && (
                <div
                    className={styles.modal}
                    onClick={() => setSelectedImage(null)}
                >
                    {/* full-size image - use getUrl inside a plain img for reliable onLoad handling */}
                    <FullSizeImage fullKey={selectedImage} />
                </div>
            )}
        </>
    );
};

export default CustomStorageImage;
