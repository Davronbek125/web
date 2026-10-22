'use client';

import React from 'react';
import { useCinema } from '@/context/CinemaContext';
import { Sparkles, Film, Tv, Flame, Star, Compass } from 'lucide-react';

const GENRES = [
  'Hammasi',
  'Jangari',
  'Fantastika',
  'Tarixiy',
  'Drama',
  'Komediya',
  'Seriallar',
  "O'zbek kinosi",
  'Premyeralar 2026',
];

export default function GenreFilterBar() {
  const { selectedGenre, setSelectedGenre } = useCinema();

  return (
    <div className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 pr-2 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
          <Compass className="w-4 h-4 text-red-500" />
          <span>Kategoriyalar:</span>
        </div>

        {GENRES.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
