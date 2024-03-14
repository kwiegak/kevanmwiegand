import { FC } from 'react';
import styles from './Photos.module.css';
import PhotoAlbum from "react-photo-album";

const photos = [
  { src: "./images/dots.png", width: 800, height: 600 },
  { src: "./images/flower.png", width: 1600, height: 900 },
];

interface PhotosProps {}

const Photos: FC<PhotosProps> = () => (
  <div className={styles.Photos}>
    <div>
      <div className="jumbotron">
        <h1>See my latest photography</h1>
        <PhotoAlbum layout="rows" photos={photos} />
      </div>
    </div>
  </div>
);

export default Photos;
