export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  category: string;
  isFavorite: boolean;
}

export interface ImageSize {
  width: number;
  height: number;
  aspectRatio: string;
}

export interface ModelSettings {
  steps: number;
  seed: number;
  guidance: number;
  scheduler: string;
}

export interface Aesthetics {
  stylization: number;
  weirdness: number;
  variety: number;
}

export interface Settings {
  imageSize: ImageSize;
  model: ModelSettings;
  aesthetics: Aesthetics;
}