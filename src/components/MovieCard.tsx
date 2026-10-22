'use client';

import React from 'react';
import Image from 'next/image';
import { useCinema } from '@/context/CinemaContext';
import { Movie } from '@/types/cinema';
import { Play, Plus, Check, Info, Star, Tv } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  showRank?: number;
}

export default function MovieCard({ movie, showRank }: MovieCardProps) {
  const { setActiveMovie, setPlayingMovie, toggleWatchlist, isInWatchlist } = useCinema();
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="relative group shrink-0 select-none">
      {/* If ranking (Top 10), display huge stylized number */}
      {showRank !== undefined && (
        <span className="top10-number absolute -left-7 bottom-0 z-0 pointer-events-none">
          {showRank}
        </span>
      )}

      {/* Main Poster Card */}
      <div
        onClick={() => setActiveMovie(movie)}
        className="cinema-card relative w-40 sm:w-48 md:w-52 aspect-[2/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer shadow-lg"
      >
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 160px, 210px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-amber-500/20">
            <Star className="w-3 h-3 fill-amber-400" />
            {movie.imdbRating}
          </span>
          <div className="flex items-center gap-1">
            {movie.type === 'series' && (
              <span className="px-1.5 py-0.5 rounded-md bg-blue-600/80 backdrop-blur-md text-[10px] font-semibold text-white flex items-center gap-0.5">
                <Tv className="w-2.5 h-2.5" />
                Serial
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded-md bg-red-600/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
              {movie.quality[0]}
            </span>
          </div>
        </div>

        {/* Hover Overlay with Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end z-20">
          <h3 className="text-sm font-bold text-white line-clamp-1 mb-0.5">{movie.title}</h3>
          <p className="text-[11px] text-slate-300 line-clamp-1 mb-3">
            {movie.year} • {movie.genres.slice(0, 2).join(', ')}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlayingMovie({ movie });
              }}
              className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-transform"
              title="Tomosha qilish"
            >
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(movie.id);
              }}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                inWatchlist
                  ? 'bg-red-600/30 border-red-500 text-red-400'
                  : 'bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700'
              }`}
              title={inWatchlist ? "Ro'yxatdan o'chirish" : "Ro'yxatga qo'shish"}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveMovie(movie);
              }}
              className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 flex items-center justify-center ml-auto"
              title="Batafsil ma'lumot"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Under-card text for mobile or static view */}
      <div className="mt-2 w-40 sm:w-48 md:w-52">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-200 truncate group-hover:text-red-400 transition-colors">
          {movie.title}
        </h4>
        <p className="text-[11px] text-slate-400 truncate">
          {movie.year} • {movie.genres[0]}
        </p>
      </div>
    </div>
  );
}
