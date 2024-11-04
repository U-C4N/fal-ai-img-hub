import { useState } from 'react';
import { generateImage } from '../lib/fal';
import { useStore } from '../store/useStore';
import type { GeneratedImage } from '../types';

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToHistory } = useStore();

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateImage(prompt);
      
      if (!result?.images?.length) {
        throw new Error('No images were generated');
      }

      result.images.forEach((imageUrl: string, index: number) => {
        const image: GeneratedImage = {
          id: `${Date.now()}-${index}`,
          prompt,
          imageUrl,
          timestamp: Date.now(),
          category: 'generated',
          isFavorite: false,
        };
        addToHistory(image);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate images');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, error, handleGenerate };
}