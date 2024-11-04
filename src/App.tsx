import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Navigation } from './components/Navigation';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}