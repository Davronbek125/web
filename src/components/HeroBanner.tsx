'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCinema } from '@/context/CinemaContext';
import { Play, Info, Plus, Check, Star, Volume2, VolumeX, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Movie } from '@/types/cinema';

export default function HeroBanner() {
  const { movies, setActiveMovie, setPlayingMovie, toggleWatchlist, isInWatchlist } = useCinema();

  // Pick top featured movies for hero
  const featuredMovies = movies.filter((m) => m.isTrending || m.isPremier).slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-rotate hero every 8 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const currentMovie: Movie = featuredMovies[currentIndex] || movies[0];
  if (!currentMovie) return null;

  const inWatchlist = isInWatchlist(currentMovie.id);

  return (
    <section className="relative w-full h-[85vh] min-h-[580px] max-h-[850px] overflow-hidden select-none">
      {/* Background Image with Cinematic Gradient Overlays */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdropUrl}
          alt={currentMovie.title}
          fill
          priority
          className="object-cover object-center transform scale-105 transition-all duration-1000 ease-out"
        />
        {/* Dark Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-[#090c10]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090c10] via-[#090c10]/70 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-24 z-10">
        <div className="max-w-2xl">
          {/* Tag / Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/40">
              <Sparkles className="w-3.5 h-3.5" />
              {currentMovie.isPremier ? 'Eksklyuziv Premyera 2026' : 'Haftaning Bosh Filmi'}
            </span>
            {currentMovie.isUzbek && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/80 text-white text-xs font-semibold">
                🇺🇿 Milliy Kino
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-2xl">
            {currentMovie.title}
          </h1>

          {/* Metadata info */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300 mb-4">
            <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              IMDb {currentMovie.imdbRating}
            </span>
            <span>{currentMovie.year}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>{currentMovie.duration}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {currentMovie.ageRating}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
              {currentMovie.quality[0]}
            </span>
            <span className="text-slate-400 font-normal hidden sm:inline">
              • {currentMovie.genres.slice(0, 3).join(', ')}
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-slate-300 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
            {currentMovie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => setPlayingMovie({ movie: currentMovie })}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Tomosha qilish</span>
            </button>

            <button
              onClick={() => setActiveMovie(currentMovie)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-white font-semibold text-sm sm:text-base border border-slate-700 backdrop-blur-md transition-all cursor-pointer"
            >
              <Info className="w-5 h-5 text-slate-300" />
              <span>Batafsil</span>
            </button>

            <button
              onClick={() => toggleWatchlist(currentMovie.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                inWatchlist
                  ? 'bg-red-600/20 border-red-500 text-red-400'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
              title={inWatchlist ? "Ro'yxatdan o'chirish" : "Ro'yxatga qo'shish"}
            >
              {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all ml-auto hidden sm:block"
              title={isMuted ? 'Ovozni yoqish' : "Ovozni o'chirish"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Carousel Indicators & Next/Prev */}
        <div className="absolute right-4 sm:right-8 bottom-16 md:bottom-24 flex items-center gap-3">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1))
            }
            className="w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {featuredMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-red-600' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
            className="w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
