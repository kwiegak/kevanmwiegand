import { FC } from 'react';
import styles from './Photos.module.css';
import CustomStorageImage from '../common/CustomStorageImage';

interface RedHotProps { }

const RedHot: FC<RedHotProps> = () => {
  return (
    <>
      {
        <CustomStorageImage path='rhcp'></CustomStorageImage>
      }
    </>
  );
}

export default RedHot;

