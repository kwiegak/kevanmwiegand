import React, { FC, useState, useEffect } from 'react';
import styles from './Photos.module.css';
import { getUrl, list } from '@aws-amplify/storage'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';

async function getAllImageFilePathsFromS3Bucket() {  
  let filepaths: Array<string> = [];
  const result = await list({ path: 'public/dallas' });
  let listOfS3Items = result.items;
  listOfS3Items.forEach((x) => {
    if (x.size)
    filepaths.push(x.path);
  })
  return filepaths
}

interface DallasProps { }

const Dallas: FC<DallasProps> = () => {

  const [images, setImages] = useState<string[]>([]);


  useEffect(() => {
    getAllImageFilePathsFromS3Bucket().then(x => {
      setImages(x);
      
    });
  }, []);

    return (
      <>
          {
            images.map((file) => {
              return (
                <StorageImage
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt="photo-item"
                  path={file} key={file}
                  validateObjectExistence={false} />
              )
            })
          }   
      </>
  );
}

export default Dallas;

