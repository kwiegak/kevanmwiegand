import { useParams } from "react-router-dom";
import React, { FC, useEffect, useState } from 'react';
import CustomStorageImage from '../common/CustomStorageImage';

const Gallery: FC = () => {
    const { category } = useParams<{ category: string }>();
    const [navHeight, setNavHeight] = useState<number>(0);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            setNavHeight(navbar.getBoundingClientRect().height);
        }
    }, []);

    return (
        <div style={{ paddingTop: navHeight ? `${navHeight + 14}px` : '70px' }}>
            <CustomStorageImage path={category ?? "thailand"} />
        </div>
    );
};

export default Gallery;
