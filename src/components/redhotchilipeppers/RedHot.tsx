import { FC, useState, useEffect } from 'react';
import styles from './Photos.module.css';
import { list } from '@aws-amplify/storage'
import { StorageImage } from '@aws-amplify/ui-react-storage';

async function getAllImageFilePathsFromS3Bucket() {  
  let filepaths: Array<string> = [];
  const result = await list({ path: 'public/rhcp/' });
  let listOfS3Items = result.items;
  listOfS3Items.forEach((x) => {
    if (x.size)
    filepaths.push(x.path);
  })
  return filepaths
}

interface RedHotProps { }

const RedHot: FC<RedHotProps> = () => {

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

export default RedHot;

