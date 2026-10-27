import { Settings2 } from "lucide-react";
import type {
  CompressionSettingsProps,
  ImageFormat,
} from "../../types/image";
import styles from "./CompressionSettings.module.css";

export default function CompressionSettings({
  format,
  quality,
  onFormatChange,
  onQualityChange,
}: CompressionSettingsProps) {
  const formats: { value: ImageFormat; label: string }[] = [
    { value: "webp", label: "WebP" },
    { value: "avif", label: "AVIF" },
  ];

  return (
    <section className={styles.settingsPanel}>
      <div className={styles.sectionHeading}>
        <Settings2 size={20} />
        <h2>Настройки сжатия</h2>
      </div>

      <div className={styles.setting}>
        <label>Формат результата</label>

        <div className={styles.formatOptions}>
          {formats.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`${styles.formatButton} ${
                format === item.value ? styles.active : ""
              }`}
              onClick={() => onFormatChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.setting}>
        <div className={styles.qualityHeading}>
          <label htmlFor="quality">Качество изображения</label>
          <strong>{quality}%</strong>
        </div>

        <input
          id="quality"
          className={styles.qualitySlider}
          type="range"
          min="1"
          max="100"
          step="1"
          value={quality}
          onChange={(event) =>
            onQualityChange(Number(event.target.value))
          }
        />

        <div className={styles.rangeLabels}>
          <span>Меньше размер</span>
          <span>Выше качество</span>
        </div>
      </div>
    </section>
  );
}
