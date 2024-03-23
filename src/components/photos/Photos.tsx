import { FC, useEffect, useState } from 'react';
import styles from './Photos.module.css';
import PhotoAlbum from "react-photo-album";
import { Amplify } from 'aws-amplify';
import API from '@aws-amplify/api';
import Storage from '@aws-amplify/storage'
import { listTodos } from "../../graphql/queries";
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation,
} from "../../graphql/mutations";

const photos = [
  { src: "./images/11.jpg", width: 1600, height: 900 },
  { src: "./images/22.jpg", width: 1600, height: 900 },
  { src: "./images/44.jpg", width: 1600, height: 900 },
];

useEffect(() => {  
    fetchTodos();
}, []);

async function fetchTodos() {
  console.log("Test");
  }

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
