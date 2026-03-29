import { FC, useState } from "react";
import styles from "./ThumbnailTile.module.css";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
    thumbnailUrl: string;
    fullUrl: string;
};

const ThumbnailTile: FC<{
    item: ImageItem;
    onClick: (fullKey: string) => void;
}> = ({ item, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={styles.imageWrapper}
            onClick={() => onClick(item.fullKey)}
        >
            {!loaded && <div className={styles.placeholder} />}

            <img
                src={item.thumbnailUrl}
                alt={item.fullKey}
                loading="lazy"
                className={`${styles.image} ${loaded ? styles.visible : ""}`}
                onLoad={() => setLoaded(true)}
                width="400"
                height="300"
            />
        </div>
    );
};

export default ThumbnailTile;