import React, { useState } from 'react';
import { Heart, Download, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useToast } from './ui/use-toast';
import type { GeneratedImage } from '../types';

interface ImageModalProps {
  image: GeneratedImage;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="max-w-4xl w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <img
          src={image.imageUrl}
          alt={image.prompt}
          className="w-full h-auto rounded-lg"
        />
        <div className="mt-4 text-white">
          <p className="text-sm opacity-80">{image.prompt}</p>
        </div>
      </div>
    </div>
  );
};

interface Props {
  images?: GeneratedImage[];
  showFavorites?: boolean;
}

export function ImageGrid({ showFavorites = false }: Props) {
  const { history, toggleFavorite } = useStore();
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const { toast } = useToast();

  const displayImages = showFavorites 
    ? history.filter(img => img.isFavorite)
    : history;

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        {showFavorites 
          ? "No favorite images yet. Like some images to see them here!"
          : "No images generated yet. Try creating some!"}
      </div>
    );
  }

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: "Image downloaded successfully",
      });
    } catch (error) {
      console.error('Failed to download image:', error);
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = (id: string) => {
    toggleFavorite(id);
    toast({
      title: "Success",
      description: "Image added to favorites",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayImages.map((image) => (
        <div
          key={image.id}
          className="relative bg-white/5 rounded-lg overflow-hidden group"
        >
          <img
            src={image.imageUrl}
            alt={image.prompt}
            className="w-full h-auto object-cover cursor-pointer transition-transform group-hover:scale-105"
            onClick={() => setSelectedImage(image)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm mb-2">{image.prompt}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFavorite(image.id)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      image.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>
                <button
                  onClick={() => handleDownload(image.imageUrl)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}