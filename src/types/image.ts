
export type ImageFormat = "webp" | "avif";

export type ConversionStatus =
  | "waiting"
  | "processing"
  | "done"
  | "error";

export interface ConvertedImage {
  id: string;
  file: File;
  previewUrl: string;
  resultUrl?: string;
  resultBlob?: Blob;
  resultSize?: number;
  width?: number;
  height?: number;
  status: ConversionStatus;
  error?: string;
}

export interface CompressionSettingsProps {
  format: ImageFormat;
  quality: number;
  onFormatChange: (format: ImageFormat) => void;
  onQualityChange: (quality: number) => void;
}
