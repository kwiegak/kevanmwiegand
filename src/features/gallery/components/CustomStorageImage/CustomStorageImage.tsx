import { FC, useEffect, useRef, useCallback } from "react";
import ThumbnailTile from "../ThumbnailTile/ThumbnailTile";
import FullSizeImage from "../FullSizeImage/FullSizeImage";
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

    const handleThumbnailClick = useCallback((item: ImageItem) => {
        const img = new Image();
        img.src = item.fullUrl;

        setSelectedImage(item);
    }, [setSelectedImage]);

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
                <div ref={modalRef} tabIndex={-1} className={styles.modal}>
                    <div
                        className={styles.navAreaLeft}
                        onClick={navigatePrev}
                    />

                    <FullSizeImage
                        fullKey={selectedImage.fullKey}
                        fullUrl={selectedImage.fullUrl}
                    />

                    <div
                        className={styles.navAreaRight}
                        onClick={navigateNext}
                    />

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