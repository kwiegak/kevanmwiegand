import { FC } from "react";
import ThumbnailTile from "../ThumbnailTile/ThumbnailTile";

type ImageItem = {
    fullKey: string;
    thumbnailKey: string;
};

type Props = {
    row: ImageItem[];
    startIndex: number;
    onClick: (index: number) => void;
};

const GalleryRow: FC<Props> = ({ row, startIndex, onClick }) => {
    return (
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            {/* {row.map((image, i) => (
                <ThumbnailTile
                    key={image.thumbnailKey}
                    thumbnailKey={image.thumbnailKey}
                    index={startIndex + i}
                    onClick={onClick}
                />
            ))} */}
        </div>
    );
};

export default GalleryRow;