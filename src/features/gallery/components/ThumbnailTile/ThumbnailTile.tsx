import { FC } from "react";
import { getUrl } from "@aws-amplify/storage";
import { useEffect, useState } from "react";
import styles from "./ThumbnailTile.module.css";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
};

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

export default ThumbnailTile;