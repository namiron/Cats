import React from "react";
import styles from "./styles/cat-image.module.scss";

interface CatImageProps {
  imageUrl: string | null;
}

export const CatImage: React.FC<CatImageProps> = ({ imageUrl }) => {
  return <div className={styles.catImage}>{imageUrl ? <img src={imageUrl} alt="cat" width={300} /> : <p>No cat loaded yet</p>}</div>;
};
