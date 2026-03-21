import { FC, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { chunkArray } from "../../utils/chunkArray";
import ThumbnailTile from "../ThumbnailTile/ThumbnailTile"
import FullSizeImage from "../FullSizeImage/FullSizeImage";
import styles from "./CustomStorageImage.module.css";
import { useGalleryImages } from "../../hooks/useGalleryImages";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useModalNavigation } from "../../hooks/useModalNavigation";

interface CustomStorageProps {
    path: string;
}

const PAGE_SIZE = 40;
const ROW_SIZE = 6;

const CustomStorageImage: FC<CustomStorageProps> = ({ path }) => {
    const { images: allImages, loading: loadingList, fetchImages } = useGalleryImages();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const hasMore = visibleCount < allImages.length;
    const {
        selectedImage,
        setSelectedImage,
        closeModal,
        navigateNext,
        navigatePrev,
    } = useModalNavigation(allImages);

    const loadMore = useCallback(() => {
        setVisibleCount((v) =>
            Math.min(allImages.length, v + PAGE_SIZE)
        );
    }, [allImages.length]);

    const { loaderRef } = useInfiniteScroll({
        onLoadMore: loadMore,
        hasMore,
        loading: loadingList,
    });

    const visibleImages = useMemo(
        () => allImages.slice(0, visibleCount),
        [allImages, visibleCount]
    );

    const rowChunks = useMemo(
        () => chunkArray(visibleImages, ROW_SIZE),
        [visibleImages]
    );

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
        fetchImages(path);
    }, [path, fetchImages]);


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
            <div ref={loaderRef} style={{ height: 1 }} />
            {selectedImage && (
                <div ref={modalRef} tabIndex={-1} className={styles.modal}>
                    <div className={styles.navAreaLeft} onClick={navigatePrev} />
                    <FullSizeImage fullKey={selectedImage} />
                    <div className={styles.navAreaRight} onClick={navigateNext} />
                    <button className={styles.closeButton} onClick={closeModal}>
                        ✕
                    </button>
                </div>
            )}
        </>
    );
};

export default CustomStorageImage;