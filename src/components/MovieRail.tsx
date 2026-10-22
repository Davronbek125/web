'use client';

import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/cinema';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRailProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  movies: Movie[];
}

export default function MovieRail({ id, title, subtitle, icon, movies }: MovieRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-5 sm:py-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Rail Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-red-500">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {title}
              <span className="text-xs text-slate-500 font-normal">({movies.length})</span>
            </h2>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
        </div>

        {/* Scroll Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Oldingisi"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Keyingisi"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Movies Row */}
      <div
        ref={railRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
