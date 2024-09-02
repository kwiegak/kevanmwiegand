import React, { FC, useEffect, useState } from 'react';
import styles from './Photos.module.css';
import PhotoAlbum from "react-photo-album";
import { generateClient }  from '@aws-amplify/api';
import { getUrl, list } from '@aws-amplify/storage'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
import { listTodos } from "../../graphql/queries";
import {
  createTodo,
  deleteTodo
} from "../../graphql/mutations";

const client = generateClient();

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

async function getAllImageFilePathsFromS3Bucket() {  
  let filepaths: Array<string> = [];
  const result = await list({ path: 'public/' });
  let listOfS3Items = result.items;
  listOfS3Items.forEach((x) => {
    if (x.size)
    filepaths.push(x.path);
  })
  return filepaths
}

interface PhotosProps {}

const Photos: FC<PhotosProps> = () => {
  const [images, setImages] = useState<string[]>([])
  
  React.useEffect(() => {
    getAllImageFilePathsFromS3Bucket().then(x => {
      setImages(x);
    });
    //writeTodo();
    //readTodo();
  }, [])
    return (
      <>

        { images.map(file => <StorageImage alt="photo-item" path={file} key={file} />) }          
      </>
  );
}

export default Photos;
