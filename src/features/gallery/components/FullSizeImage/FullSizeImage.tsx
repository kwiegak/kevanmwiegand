import { FC, useState, useEffect, useRef } from "react";
import styles from "./FullSizeImage.module.css";

type Props = {
    fullKey: string;
    fullUrl: string;
};

const FullSizeImage: FC<Props> = ({ fullKey, fullUrl }) => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = imgRef.current;

        if (img && img.complete) {
            // ✅ Image already cached → skip placeholder
            setLoaded(true);
        }
    }, [fullUrl]);

    return (
        <>
            {!loaded && <div className={styles.modalPlaceholder} />}

            <img
                ref={imgRef}
                src={fullUrl}
                alt={fullKey}
                className={`${styles.modalImage} ${loaded ? styles.visible : ""}`}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
};

export default FullSizeImage;