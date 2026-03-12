import { FC } from "react";
import { useParams } from "react-router-dom";
import CustomStorageImage from "../CustomStorageImage/CustomStorageImage";
import styles from "./Gallery.module.css";

const Gallery: FC = () => {
    const { category } = useParams<{ category: string }>();

    const galleryCategory = category ?? "thailand";

    return (
        <main className={styles.galleryContainer}>
            <CustomStorageImage path={galleryCategory} />
        </main>
    );
};

export default Gallery;