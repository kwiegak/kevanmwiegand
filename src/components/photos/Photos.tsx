import { FC } from 'react';
import styles from './Photos.module.css';
import PhotoAlbum from "react-photo-album";
import { Amplify } from 'aws-amplify';

const photos = [
  { src: "./images/11.jpg", width: 1600, height: 900 },
  { src: "./images/22.jpg", width: 1600, height: 900 },
  { src: "./images/44.jpg", width: 1600, height: 900 },
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
