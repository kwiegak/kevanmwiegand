import { FC, useState } from "react";
import styles from "./FullSizeImage.module.css";

type Props = {
    fullKey: string;
    fullUrl: string;
};

const FullSizeImage: FC<Props> = ({ fullKey, fullUrl }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && <div className={styles.modalPlaceholder} />}

            <img
                src={fullUrl}
                alt={fullKey}
                className={`${styles.modalImage} ${loaded ? styles.visible : ""}`}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
};

export default FullSizeImage;