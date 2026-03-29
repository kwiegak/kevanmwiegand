import { FC, useEffect, useRef, useCallback, useState } from "react";
import ThumbnailTile from "../ThumbnailTile/ThumbnailTile";
import styles from "./CustomStorageImage.module.css";
import { useGalleryImages } from "../../hooks/useGalleryImages";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useModalNavigation } from "../../hooks/useModalNavigation";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
    thumbnailUrl: string;
    fullUrl: string;
};

interface CustomStorageProps {
    path: string;
}

const CustomStorageImage: FC<CustomStorageProps> = ({ path }) => {
    const { images, loading, fetchImages, hasMore } = useGalleryImages();
    const modalRef = useRef<HTMLDivElement | null>(null);

    const {
        selectedImage,
        setSelectedImage,
        closeModal,
        navigateNext,
        navigatePrev,
    } = useModalNavigation(images);

    const loadingRef = useRef(false);

    const handleLoadMore = useCallback(() => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;

        fetchImages(path).finally(() => {
            loadingRef.current = false;
        });
    }, [fetchImages, path, hasMore]);

    const { loaderRef } = useInfiniteScroll({
        onLoadMore: handleLoadMore,
        hasMore,
        loading,
    });

    useEffect(() => {
        fetchImages(path, true);
    }, [path, fetchImages]);

    const handleThumbnailClick = useCallback(
        (item: ImageItem) => {
            const img = new Image();
            img.src = item.fullUrl;
            setSelectedImage(item);
        },
        [setSelectedImage]
    );

    // ✅ index tracking
    const currentIndex = images.findIndex(
        (img) => img.fullKey === selectedImage?.fullKey
    );

    const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : images.length - 1;

    const nextIndex =
        currentIndex < images.length - 1 ? currentIndex + 1 : 0;

    const prevImage = images[prevIndex];
    const nextImage = images[nextIndex];

    // ✅ SWIPE STATE
    const [translateX, setTranslateX] = useState(0);
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);
    const hasSwipedRef = useRef(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        startXRef.current = e.touches[0].clientX;
        isDraggingRef.current = true;
        hasSwipedRef.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDraggingRef.current) return;

        const currentX = e.touches[0].clientX;
        const delta = currentX - startXRef.current;

        if (Math.abs(delta) > 10) {
            hasSwipedRef.current = true;
        }

        setTranslateX(delta);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        isDraggingRef.current = false;

        const endX = e.changedTouches[0].clientX;
        const delta = endX - startXRef.current;

        const threshold = window.innerWidth * 0.15;

        if (delta > threshold) {
            navigatePrev();
        } else if (delta < -threshold) {
            navigateNext();
        }

        setTranslateX(0);

        // prevent click firing after swipe
        setTimeout(() => {
            hasSwipedRef.current = false;
        }, 0);
    };

    // ✅ CLICK NAVIGATION (replaces nav overlays)
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (hasSwipedRef.current) return;

        const target = e.target as HTMLElement;

        // ❌ don't trigger nav when clicking close button
        if (target.closest(`.${styles.closeButton}`)) return;

        const x = e.clientX;
        const width = window.innerWidth;

        if (x < width / 2) {
            navigatePrev();
        } else {
            navigateNext();
        }
    };

    return (
        <>
            {loading && images.length === 0 && (
                <p className={styles.loading}>Loading...</p>
            )}

            <div className={styles.grid}>
                {images.map((it: ImageItem) => (
                    <ThumbnailTile
                        key={it.fullKey}
                        item={it}
                        onClick={handleThumbnailClick}
                    />
                ))}
            </div>

            <div ref={loaderRef} style={{ height: 1 }} />

            {selectedImage && (
                <div
                    ref={modalRef}
                    tabIndex={-1}
                    className={styles.modal}
                    onClick={handleModalClick}
                >
                    <div
                        className={styles.carousel}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <img
                            src={prevImage.fullUrl}
                            className={styles.sideImage}
                            alt="previous"
                        />

                        <img
                            src={selectedImage.fullUrl}
                            className={styles.activeImage}
                            alt={selectedImage.fullKey}
                            style={{
                                transform: `translateX(${translateX}px)`,
                                transition: isDraggingRef.current
                                    ? "none"
                                    : "transform 0.3s ease",
                            }}
                        />

                        <img
                            src={nextImage.fullUrl}
                            className={styles.sideImage}
                            alt="next"
                        />
                    </div>

                    <button
                        className={styles.closeButton}
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
};

export default CustomStorageImage;