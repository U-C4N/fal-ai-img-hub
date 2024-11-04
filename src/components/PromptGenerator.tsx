import React from 'react';
import { Sparkles } from 'lucide-react';

const categories: Record<string, string[]> = {
  fantasy: [
    'magical forest', 'ancient dragon', 'mystical castle',
    'enchanted garden', 'fairy kingdom', 'wizard tower'
  ],
  scifi: [
    'cyberpunk city', 'space station', 'alien landscape',
    'futuristic metropolis', 'robot workshop', 'neon streets'
  ],
  nature: [
    'misty mountains', 'tropical paradise', 'autumn forest',
    'crystal cave', 'northern lights', 'desert oasis'
  ],
  abstract: [
    'flowing colors', 'geometric patterns', 'fractal universe',
    'liquid metal', 'cosmic energy', 'dream sequence'
  ]
};

const styles = [
  'hyperrealistic', 'oil painting', 'digital art',
  'watercolor', 'concept art', 'cinematic'
];

interface Props {
  onPromptGenerate: (prompt: string) => void;
}

export function PromptGenerator({ onPromptGenerate }: Props) {
  const generatePrompt = () => {
    const categoryKeys = Object.keys(categories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const randomPrompt = categories[randomCategory][
      Math.floor(Math.random() * categories[randomCategory].length)
    ];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    const fullPrompt = `${randomPrompt}, ${randomStyle} style`;
    onPromptGenerate(fullPrompt);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={generatePrompt}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        <Sparkles className="w-5 h-5" />
        Generate Random Prompt
      </button>
    </div>
  );
}