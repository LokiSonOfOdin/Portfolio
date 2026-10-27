import { Download, ImagePlus, Sparkles } from "lucide-react";
import UploadArea from "./UploadArea";
import CompressionSettings from "./CompressionSettings";
import ImageList from "./ImageList";
import { useImageConverter } from "../../hooks/useImageConverter";
import { downloadAll } from "../../utils/fileUtils";
import styles from "./ConverterView.module.css";

export default function ConverterView() {
  const {
    images,
    format,
    quality,
    addFiles,
    removeImage,
    setFormat,
    setQuality,
  } = useImageConverter();

  const readyCount = images.filter(
    (image) => image.status === "done" && image.resultBlob
  ).length;

  const originalSize = images.reduce(
    (sum, image) => sum + image.file.size,
    0
  );

  const convertedSize = images.reduce(
    (sum, image) => sum + (image.resultSize ?? 0),
    0
  );

  return (
    <div className={styles.converter}>
      <div className={styles.toolbar}>
        <span className={styles.localBadge}>
          <span className={styles.statusDot} />
          Обработка в браузере
        </span>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroLabel}>
          <Sparkles size={15} />
          Умная оптимизация изображений
        </div>

        <h1>
          Меньше размер.
          <br />
          <span>Больше возможностей.</span>
        </h1>

        <p>
          Конвертируйте изображения в WebP и AVIF.
          Управляйте качеством и сравнивайте результат до скачивания.
        </p>
      </section>

      <div className={styles.workspace}>
        <UploadArea onFilesSelected={addFiles} />

        <CompressionSettings
          format={format}
          quality={quality}
          onFormatChange={setFormat}
          onQualityChange={setQuality}
        />
      </div>

      {images.length > 0 && (
        <section className={styles.summaryPanel}>
          <div className={styles.summaryStat}>
            <span>Файлов</span>
            <strong>{images.length}</strong>
          </div>

          <div className={styles.summaryStat}>
            <span>Готово</span>
            <strong>{readyCount}</strong>
          </div>

          <div className={styles.summaryStat}>
            <span>Исходный размер</span>
            <strong>
              {(originalSize / 1024 / 1024).toFixed(2)} МБ
            </strong>
          </div>

          <div className={styles.summaryStat}>
            <span>Результат</span>
            <strong>
              {readyCount
                ? `${(convertedSize / 1024 / 1024).toFixed(2)} МБ`
                : "—"}
            </strong>
          </div>

          <button
            className={styles.downloadAllButton}
            disabled={!readyCount}
            onClick={() => void downloadAll(images, format)}
          >
            <Download size={18} />
            Скачать всё ZIP
          </button>
        </section>
      )}

      <ImageList
        images={images}
        format={format}
        onRemove={removeImage}
      />

      {images.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <ImagePlus size={26} />
          </div>
          <h3>Здесь появятся ваши изображения</h3>
          <p>
            Добавьте файлы, выберите формат и настройте качество сжатия.
          </p>
        </div>
      )}

      <footer className={styles.footer}>
        <span>Ваши изображения остаются на устройстве</span>
      </footer>
    </div>
  );
}
