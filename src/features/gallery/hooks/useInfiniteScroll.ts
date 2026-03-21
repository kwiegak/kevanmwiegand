import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
    onLoadMore: () => void;
    hasMore: boolean;
    loading: boolean;
};

export const useInfiniteScroll = ({
    onLoadMore,
    hasMore,
    loading,
}: UseInfiniteScrollProps) => {
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = loaderRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !loading) {
                    onLoadMore();
                }
            },
            {
                rootMargin: "200px",
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [onLoadMore, hasMore, loading]);

    return { loaderRef };
};