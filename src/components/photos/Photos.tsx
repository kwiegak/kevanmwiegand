import { FC } from 'react';
import styles from './Photos.module.css';
import PhotoAlbum from "react-photo-album";

const photos = [
  { src: "./images/DSC00615.jpg", width: 1600, height: 900 },
  { src: "./images/DSC02241.jpg", width: 1600, height: 900 },
  { src: "./images/DSC01804.jpg", width: 1600, height: 900 },
];

interface PhotosProps {}

const Photos: FC<PhotosProps> = () => (
  <div className={styles.Photos}>
    <div>
      <div className="jumbotron">
        <h1 style={{ color: 'white' }} >Latest Photos</h1>
        <PhotoAlbum layout="rows" photos={photos} />
      </div>
    </div>
  </div>
);

export default Photos;
