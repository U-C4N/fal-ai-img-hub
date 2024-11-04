export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  category: string;
  isFavorite: boolean;
}

export interface GenerationParams {
  prompt: string;
  steps?: number;
  guidance?: number;
  seed?: number;
  width?: number;
  height?: number;
  num_images?: number;
}