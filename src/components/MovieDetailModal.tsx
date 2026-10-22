'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCinema } from '@/context/CinemaContext';
import {
  X,
  Play,
  Plus,
  Check,
  Star,
  Tv,
  Globe,
  Headphones,
  Subtitles,
  Eye,
  EyeOff,
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  Pin,
  Clock,
  Sparkles,
  Share2
} from 'lucide-react';
import { Episode } from '@/types/cinema';

export default function MovieDetailModal() {
  const {
    activeMovie,
    setActiveMovie,
    setPlayingMovie,
    toggleWatchlist,
    isInWatchlist,
    comments,
    addComment,
    userProfile,
  } = useCinema();

  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'info' | 'episodes' | 'cast' | 'comments'>('info');

  // New Comment form state
  const [newCommentText, setNewCommentText] = useState('');
  const [newRating, setNewRating] = useState(10);
  const [isSpoilerChecked, setIsSpoilerChecked] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!activeMovie) return null;

  const inWatchlist = isInWatchlist(activeMovie.id);
  const movieComments = comments.filter((c) => c.movieId === activeMovie.id);

  const seasons = activeMovie.seasons || [];
  const currentSeason = seasons[selectedSeasonIndex] || seasons[0];

  const handlePlay = (episode?: Episode) => {
    setPlayingMovie({
      movie: activeMovie,
      episode: episode
        ? {
            episodeNumber: episode.episodeNumber,
            title: episode.title,
            videoUrl: episode.videoUrl,
            skipIntro: episode.skipIntro,
          }
        : undefined,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(activeMovie.id, newCommentText, newRating, isSpoilerChecked);
    setNewCommentText('');
    setIsSpoilerChecked(false);
  };

  const toggleRevealSpoiler = (commentId: string) => {
    setRevealedSpoilers((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + '?movie=' + activeMovie.id);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#0e131d] border border-slate-700/70 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setActiveMovie(null)}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-slate-700 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Backdrop Banner */}
        <div className="relative w-full h-72 sm:h-96">
          <Image
            src={activeMovie.backdropUrl}
            alt={activeMovie.title}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e131d] via-[#0e131d]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e131d] via-[#0e131d]/40 to-transparent" />

          {/* Banner bottom details */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {activeMovie.isPremier && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    Premyera 2026
                  </span>
                )}
                {activeMovie.type === 'series' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1">
                    <Tv className="w-3 h-3" />
                    Serial
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                {activeMovie.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {activeMovie.originalTitle} • {activeMovie.year} • {activeMovie.duration}
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => handlePlay()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/40 transition-all active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Tomosha qilish</span>
              </button>

              <button
                onClick={() => toggleWatchlist(activeMovie.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  inWatchlist
                    ? 'bg-red-600/20 border-red-500 text-red-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title={inWatchlist ? "Ro'yxatdan o'chirish" : "Ro'yxatga saqlash"}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Ulashish"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 bg-[#0a0e16]/80 flex items-center gap-6 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold text-slate-400">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'info'
                ? 'border-red-500 text-white font-bold'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Tavsif va Ovozlar
          </button>

          {activeMovie.type === 'series' && (
            <button
              onClick={() => setActiveTab('episodes')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'episodes'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              <Tv className="w-4 h-4 text-red-500" />
              Qismlar va Fasllar ({seasons.length})
            </button>
          )}

          <button
            onClick={() => setActiveTab('cast')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'cast'
                ? 'border-red-500 text-white font-bold'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Ijodiy guruh ({activeMovie.cast.length})
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'comments'
                ? 'border-red-500 text-white font-bold'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-500" />
            Sharhlar ({movieComments.length})
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[55vh] overflow-y-auto no-scrollbar">
          {/* TAB 1: General Info & Audio */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Description & Audio/Subtitle */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Mazmuni
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed">{activeMovie.description}</p>
                </div>

                {/* Dublyaj va Audio yo'lakchalar */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Headphones className="w-4 h-4 text-red-500" />
                    <span>Mavjud Audio Yo&apos;lakchalar (Dublyaj)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeMovie.audioTracks.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60"
                      >
                        <span className="text-xl">{track.flag}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{track.name}</p>
                          {track.studio && (
                            <p className="text-[11px] text-slate-400 truncate">{track.studio}</p>
                          )}
                        </div>
                        {track.isDefault && (
                          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-red-600/30 text-red-300 font-semibold shrink-0">
                            Asosiy
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtitrlar */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-bold text-slate-300 mr-2">
                    <Subtitles className="w-4 h-4 text-amber-400" />
                    <span>Subtitrlar:</span>
                  </div>
                  {activeMovie.subtitles.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200"
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Metas, Ratings, Specs */}
              <div className="space-y-4">
                {/* Ratings Card */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Reytinglar
                  </h4>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                    <span className="text-xs font-semibold text-slate-300">IMDb</span>
                    <span className="flex items-center gap-1 text-xs font-black text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {activeMovie.imdbRating} / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                    <span className="text-xs font-semibold text-slate-300">Kinopoisk</span>
                    <span className="flex items-center gap-1 text-xs font-black text-orange-400">
                      <Star className="w-3.5 h-3.5 fill-orange-400" />
                      {activeMovie.kinopoiskRating} / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                    <span className="text-xs font-semibold text-slate-300">KinoStream Foydalanuvchilari</span>
                    <span className="flex items-center gap-1 text-xs font-black text-red-400">
                      <Star className="w-3.5 h-3.5 fill-red-400" />
                      {activeMovie.platformRating} / 10
                    </span>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-500">Davlat:</span>{' '}
                    <span className="text-slate-200 font-medium">{activeMovie.country}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Rejissyor:</span>{' '}
                    <span className="text-slate-200 font-medium">{activeMovie.director}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Janrlar:</span>{' '}
                    <span className="text-slate-200 font-medium">
                      {activeMovie.genres.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Yosh chegarasi:</span>{' '}
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">
                      {activeMovie.ageRating}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Sifat formatlari:</span>{' '}
                    <span className="text-red-400 font-semibold">
                      {activeMovie.quality.join(' • ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Series Episodes & Seasons */}
          {activeTab === 'episodes' && (
            <div className="space-y-4">
              {/* Season Selector Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                {seasons.map((season, idx) => (
                  <button
                    key={season.seasonNumber}
                    onClick={() => setSelectedSeasonIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSeasonIndex === idx
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {season.title}
                  </button>
                ))}
              </div>

              {/* Episodes List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentSeason?.episodes.map((ep) => (
                  <div
                    key={ep.episodeNumber}
                    onClick={() => handlePlay(ep)}
                    className="cinema-card bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer group shadow"
                  >
                    <div className="relative w-full aspect-video bg-slate-800">
                      <Image
                        src={ep.thumbnailUrl}
                        alt={ep.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-semibold text-slate-200">
                        {ep.duration}
                      </span>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">
                          {ep.title}
                        </h4>
                        {ep.skipIntro && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold shrink-0">
                            Skip Intro
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {ep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Cast & Crew */}
          {activeTab === 'cast' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {activeMovie.cast.map((actor, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 text-center"
                >
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-2.5 border-2 border-slate-700 bg-slate-800">
                    <Image
                      src={actor.photoUrl}
                      alt={actor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{actor.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{actor.role}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Comments & Reviews */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              {/* New Comment Box */}
              <form
                onSubmit={handleAddComment}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-700">
                      <Image
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        width={28}
                        height={28}
                      />
                    </div>
                    <span className="text-xs font-bold text-white">{userProfile.name} sifatida fikr bildirish</span>
                  </div>

                  {/* Rating selection (1 to 10) */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400 mr-1">Baholang:</span>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none"
                    >
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
                        <option key={score} value={score}>
                          ⭐ {score} / 10
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Film yoki dublyaj haqida o'z fikringizni yozib qoldiring..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />

                <div className="flex items-center justify-between gap-2 pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSpoilerChecked}
                      onChange={(e) => setIsSpoilerChecked(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Matnda spoyler (film yakuni) bormi?</span>
                  </label>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                  >
                    Sharh qoldirish
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {movieComments.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Bu film uchun hali sharhlar qoldirilmagan. Birinchi bo&apos;lib fikr bildiring!
                  </div>
                ) : (
                  movieComments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-2xl border space-y-3 transition-colors ${
                        comment.isPinned
                          ? 'bg-amber-500/5 border-amber-500/30'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700">
                            <Image
                              src={comment.userAvatar}
                              alt={comment.userName}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{comment.userName}</h4>
                              {comment.isPinned && (
                                <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                                  <Pin className="w-2.5 h-2.5" />
                                  Qadalgan
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">{comment.date}</span>
                          </div>
                        </div>

                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-black text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {comment.rating} / 10
                        </span>
                      </div>

                      {/* Comment Body with Spoiler Protection */}
                      {comment.isSpoiler && !revealedSpoilers[comment.id] ? (
                        <div
                          onClick={() => toggleRevealSpoiler(comment.id)}
                          className="p-3 rounded-xl bg-slate-950 border border-dashed border-red-500/40 text-center cursor-pointer hover:bg-red-500/5 transition-colors"
                        >
                          <p className="text-xs font-semibold text-red-400 flex items-center justify-center gap-1.5">
                            <EyeOff className="w-4 h-4" />
                            Bu sharhda spoyler bor. Ko&apos;rish uchun bosing.
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {comment.text}
                        </p>
                      )}

                      {/* Likes & Actions */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                        <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>

                      {/* Official Admin Reply Highlight */}
                      {comment.adminReply && (
                        <div className="mt-3 p-3 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5 pl-4 border-l-4 border-l-red-500">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                              <span>{comment.adminReply.author}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-600/30 text-white">
                                {comment.adminReply.role}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500">{comment.adminReply.date}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {comment.adminReply.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
