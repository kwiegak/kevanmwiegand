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
    path: string; // e.g. "nyc"
}

type ImageItem = {
    fullKey: string;      // e.g. "public/nyc/img1.jpg"
    thumbnailKey: string; // e.g. "public/thumbnails/nyc/img1.jpg" or same as fullKey if no thumbnail
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

const tryListPrefixes = async (prefixes: string[]) => {
    // try several prefixes (some environments expect "public/..." vs "thumbnails/...")
    let lastResult: any = { items: [] };
    for (const p of prefixes) {
        try {
            // your working code used list({ path: `public/${path}/` }), so keep that shape
            // we call it with `path` property — if your env expects a different param, adjust accordingly
            const r = await list({ path: p });
            lastResult = r;
            if (r?.items?.length) return r;
        } catch (err) {
            // swallow; try next prefix
            lastResult = { items: [] };
        }
    }
    return lastResult;
};

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
                    // small width/height attributes help layout shift
                    width="400"
                    height="300"
                />
            )}
        </div>
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

            // 1) list full-size images (use the same shape you had working)
            const fullPrefixCandidates = [
                `public/${path}/`, // your working pattern
                `${path}/`, // fallback if amplify interprets differently
            ];
            const fullResult: any = await tryListPrefixes(fullPrefixCandidates);

            const fullKeys: string[] = (fullResult.items || [])
                .map((i: any) => i.path ?? i.key ?? "")
                .filter((k: string) => !!k && !k.endsWith("/"));

            // 2) list thumbnails (try both public/thumbnails/... and thumbnails/...)
            const thumbPrefixCandidates = [
                `public/thumbnails/${path}/`,
                `thumbnails/${path}/`,
            ];
            const thumbResult: any = await tryListPrefixes(thumbPrefixCandidates);
            const thumbKeys: string[] = (thumbResult.items || [])
                .map((i: any) => i.path ?? i.key ?? "")
                .filter((k: string) => !!k && !k.endsWith("/"));

            const thumbSet = new Set(thumbKeys);

            // 3) build ImageItem list (thumbnail if exists else full)
            const items: ImageItem[] = fullKeys.map((fullKey: string) => {
                const cleanFullKey = fullKey.replace(/^public\//, ""); // <-- ADD THIS
                const expectedThumb1 = cleanFullKey.replace(
                    `${path}/`,
                    `thumbnails/${path}/`
                );

                const thumbnailKey = thumbSet.has(`public/${expectedThumb1}`)
                    ? expectedThumb1
                    : cleanFullKey;

                return { fullKey: cleanFullKey, thumbnailKey };
            });

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

/* helper subcomponent for modal full image (uses getUrl() and shows placeholder while loading) */
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
