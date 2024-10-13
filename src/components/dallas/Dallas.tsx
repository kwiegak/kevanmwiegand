import React, { FC } from 'react';
import styles from './Photos.module.css';
import CustomStorageImage from '../common/CustomStorageImage';

interface DallasProps { }

const Dallas: FC<DallasProps> = () => {
  return (
    <>
      {
        <CustomStorageImage path='dallas'></CustomStorageImage>
      }
    </>
  );
}

export default Dallas;

