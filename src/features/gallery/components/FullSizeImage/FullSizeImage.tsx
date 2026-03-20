import { FC, useEffect, useState } from "react";
import { getUrl } from "@aws-amplify/storage";
import styles from "./FullSizeImage.module.css";

type Props = {
    fullKey: string;
};

const FullSizeImage: FC<{ fullKey: string }> = ({ fullKey }) => {
    const [url, setUrl] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const r = await getUrl({ key: fullKey });
                if (mounted) setUrl(String(r?.url ?? r));
            } catch (err) {
                console.error("getUrl full image", err);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [fullKey]);

    return (
        <>
            {!loaded && <div className={styles.modalPlaceholder} />}
            {url && (
                <img
                    src={url}
                    alt={fullKey}
                    className={`${styles.modalImage} ${loaded ? styles.visible : ""}`}
                    onLoad={() => setLoaded(true)}
                />
            )}
        </>
    );
};

export default FullSizeImage;