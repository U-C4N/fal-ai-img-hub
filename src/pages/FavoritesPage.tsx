import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ImageGrid } from '../components/ImageGrid';

export function FavoritesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-4xl font-bold text-white">Favorites</h1>
      </div>

      <ImageGrid showFavorites />
    </div>
  );
}