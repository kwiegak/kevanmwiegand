import React, { FC } from 'react';
import styles from './Photos.module.css';
import CustomStorageImage from '../common/CustomStorageImage';

interface MiscProps { }

const Misc: FC<MiscProps> = () => {
    return (
        <>
            {
                <CustomStorageImage path='misc'></CustomStorageImage>
            }
        </>
    );
}

export default Misc;

