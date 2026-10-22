'use client';

import React from 'react';
import { useCinema } from '@/context/CinemaContext';
import MovieCard from './MovieCard';
import { Bookmark, Plus } from 'lucide-react';

export default function WatchlistRail() {
  const { watchlist, movies } = useCinema();

  const watchlistMovies = movies.filter((m) => watchlist.includes(m.id));

  if (watchlistMovies.length === 0) {
    return (
      <section id="watchlist-section" className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 text-center max-w-xl mx-auto border border-dashed border-slate-800">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-400 mb-3">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Mening Ro&apos;yxatim bo&apos;sh</h3>
          <p className="text-xs text-slate-400 mb-4">
            O&apos;zingizga yoqqan film va seriallarni &quot;+&quot; tugmasi orqali saqlang va istalgan vaqtda qaytib ko&apos;ring.
          </p>
          <a
            href="#top-10-section"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Filmlarni ko&apos;rish
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="watchlist-section" className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
          <Bookmark className="w-5 h-5 fill-red-500" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Mening Ro&apos;yxatim
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
              {watchlistMovies.length} ta film
            </span>
          </h2>
          <p className="text-xs text-slate-400">Keyinroq tomosha qilish uchun saqlanganlar</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
        {watchlistMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
