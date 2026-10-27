
import { encode as encodeWebP } from "@jsquash/webp";
import { encode as encodeAVIF } from "@jsquash/avif";
import type { ImageFormat } from "../types/image";

export async function convertImage(
  file: File,
  format: ImageFormat,
  quality: number
): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      throw new Error("Не удалось создать контекст изображения");
    }

    context.drawImage(bitmap, 0, 0);

    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const options = { quality: Math.round(quality) };

    const buffer =
      format === "webp"
        ? await encodeWebP(imageData, options)
        : await encodeAVIF(imageData, options);

    return {
      blob: new Blob([buffer], {
        type: `image/${format}`,
      }),
      width: bitmap.width,
      height: bitmap.height,
    };
  } finally {
    bitmap.close();
  }
}
