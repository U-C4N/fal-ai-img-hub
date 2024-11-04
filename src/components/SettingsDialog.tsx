import React from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function SettingsDialog() {
  const { settings, updateSettings } = useStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <SettingsIcon className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] text-white border-white/10">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="model" className="space-y-6">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="aesthetics">Aesthetics</TabsTrigger>
            <TabsTrigger value="size">Size</TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Steps</label>
                <Slider
                  value={[settings.model.steps]}
                  max={50}
                  step={1}
                  onValueChange={([steps]) =>
                    updateSettings({ model: { ...settings.model, steps } })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Guidance Scale</label>
                <Slider
                  value={[settings.model.guidance]}
                  max={20}
                  step={0.1}
                  onValueChange={([guidance]) =>
                    updateSettings({ model: { ...settings.model, guidance } })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="aesthetics" className="space-y-6">
            <div className="space-y-4">
              {Object.entries(settings.aesthetics).map(([key, value]) => (
                <div key={key}>
                  <label className="text-sm text-gray-400 mb-2 block capitalize">{key}</label>
                  <Slider
                    value={[value]}
                    max={100}
                    onValueChange={([newValue]) =>
                      updateSettings({
                        aesthetics: {
                          ...settings.aesthetics,
                          [key]: newValue,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="size" className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
              {['1:1', '4:3', '16:9'].map((ratio) => (
                <button
                  key={ratio}
                  className={cn(
                    'p-2 rounded border transition-colors',
                    settings.imageSize.aspectRatio === ratio
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 hover:border-white/20'
                  )}
                  onClick={() =>
                    updateSettings({
                      imageSize: { ...settings.imageSize, aspectRatio: ratio },
                    })
                  }
                >
                  {ratio}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}