import { FC, useEffect, useRef } from "react";
import ThumbnailTile from "../ThumbnailTile/ThumbnailTile";
import FullSizeImage from "../FullSizeImage/FullSizeImage";
import styles from "./CustomStorageImage.module.css";
import { useGalleryImages } from "../../hooks/useGalleryImages";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useModalNavigation } from "../../hooks/useModalNavigation";

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

    const handleLoadMore = () => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        fetchImages(path).finally(() => {
            loadingRef.current = false;
        });
    };

    const { loaderRef } = useInfiniteScroll({
        onLoadMore: handleLoadMore,
        hasMore,
        loading,
    });

    useEffect(() => {
        fetchImages(path, true);
    }, [path]);

    return (
        <>
            {loading && images.length === 0 && (
                <p className={styles.loading}>Loading...</p>
            )}
            <div className={styles.grid}>
                {images.map((it) => (
                    <ThumbnailTile
                        key={it.fullKey}
                        item={it}
                        onClick={(fullKey) => setSelectedImage(fullKey)}
                    />
                ))}
            </div>
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