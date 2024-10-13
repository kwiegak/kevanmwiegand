import React, { FC } from 'react';
import styles from './Photos.module.css';
import CustomStorageImage from '../common/CustomStorageImage';

interface NewYorkProps { }

const NewYork: FC<NewYorkProps> = () => {
  return (
    <>
      {
        <CustomStorageImage path='nyc'></CustomStorageImage>
      }
    </>
  );
}

export default NewYork;

