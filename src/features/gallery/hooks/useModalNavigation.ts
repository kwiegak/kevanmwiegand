import { useState, useCallback, useEffect } from "react";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
    thumbnailUrl: string;
    fullUrl: string;
};

export const useModalNavigation = (allImages: ImageItem[]) => {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    const closeModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    const navigateNext = useCallback(() => {
        if (!selectedImage || allImages.length === 0) return;

        const currentIndex = allImages.findIndex(
            (img) => img.fullKey === selectedImage.fullKey
        );

        const next = allImages[(currentIndex + 1) % allImages.length];
        setSelectedImage(next);
    }, [allImages, selectedImage]);

    const navigatePrev = useCallback(() => {
        if (!selectedImage || allImages.length === 0) return;

        const currentIndex = allImages.findIndex(
            (img) => img.fullKey === selectedImage.fullKey
        );

        const prev =
            allImages[
                (currentIndex - 1 + allImages.length) % allImages.length
            ];

        setSelectedImage(prev);
    }, [allImages, selectedImage]);

    useEffect(() => {
        if (!selectedImage) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") navigateNext();
            if (e.key === "ArrowLeft") navigatePrev();
            if (e.key === "Escape") closeModal();
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [selectedImage, navigateNext, navigatePrev, closeModal]);

    // 🚀 Preload next image (now uses fullUrl directly — no getUrl!)
    useEffect(() => {
        if (!selectedImage || allImages.length === 0) return;

        const currentIndex = allImages.findIndex(
            (img) => img.fullKey === selectedImage.fullKey
        );

        const next = allImages[(currentIndex + 1) % allImages.length];
        if (!next) return;

        const img = new Image();
        img.src = next.fullUrl;
    }, [selectedImage, allImages]);

    return {
        selectedImage,
        setSelectedImage,
        closeModal,
        navigateNext,
        navigatePrev,
    };
};