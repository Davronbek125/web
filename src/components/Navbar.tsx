'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCinema } from '@/context/CinemaContext';
import {
  Search,
  Film,
  Tv,
  Bookmark,
  Crown,
  User,
  SlidersHorizontal,
  X,
  Play,
  Star,
  ShieldCheck,
  Check,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const {
    watchlist,
    searchQuery,
    setSearchQuery,
    movies,
    setActiveMovie,
    userProfile,
    setUserProfile,
    profiles,
    setIsSubscriptionModalOpen,
    subscription,
    setSelectedGenre
  } = useCinema();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Search filtered results
  const searchResults = searchQuery.trim()
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.originalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
          m.director.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white flex items-center gap-1">
                KINO<span className="text-red-500">STREAM</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  UZ
                </span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">
                Milliy & Xalqaro Cinema
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setSelectedGenre('Hammasi')}
              className="text-white hover:text-red-400 transition-colors"
            >
              Bosh sahifa
            </Link>
            <button
              onClick={() => setSelectedGenre('Jangari')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Filmlar
            </button>
            <button
              onClick={() => setSelectedGenre('Seriallar')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Tv className="w-3.5 h-3.5 text-red-500" />
              Seriallar
            </button>
            <a
              href="#top-10-section"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Top-10 O&apos;zbekiston
            </a>
            <button
              onClick={() => setSelectedGenre('O\'zbek kinosi')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              🇺🇿 Milliy Kino
            </button>
            <Link
              href="/admin"
              className="px-2.5 py-1 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Panel
            </Link>
          </nav>
        </div>

        {/* Right Actions: Search, Watchlist, VIP, Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Button / Input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded-full px-3 py-1.5 w-64 sm:w-80 shadow-2xl backdrop-blur-md">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Kino, serial, aktyor qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-white p-1 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Qidiruv"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Instant Search Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-12 right-0 w-80 sm:w-96 max-h-[420px] overflow-y-auto glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700/60 z-50 no-scrollbar">
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 border-b border-slate-800 flex justify-between">
                  <span>Natijalar ({searchResults.length})</span>
                  <span className="text-amber-400 font-normal">Enter orqali barchasi</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-400">
                    Hech narsa topilmadi. Boshqa so&apos;z bilan urinib ko&apos;ring.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/50">
                    {searchResults.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => {
                          setActiveMovie(movie);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                      >
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                          <Image
                            src={movie.posterUrl}
                            alt={movie.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                            {movie.title}
                          </h4>
                          <p className="text-xs text-slate-400 truncate">
                            {movie.year} • {movie.genres.slice(0, 2).join(', ')}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {movie.imdbRating}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-600/30 text-red-300 font-medium">
                              {movie.quality[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Watchlist Quick Button */}
          <a
            href="#watchlist-section"
            className="relative w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Mening ro'yxatim"
          >
            <Bookmark className="w-4 h-4" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                {watchlist.length}
              </span>
            )}
          </a>

          {/* VIP Subscription Button */}
          <button
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 fill-slate-950" />
            <span>VIP Obuna</span>
          </button>

          {/* Multi-profile Selector */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-red-600/40 border border-slate-600">
                <Image
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-12 w-60 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700/80 z-50">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs text-slate-400">Joriy profil</p>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    {userProfile.name}
                    {userProfile.isKids && (
                      <span className="text-[10px] bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded">
                        Bolalar
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-amber-400" />
                    {subscription.plan}
                  </p>
                </div>

                <div className="py-1">
                  <p className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Profillarni almashtirish
                  </p>
                  {profiles.map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        setUserProfile(prof);
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-700 shrink-0">
                          <Image
                            src={prof.avatar}
                            alt={prof.name}
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-200">{prof.name}</span>
                      </div>
                      {userProfile.id === prof.id && (
                        <Check className="w-3.5 h-3.5 text-red-400" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setIsSubscriptionModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors"
                  >
                    <Crown className="w-3.5 h-3.5 fill-amber-400" />
                    Obunani boshqarish
                  </button>
                  <Link
                    href="/admin"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                    Administrator Paneli
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
