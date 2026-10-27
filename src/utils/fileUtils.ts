
import JSZip from "jszip";
import type { ConvertedImage, ImageFormat } from "../types/image";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} КБ`;

  return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
}

export function getOutputName(
  fileName: string,
  format: ImageFormat
): string {
  const baseName = fileName.replace(/\.[^.]+$/, "");
  return `${baseName}.${format}`;
}

export function downloadBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = name;
  link.click();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadAll(
  images: ConvertedImage[],
  format: ImageFormat
): Promise<void> {
  const ready = images.filter((image) => image.resultBlob);

  if (!ready.length) return;

  const zip = new JSZip();

  ready.forEach((image) => {
    zip.file(
      getOutputName(image.file.name, format),
      image.resultBlob!
    );
  });

  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob(blob, `converted-images-${format}.zip`);
}
