import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { generateImage } from '../lib/fal';
import { useStore } from '../store/useStore';
import type { GeneratedImage } from '../types';

export function GenerationForm() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { addToHistory } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const result = await generateImage(prompt.trim());
      
      if (!result?.images?.length) {
        throw new Error('No images were generated');
      }

      result.images.forEach((imageUrl: string, index: number) => {
        const image: GeneratedImage = {
          id: `${Date.now()}-${index}`,
          prompt: prompt.trim(),
          imageUrl,
          timestamp: Date.now(),
          category: 'generated',
          isFavorite: false,
        };
        addToHistory(image);
      });
      
      setPrompt('');
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="flex-1 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-white"
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </form>
  );
}