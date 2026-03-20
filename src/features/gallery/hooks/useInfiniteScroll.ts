import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [callback]);

  return sentinelRef;
}