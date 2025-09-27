import React, { FC, useState, useEffect, useCallback } from "react";
import { list } from "@aws-amplify/storage";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import styles from "./CustomStorageImage.module.css";

interface CustomStorageProps {
    path: string;
}

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const CustomStorageImage: FC<CustomStorageProps> = ({ path }) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const fetchImages = useCallback(async () => {
        try {
            setLoading(true);
            const result = await list({
                path: `public/${path}/`,

            });
            const filePaths = result.items
                .map((item) => item.path)
                .filter((p): p is string => !!p);
            setImages(shuffleArray(filePaths));
        } catch (error) {
            console.error("Error fetching images from S3:", error);
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => {
        setImages([]); // reset when path changes
        fetchImages();
    }, [path, fetchImages]);

    return (
        <>
            {loading && <p className={styles.loading}>Loading...</p>}

            <div className={styles.gallery}>
                {images.map((file) => (
                    <div
                        key={file}
                        className={styles.imageWrapper}
                        onClick={() => setSelectedImage(file)}
                    >
                        <StorageImage
                            path={file}
                            alt="photo-item"
                            className={styles.image}
                            loading="lazy"
                            validateObjectExistence={false}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox modal */}
            {selectedImage && (
                <div className={styles.modal} onClick={() => setSelectedImage(null)}>
                    <StorageImage
                        path={selectedImage}
                        alt="Full Size"
                        className={styles.modalImage}
                        validateObjectExistence={false}
                    />
                </div>
            )}
        </>
    );
};

export default CustomStorageImage;