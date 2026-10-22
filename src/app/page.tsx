'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import GenreFilterBar from '@/components/GenreFilterBar';
import ContinueWatchingRail from '@/components/ContinueWatchingRail';
import Top10Rail from '@/components/Top10Rail';
import MovieRail from '@/components/MovieRail';
import WatchlistRail from '@/components/WatchlistRail';
import MovieDetailModal from '@/components/MovieDetailModal';
import VideoPlayerModal from '@/components/VideoPlayerModal';
import SubscriptionModal from '@/components/SubscriptionModal';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { useCinema } from '@/context/CinemaContext';
import { Sparkles, Film, Tv, Star, Flame, Compass } from 'lucide-react';

export default function Home() {
  const { movies, selectedGenre } = useCinema();

  // Filtered by selected category/genre
  const filteredMovies =
    selectedGenre === 'Hammasi'
      ? movies
      : selectedGenre === 'Seriallar'
      ? movies.filter((m) => m.type === 'series')
      : selectedGenre === 'Premyeralar 2026'
      ? movies.filter((m) => m.isPremier)
      : selectedGenre === "O'zbek kinosi"
      ? movies.filter((m) => m.isUzbek)
      : movies.filter((m) => m.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase()));

  // Categorized rails
  const premiereMovies = movies.filter((m) => m.isPremier);
  const uzbekMovies = movies.filter((m) => m.isUzbek);
  const goldCollection = movies.filter((m) => m.imdbRating >= 8.0);
  const seriesList = movies.filter((m) => m.type === 'series');
  const actionMovies = movies.filter((m) => m.genres.includes('Jangari'));

  return (
    <div className="min-h-screen bg-[#090c10] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Floating Glass Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Dynamic Blockbuster Hero Section */}
        <HeroBanner />

        {/* Quick Genre / Category Pills */}
        <GenreFilterBar />

        {/* If a specific genre is selected, display dedicated Grid view */}
        {selectedGenre !== 'Hammasi' ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-6 h-6 text-red-500" />
              <div>
                <h2 className="text-2xl font-black text-white">
                  {selectedGenre}
                  <span className="text-xs text-slate-400 font-normal ml-2">
                    ({filteredMovies.length} ta topildi)
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Tanlangan kategoriya bo‘yicha saralangan to‘plam
                </p>
              </div>
            </div>

            {filteredMovies.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl text-center text-slate-400">
                Bu janrda hozircha filmlar yo‘q. Tez orada qo‘shiladi!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </section>
        ) : (
          /* Standard Full Experience Homepage with Curated Rails */
          <div className="space-y-4">
            {/* Resume Playing Rail */}
            <ContinueWatchingRail />

            {/* Top 10 in Uzbekistan Rail with big stylized rank numbers */}
            <Top10Rail />

            {/* New Premieres Rail */}
            <MovieRail
              id="premieres"
              title="Yangi Premyeralar (2026)"
              subtitle="Eng so‘nggi chiqishlar va yuqori sifatli relizlar"
              icon={<Sparkles className="w-4 h-4 text-red-500" />}
              movies={premiereMovies}
            />

            {/* Uzbek National Cinema Rail */}
            <MovieRail
              id="milliy"
              title="🇺🇿 Milliy Kino va Seriallar Durdonalari"
              subtitle="O‘zbek kinoijodkorlarining eng saralangan asarlari"
              icon={<Film className="w-4 h-4 text-emerald-500" />}
              movies={uzbekMovies}
            />

            {/* IMDb 8.0+ Gold Collection */}
            <MovieRail
              id="gold"
              title="🌟 IMDb 8.0+ Oltin Kolleksiya"
              subtitle="Dunyo kino tanqidchilari tomonidan eng yuqori baholangan asarlar"
              icon={<Star className="w-4 h-4 text-amber-400" />}
              movies={goldCollection}
            />

            {/* Popular TV Shows */}
            <MovieRail
              id="series"
              title="🔥 Mashhur Seriallar"
              subtitle="Ko‘p qismli qiziqarli hikoyalar va fasllar"
              icon={<Tv className="w-4 h-4 text-blue-500" />}
              movies={seriesList}
            />

            {/* Action & Thriller Rail */}
            <MovieRail
              id="action"
              title="⚔️ Jangari va Sarguzasht"
              subtitle="Adrenalin va hayajonli sahnalarga boy filmlar"
              icon={<Flame className="w-4 h-4 text-orange-500" />}
              movies={actionMovies}
            />

            {/* User Watchlist */}
            <WatchlistRail />
          </div>
        )}
      </main>

      {/* Global Interactive Modals */}
      <MovieDetailModal />
      <VideoPlayerModal />
      <SubscriptionModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}
