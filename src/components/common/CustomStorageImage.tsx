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

const PAGE_SIZE = 40;
const ROW_SIZE = 6;

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
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
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Swipe tracking
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

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
                const thumbnailKey = matchedThumb ?? cleanFullKey;

                return { fullKey: cleanFullKey, thumbnailKey };
            });

            setAllImages(shuffleArray(items));
        } catch (err) {
            console.error("Error listing images", err);
        } finally {
            setLoadingList(false);
        }
    }, [path]);

    useEffect(() => {
        setAllImages([]);
        setVisibleCount(PAGE_SIZE);
        fetchAll();
    }, [path, fetchAll]);

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

    const rowChunks = useMemo(
        () => chunkArray(visibleImages, ROW_SIZE),
        [visibleImages]
    );

    const navigateNext = useCallback(() => {
        if (!selectedImage) return;
        const currentIndex = allImages.findIndex((img) => img.fullKey === selectedImage);
        setSelectedImage(allImages[(currentIndex + 1) % allImages.length].fullKey);
    }, [allImages, selectedImage]);

    const navigatePrev = useCallback(() => {
        if (!selectedImage) return;
        const currentIndex = allImages.findIndex((img) => img.fullKey === selectedImage);
        setSelectedImage(allImages[(currentIndex - 1 + allImages.length) % allImages.length].fullKey);
    }, [allImages, selectedImage]);

    return (
        <>
            {loadingList && <p className={styles.loading}>Loading...</p>}

            {rowChunks.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.galleryRow}>
                    {row.map((it) => (
                        <ThumbnailTile
                            key={it.thumbnailKey}
                            item={it}
                            onClick={(fullKey) => setSelectedImage(fullKey)}
                        />
                    ))}
                </div>
            ))}

            <div ref={sentinelRef} style={{ height: 1 }} />

            {selectedImage && (
                <div ref={modalRef} tabIndex={-1} className={styles.modal}>
                    <div className={styles.navAreaLeft} onClick={navigatePrev} />
                    <FullSizeImage fullKey={selectedImage} />
                    <div className={styles.navAreaRight} onClick={navigateNext} />
                    <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>
                        ✕
                    </button>
                </div>
            )}
        </>
    );
};

export default CustomStorageImage;