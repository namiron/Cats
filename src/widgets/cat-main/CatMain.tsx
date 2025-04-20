import React, { useState, useEffect } from "react";
import CatControls from "../cat-controls/CatControls";
import { CatImage } from "../cat-image/CatImage";
import styles from "./styles/cat-main.module.scss";

export const CatMain: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const getCat = async () => {
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      setImageUrl(data[0].url);
    } catch (err) {
      console.error("Failed to fetch cat", err);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (enabled && autoRefresh) {
      getCat();
      interval = setInterval(() => {
        getCat();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [enabled, autoRefresh]);

  return (
    <div className={styles.wrapper}>
      <CatControls
        enabled={enabled}
        autoRefresh={autoRefresh}
        onToggleEnabled={() => setEnabled((prev) => !prev)}
        onToggleAutoRefresh={() => setAutoRefresh((prev) => !prev)}
        onGetCat={getCat}
      />
      <CatImage imageUrl={imageUrl} />
    </div>
  );
};
