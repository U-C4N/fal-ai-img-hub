import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Label } from './ui/label';

interface Props {
  onGenerate: (prompt: string) => void;
}

const styles = [
  'Photorealistic',
  'Digital Art',
  'Oil Painting',
  'Watercolor',
  'Anime',
  'Comic Book',
  'Fantasy',
  'Sci-fi',
  'Abstract',
  'Minimalist',
];

const subjects = [
  'Portrait',
  'Landscape',
  'Architecture',
  'Nature',
  'Space',
  'Cyberpunk',
  'Steampunk',
  'Character Design',
  'Concept Art',
  'Product Design',
];

export function PromptBuilder({ onGenerate }: Props) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [stylization, setStylization] = useState(50);
  const [weirdness, setWeirdness] = useState(0);
  const [variety, setVariety] = useState(25);

  const handleGenerate = () => {
    const basePrompt = prompt.trim();
    const stylePrompt = selectedStyle ? `, ${selectedStyle} style` : '';
    const subjectPrompt = selectedSubject ? `, ${selectedSubject}` : '';
    const fullPrompt = `${basePrompt}${stylePrompt}${subjectPrompt}`;
    
    if (fullPrompt) {
      onGenerate(fullPrompt);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image..."
          className="w-full h-24 px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-white placeholder-gray-400"
        />
        
        <Tabs defaultValue="style" className="w-full">
          <TabsList className="w-full bg-black/20 border border-white/10">
            <TabsTrigger value="style" className="flex-1">
              <Wand2 className="w-4 h-4 mr-2" />
              Style
            </TabsTrigger>
            <TabsTrigger value="subject" className="flex-1">
              <ImageIcon className="w-4 h-4 mr-2" />
              Subject
            </TabsTrigger>
            <TabsTrigger value="params" className="flex-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Parameters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="style" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-2 rounded-md text-sm transition-all ${
                    selectedStyle === style
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subject" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-3 py-2 rounded-md text-sm transition-all ${
                    selectedSubject === subject
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="params" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-400">Stylization</Label>
                <span className="text-sm font-mono text-gray-400">{stylization}</span>
              </div>
              <Slider
                value={[stylization]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setStylization(value[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-400">Weirdness</Label>
                <span className="text-sm font-mono text-gray-400">{weirdness}</span>
              </div>
              <Slider
                value={[weirdness]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setWeirdness(value[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-400">Variety</Label>
                <span className="text-sm font-mono text-gray-400">{variety}</span>
              </div>
              <Slider
                value={[variety]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setVariety(value[0])}
              />
            </div>
          </TabsContent>
        </Tabs>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim()}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-5 h-5" />
          Generate
        </button>
      </div>
    </div>
  );
}