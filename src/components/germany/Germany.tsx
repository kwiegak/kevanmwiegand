import React, { FC } from 'react';
import styles from './Photos.module.css';
import CustomStorageImage from '../common/CustomStorageImage';

interface GermanyProps { }

const Germany: FC<GermanyProps> = () => {
    return (
        <>
            {
                <CustomStorageImage path='germany'></CustomStorageImage>
            }
        </>
    );
}

export default Germany;

