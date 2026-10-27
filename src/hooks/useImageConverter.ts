
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConvertedImage, ImageFormat } from "../types/image";
import { convertImage } from "../utils/imageEncoder";

export function useImageConverter() {
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [format, setFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(80);

  const imagesRef = useRef(images);

  // Синхронизируем ref с актуальным состоянием.
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const addFiles = useCallback((files: File[]) => {
    const added: ConvertedImage[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      status: "waiting",
    }));

    setImages((current) => [...current, ...added]);
  }, []);

  const removeImage = useCallback((id: string) => {
    const image = imagesRef.current.find((item) => item.id === id);

    if (image) {
      URL.revokeObjectURL(image.previewUrl);

      if (image.resultUrl) {
        URL.revokeObjectURL(image.resultUrl);
      }
    }

    setImages((current) => current.filter((item) => item.id !== id));
  }, []);

  // Отдельная переменная — ESLint может проверить зависимости.
  const imageIds = images.map((image) => image.id).join(",");

  useEffect(() => {
    if (!imageIds) return;

    let cancelled = false;

    const timer = window.setTimeout(() => {
      const run = async () => {
        // Берём актуальный список из ref, не обращаясь к images напрямую.
        const currentImages = [...imagesRef.current];

        for (const image of currentImages) {
          if (cancelled) return;

          setImages((current) =>
            current.map((item) =>
              item.id === image.id
                ? {
                    ...item,
                    status: "processing",
                    error: undefined,
                  }
                : item
            )
          );

          try {
            const result = await convertImage(
              image.file,
              format,
              quality
            );

            if (cancelled) return;

            const resultUrl = URL.createObjectURL(result.blob);

            setImages((current) => {
              const existing = current.find(
                (item) => item.id === image.id
              );

              // Изображение могли удалить во время конвертации.
              if (!existing) {
                URL.revokeObjectURL(resultUrl);
                return current;
              }

              if (existing.resultUrl) {
                URL.revokeObjectURL(existing.resultUrl);
              }

              return current.map((item) =>
                item.id === image.id
                  ? {
                      ...item,
                      resultUrl,
                      resultBlob: result.blob,
                      resultSize: result.blob.size,
                      width: result.width,
                      height: result.height,
                      status: "done",
                    }
                  : item
              );
            });
          } catch (error) {
            if (cancelled) return;

            setImages((current) =>
              current.map((item) =>
                item.id === image.id
                  ? {
                      ...item,
                      status: "error",
                      error:
                        error instanceof Error
                          ? error.message
                          : "Ошибка конвертации",
                    }
                  : item
              )
            );
          }
        }
      };

      void run();
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [imageIds, format, quality]);

  // Освобождаем URL при размонтировании хука.
  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);

        if (image.resultUrl) {
          URL.revokeObjectURL(image.resultUrl);
        }
      });
    };
  }, []);

  return {
    images,
    format,
    quality,
    addFiles,
    removeImage,
    setFormat,
    setQuality,
  };
}
