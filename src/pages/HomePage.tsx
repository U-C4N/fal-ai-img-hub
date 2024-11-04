import React from 'react';
import { GenerationForm } from '../components/GenerationForm';
import { ImageGrid } from '../components/ImageGrid';
import { PromptBuilder } from '../components/PromptBuilder';
import { SettingsDialog } from '../components/SettingsDialog';

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">AI Image Generator</h1>
        <SettingsDialog />
      </div>

      <PromptBuilder />
      <GenerationForm />
      <ImageGrid />
    </div>
  );
}