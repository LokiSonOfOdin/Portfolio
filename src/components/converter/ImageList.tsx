import type { ConvertedImage, ImageFormat } from "../../types/image";
import ImageCard from "./ImageCard";
import styles from "./ImageList.module.css";

interface ImageListProps {
  images: ConvertedImage[];
  format: ImageFormat;
  onRemove: (id: string) => void;
}

export default function ImageList({
  images,
  format,
  onRemove,
}: ImageListProps) {
  if (!images.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <h2>Ваши изображения</h2>
        <span className={styles.imageCount}>{images.length}</span>
      </div>

      <div className={styles.imageGrid}>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            format={format}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
