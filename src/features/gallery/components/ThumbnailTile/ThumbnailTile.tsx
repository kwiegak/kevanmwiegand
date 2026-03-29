import { FC, useState, memo } from "react";
import styles from "./ThumbnailTile.module.css";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
    thumbnailUrl: string;
    fullUrl: string;
};

type Props = {
    item: ImageItem;
    onClick: (item: ImageItem) => void;
};

const ThumbnailTileComponent: FC<Props> = ({ item, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={styles.imageWrapper}
            onClick={() => onClick(item)}
        >
            {!loaded && <div className={styles.placeholder} />}

            <img
                src={item.thumbnailUrl}
                alt={item.fullKey}
                loading="lazy"
                decoding="async"
                className={`${styles.image} ${loaded ? styles.visible : ""}`}
                onLoad={() => setLoaded(true)}
                width="400"
                height="300"
            />
        </div>
    );
};

const ThumbnailTile = memo(ThumbnailTileComponent);

export default ThumbnailTile;