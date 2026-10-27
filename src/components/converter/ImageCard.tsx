import { Download, X, CheckCircle2, LoaderCircle } from "lucide-react";
import type { ConvertedImage, ImageFormat } from "../../types/image";
import { downloadBlob, formatBytes, getOutputName } from "../../utils/fileUtils";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: ConvertedImage;
  format: ImageFormat;
  onRemove: (id: string) => void;
}

export default function ImageCard({
  image,
  format,
  onRemove,
}: ImageCardProps) {
  const saving = image.resultSize !== undefined
    ? Math.round(
        (1 - image.resultSize / image.file.size) * 100
      )
    : null;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.thumbnail}>
          <img src={image.previewUrl} alt={image.file.name} />
        </div>

        <div className={styles.info}>
          <strong title={image.file.name}>{image.file.name}</strong>
          <span>Исходный: {formatBytes(image.file.size)}</span>
          {image.status === "done" && image.resultSize !== undefined && (
            <span>Результат: {formatBytes(image.resultSize)}</span>
          )}
        </div>

        <button
          className={`${styles.iconButton} ${styles.removeButton}`}
          title="Удалить изображение"
          aria-label={`Удалить ${image.file.name}`}
          onClick={() => onRemove(image.id)}
        >
          <X size={18} />
        </button>
      </div>

      {image.status === "processing" && (
        <div className={styles.status}>
          <LoaderCircle className={styles.spin} size={16} />
          Конвертация...
        </div>
      )}

      {image.status === "done" && image.resultUrl && (
        <>
          <div className={styles.comparison}>
            <div>
              <img src={image.previewUrl} alt="До сжатия" />
              <span>До</span>
            </div>
            <div>
              <img src={image.resultUrl} alt="После сжатия" />
              <span>После</span>
            </div>
          </div>

          <div className={styles.resultInfo}>
            <span>
              <CheckCircle2 size={15} />
              {saving !== null && saving > 0
                ? `Экономия ${saving}%`
                : saving !== null && saving < 0
                  ? `Размер вырос на ${Math.abs(saving)}%`
                  : "Размер не изменился"}
            </span>

            <button
              className={styles.downloadButton}
              onClick={() => {
                if (image.resultBlob) {
                  downloadBlob(
                    image.resultBlob,
                    getOutputName(image.file.name, format)
                  );
                }
              }}
            >
              <Download size={16} />
              Скачать
            </button>
          </div>
        </>
      )}

      {image.status === "error" && (
        <p className={styles.errorMessage}>
          {image.error || "Не удалось обработать изображение"}
        </p>
      )}
    </article>
  );
}
