import React, { FC, useEffect, useState } from 'react';
import styles from './Photos.module.css';
import PhotoAlbum from "react-photo-album";
import { Amplify } from 'aws-amplify';
import { generateClient }  from '@aws-amplify/api';
import Storage from '@aws-amplify/storage'
import { listTodos } from "../../graphql/queries";
import {
  createTodo,
  deleteTodo
} from "../../graphql/mutations";

const client = generateClient();

const photos = [
  { src: "./images/11.jpg", width: 1600, height: 900 },
  { src: "./images/22.jpg", width: 1600, height: 900 },
  { src: "./images/44.jpg", width: 1600, height: 900 },
];

async function writeTodo() {
    const apiData = await client.graphql({
        query: createTodo,
        variables: {
          input: {
            name: "My first todo!",
            description: "Test"
          }
      }
    });
}

async function readTodo() {
  const result = await client.graphql({ query: listTodos });
  console.log(result);
}

async function getS3() {
  s3.
}


interface PhotosProps {}

const Photos: FC<PhotosProps> = () => {

  React.useEffect(() => {
    getS3();
    writeTodo();
    readTodo();
  }, [])

    return (
    <>
      <div className={styles.Photos}>
        <div>
          <div className="jumbotron">
            <h1 style={{ color: 'white' }} >Latest Photos</h1>
            <PhotoAlbum layout="rows" photos={photos} />
          </div>
        </div>
      </div>
    </>
    
  );
}

export default Photos;
