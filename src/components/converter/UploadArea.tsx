import { useRef, useState } from "react";
import { Upload, Images } from "lucide-react";
import styles from "./UploadArea.module.css";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

export default function UploadArea({
  onFilesSelected,
}: UploadAreaProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | File[]) => {
    const images = Array.from(files).filter(
      (file) => file.type.startsWith("image/")
    );

    onFilesSelected(images);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={`${styles.uploadArea} ${dragging ? styles.isDragging : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        addFiles(event.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          if (event.target.files) addFiles(event.target.files);
        }}
      />

      <div className={styles.uploadIcon}>
        <Upload size={30} />
      </div>

      <h3>Перетащите изображения сюда</h3>
      <p>Или нажмите, чтобы выбрать файлы</p>

      <span className={styles.uploadFormats}>
        <Images size={15} />
        JPG, PNG, GIF, WebP, AVIF и другие поддерживаемые браузером форматы
      </span>
    </div>
  );
}
