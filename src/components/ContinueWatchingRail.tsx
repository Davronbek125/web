'use client';

import React from 'react';
import Image from 'next/image';
import { useCinema } from '@/context/CinemaContext';
import { Play, RotateCcw, Clock } from 'lucide-react';

export default function ContinueWatchingRail() {
  const { continueWatching, movies, setPlayingMovie } = useCinema();

  if (!continueWatching || continueWatching.length === 0) return null;

  return (
    <section className="py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-red-500" />
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Tomoshani davom ettiring
        </h2>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
        {continueWatching.map((item) => {
          const matchedMovie = movies.find((m) => m.id === item.movieId);

          return (
            <div
              key={item.movieId}
              onClick={() => {
                if (matchedMovie) {
                  setPlayingMovie({ movie: matchedMovie });
                }
              }}
              className="cinema-card relative w-64 sm:w-72 shrink-0 aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-md group"
            >
              {/* Backdrop */}
              <Image
                src={item.backdropUrl || item.posterUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-semibold text-slate-200">
                    {item.remainingTime}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h4>
                    {item.episodeInfo && (
                      <p className="text-[11px] text-slate-300 truncate">{item.episodeInfo}</p>
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-red-600 group-hover:scale-110 flex items-center justify-center text-white shadow-lg shadow-red-600/50 transition-transform shrink-0">
                    <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Progress bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
