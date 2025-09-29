import { useParams } from "react-router-dom";
import React, { FC } from 'react';
import CustomStorageImage from '../common/CustomStorageImage';

const Gallery: FC = () => {
    const { category } = useParams<{ category: string }>();
    return <CustomStorageImage path={category ?? "all"} />;
};

export default Gallery;