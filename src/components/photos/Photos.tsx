import React, { FC, useState, useEffect  } from 'react';
import styles from './Photos.module.css';

interface PhotosProps {}
const initialFormState = { name: "", description: "", image: "" };
const Photos: FC<PhotosProps> = () => (
  <div className={styles.Photos}>
    <div>
      <div className="jumbotron">
        <h1>See my latest photography</h1>
        <p>Coming Soon</p>
      </div>
    </div>
  </div>
);

export default Photos;
