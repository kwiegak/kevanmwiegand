import { useState, useEffect, useCallback } from "react";

type ImageItem = {
  fullKey: string;
  thumbnailKey: string;
};

export function useModalNavigation(images: ImageItem[]) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  const openImage = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const navigateNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const navigatePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  // keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "Escape") closeModal();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, navigateNext, navigatePrev, closeModal]);

  return {
    selectedImage,
    selectedIndex,
    openImage,
    closeModal,
    navigateNext,
    navigatePrev
  };
}