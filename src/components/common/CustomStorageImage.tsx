import React, { FC, useState, useEffect } from 'react';
import styles from './Photos.module.css';
import { getUrl, list } from '@aws-amplify/storage'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';

async function getAllImageFilePathsFromS3Bucket(path: string) {
    let filepaths: Array<string> = [];
    const result = await list({ path: 'public/' + path });
    let listOfS3Items = shuffle(result.items);
    listOfS3Items.forEach((x) => {
        if (x.length > 0) {
            filepaths.push(x);
        }
    })
    return filepaths
}

function shuffle(array: Array<any>) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    var randomizedArray = array.map(function (array) {
        return array['path'];
    });

    return randomizedArray;
}

interface CustomStorageProps { path: string }

const CustomStorageImage: FC<CustomStorageProps> = (customPath) => {

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        getAllImageFilePathsFromS3Bucket(customPath.path).then(x => {
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

export default CustomStorageImage;

