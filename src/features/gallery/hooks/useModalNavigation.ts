import { useState, useCallback, useEffect } from "react";
import { getUrl } from "@aws-amplify/storage";

type ImageItem = {
    fullKey: string;
};

export const useModalNavigation = (allImages: ImageItem[]) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const closeModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    const navigateNext = useCallback(() => {
        if (!selectedImage || allImages.length === 0) return;

        const currentIndex = allImages.findIndex(
            (img) => img.fullKey === selectedImage
        );

        setSelectedImage(
            allImages[(currentIndex + 1) % allImages.length].fullKey
        );
    }, [allImages, selectedImage]);

    const navigatePrev = useCallback(() => {
        if (!selectedImage || allImages.length === 0) return;

        const currentIndex = allImages.findIndex(
            (img) => img.fullKey === selectedImage
        );

        setSelectedImage(
            allImages[
                (currentIndex - 1 + allImages.length) % allImages.length
            ].fullKey
        );
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

    useEffect(() => {
        if (!selectedImage || allImages.length === 0) return;

        const currentIndex = allImages.findIndex(
            (img) => img.fullKey === selectedImage
        );

        const next = allImages[(currentIndex + 1) % allImages.length];
        if (!next) return;

        getUrl({ key: next.fullKey })
            .then((r) => {
                const img = new Image();
                img.src = String(r?.url ?? r);
            })
            .catch(() => {});
    }, [selectedImage, allImages]);

    return {
        selectedImage,
        setSelectedImage,
        closeModal,
        navigateNext,
        navigatePrev,
    };
};