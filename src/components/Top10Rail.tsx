'use client';

import React, { useRef } from 'react';
import { useCinema } from '@/context/CinemaContext';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export default function Top10Rail() {
  const { movies } = useCinema();
  const railRef = useRef<HTMLDivElement>(null);

  // Sort by top10Rank or platformRating
  const top10Movies = [...movies]
    .filter((m) => m.top10Rank !== undefined)
    .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99))
    .slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (top10Movies.length === 0) return null;

  return (
    <section id="top-10-section" className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
            <Flame className="w-5 h-5 fill-red-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Bugun O&apos;zbekistonda Top-10
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">
                JONLI
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Ayni paytda eng ko&apos;p tomosha qilinayotgan premyera va seriallar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Rail with Rank offset */}
      <div
        ref={railRef}
        className="flex items-center gap-10 sm:gap-14 overflow-x-auto no-scrollbar py-4 pl-8"
      >
        {top10Movies.map((movie, idx) => (
          <MovieCard key={movie.id} movie={movie} showRank={idx + 1} />
        ))}
      </div>
    </section>
  );
}
