'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCinema } from '@/context/CinemaContext';
import { Movie } from '@/types/cinema';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Film,
  Tv,
  MessageSquare,
  UploadCloud,
  Plus,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Clock,
  Pin,
  EyeOff,
  Trash2,
  Reply,
  ArrowLeft,
  Server,
  DollarSign,
  Radio,
  Sliders,
  Check
} from 'lucide-react';

export default function AdminPage() {
  const {
    movies,
    addNewMovie,
    comments,
    addAdminReply,
    togglePinComment,
    toggleSpoilerComment,
    deleteComment,
  } = useCinema();

  const [activeTab, setActiveTab] = useState<'analytics' | 'cms' | 'comments' | 'transcoder'>('analytics');

  // TMDB 1-click Autocomplete state
  const [tmdbSearch, setTmdbSearch] = useState('');
  const [isTmdbLoading, setIsTmdbLoading] = useState(false);
  const [tmdbResult, setTmdbResult] = useState<Partial<Movie> | null>(null);
  const [addSuccessMessage, setAddSuccessMessage] = useState('');

  // Transcoding Simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transcodeStep, setTranscodeStep] = useState('');

  // Comment reply state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // TMDB Simulation Database
  const TMDB_PRESETS: Record<string, Partial<Movie>> = {
    gladiator: {
      title: 'Gladiator II: Qasos',
      originalTitle: 'Gladiator II',
      type: 'movie',
      year: 2024,
      duration: '2s 28d',
      ageRating: '18+',
      quality: ['4K UHD', 'Dolby Atmos'],
      imdbRating: 7.7,
      kinopoiskRating: 7.5,
      platformRating: 9.1,
      genres: ['Jangari', 'Tarixiy', 'Drama'],
      country: 'AQSh, Buyuk Britaniya',
      director: 'Ridley Scott',
      description: "Maksimus jasoratidan ilhomlangan yosh Lusiy Rim taxtidagi shafqatsiz imperatorlarga qarshi afsonaviy Kolizey jang maydonida o'z xalqi ozodligi uchun kurashadi.",
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
      backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&q=80',
      trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
    matrix: {
      title: 'Matritsa: Tirilish',
      originalTitle: 'The Matrix Resurrections',
      type: 'movie',
      year: 2021,
      duration: '2s 28d',
      ageRating: '16+',
      quality: ['4K UHD', 'HDR10'],
      imdbRating: 8.7,
      kinopoiskRating: 8.5,
      platformRating: 9.3,
      genres: ['Fantastika', 'Jangari'],
      country: 'AQSh',
      director: 'Lana Wachowski',
      description: 'Neo yana haqiqat va virtual illyuziya chegarasida qoladi. U oq quyon izidan borib, qaytadan Matritsa sirlarini ochishga majbur.',
      posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      backdropUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
      trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    },
    batman: {
      title: 'Betmen: Qora Ritsar Qaytishi',
      originalTitle: 'The Batman',
      type: 'movie',
      year: 2022,
      duration: '2s 56d',
      ageRating: '16+',
      quality: ['4K UHD', 'Dolby Vision'],
      imdbRating: 8.1,
      kinopoiskRating: 7.9,
      platformRating: 9.4,
      genres: ['Jangari', 'Detektiv', 'Kriminal'],
      country: 'AQSh',
      director: 'Matt Reeves',
      description: 'Gotem shahrining elitasini nishonga olgan shafqatsiz qotil Jumboqchini fosh qilish uchun Bryus Ueyn yashirin yerosti jinoyat olamiga sho‘ng‘iydi.',
      posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80',
      backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80',
      trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  };

  const handleTmdbSearch = () => {
    if (!tmdbSearch.trim()) return;
    setIsTmdbLoading(true);
    setTimeout(() => {
      setIsTmdbLoading(false);
      const query = tmdbSearch.toLowerCase();
      let matched: Partial<Movie> | null = null;
      for (const key in TMDB_PRESETS) {
        if (query.includes(key)) {
          matched = TMDB_PRESETS[key];
          break;
        }
      }
      if (!matched) {
        matched = {
          title: tmdbSearch.toUpperCase() + ' (Premyera)',
          originalTitle: tmdbSearch + ' (Global Release)',
          type: 'movie',
          year: 2026,
          duration: '2s 10d',
          ageRating: '16+',
          quality: ['4K UHD', 'Dolby Atmos'],
          imdbRating: 8.4,
          kinopoiskRating: 8.2,
          platformRating: 9.2,
          genres: ['Jangari', 'Sarguzasht', 'Fantastika'],
          country: 'AQSh, Buyuk Britaniya',
          director: 'Christopher Nolan',
          description: "TMDB ochiq API orqali avtomatik tortib olingan va o'zbek tiliga sun'iy intellekt orqali tarjima qilingan tavsif.",
          posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
          backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&q=80',
          trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        };
      }
      setTmdbResult(matched);
    }, 600);
  };

  const handlePublishTmdbMovie = () => {
    if (!tmdbResult) return;
    const fullMovie: Movie = {
      id: 'movie-' + Date.now(),
      title: tmdbResult.title || 'Yangi Film',
      originalTitle: tmdbResult.originalTitle || 'New Movie',
      type: tmdbResult.type || 'movie',
      year: tmdbResult.year || 2026,
      duration: tmdbResult.duration || '2s 00d',
      ageRating: tmdbResult.ageRating || '16+',
      quality: tmdbResult.quality || ['4K UHD'],
      imdbRating: tmdbResult.imdbRating || 8.0,
      kinopoiskRating: tmdbResult.kinopoiskRating || 8.0,
      platformRating: 9.0,
      genres: tmdbResult.genres || ['Jangari'],
      country: tmdbResult.country || 'AQSh',
      director: tmdbResult.director || 'Rejissyor',
      description: tmdbResult.description || 'Film tavsifi',
      posterUrl: tmdbResult.posterUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
      backdropUrl: tmdbResult.backdropUrl || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&q=80',
      trailerUrl: tmdbResult.trailerUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      videoUrl: tmdbResult.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      audioTracks: [
        { id: 'uz-1', name: "O'zbekcha", studio: 'Tarjima Kinolar Studio', lang: 'uz', flag: '🇺🇿', isDefault: true },
        { id: 'ru-1', name: 'Ruscha', studio: 'Dubbing Pro', lang: 'ru', flag: '🇷🇺' },
        { id: 'en-1', name: 'Inglizcha', studio: 'Original', lang: 'en', flag: '🇬🇧' },
      ],
      subtitles: [{ id: 'sub-uz', name: "O'zbekcha", lang: 'uz' }],
      cast: [
        { name: 'Bosh Qahramon', role: 'Protagonist', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
      ],
      isPremier: true,
    };

    addNewMovie(fullMovie);
    setTmdbResult(null);
    setTmdbSearch('');
    setAddSuccessMessage(`"${fullMovie.title}" 1-tugma bilan platformaga muvaffaqiyatli qo'shildi!`);
    setTimeout(() => setAddSuccessMessage(''), 4000);
  };

  // Simulate chunked upload and HLS transcoding pipeline
  const handleStartTranscodeSimulation = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setTranscodeStep('25 GB fayl qismlarga bo‘linib S3 xotiraga yuklanmoqda (Resumable Chunked)...');

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current <= 40) {
        setUploadProgress(current);
        setTranscodeStep('S3 xotiraga yuklanmoqda (' + current + '%)...');
      } else if (current <= 70) {
        setUploadProgress(current);
        setTranscodeStep('FFmpeg BullMQ navbatida: 1080p, 720p, 480p adaptiv sifatlar transkodlanmoqda (' + current + '%)...');
      } else if (current < 100) {
        setUploadProgress(current);
        setTranscodeStep('HLS .m3u8 master pleylist va AES-128 shifrlangan .ts segmentlar yaratilmoqda (' + current + '%)...');
      } else {
        clearInterval(interval);
        setUploadProgress(100);
        setTranscodeStep('Muvaffaqiyatli! Video Cloudflare CDN keshiga uzatildi va nashr etildi.');
        setTimeout(() => setIsUploading(false), 3000);
      }
    }, 700);
  };

  const handleSendAdminReply = (commentId: string) => {
    if (!replyText.trim()) return;
    addAdminReply(commentId, replyText);
    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <div className="min-h-screen bg-[#080b10] text-slate-200">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Saytga qaytish</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                KINOSTREAM ADMIN PANEL
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  SuperAdmin
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Markazlashgan Kino &amp; Media Boshqaruvi</p>
            </div>
          </div>
        </div>

        {/* Live Viewers Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-live-dot" />
          <span className="text-xs font-bold text-white">1,842</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">jonli tomoshabin</span>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2">
          {[
            { id: 'analytics', label: 'Jonli Analitika & Moliya', icon: TrendingUp },
            { id: 'cms', label: 'Media CMS (1-Tugmada Film Qo‘shish)', icon: Film },
            { id: 'comments', label: `Sharhlar Moderatsiyasi (${comments.length})`, icon: MessageSquare },
            { id: 'transcoder', label: 'FFmpeg & Video Transkodlash', icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Success Alert Banner */}
        {addSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-3 text-emerald-400 text-sm font-semibold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{addSuccessMessage}</span>
          </div>
        )}

        {/* TAB 1: ANALYTICS & FINANCE */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-slate-400">Jami Oylik Daromad</p>
                <h3 className="text-2xl font-black text-white">105,400,000 so&apos;m</h3>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% o&apos;tgan oyga nisbatan
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-slate-400">Faol VIP Obunachilar</p>
                <h3 className="text-2xl font-black text-white">14,920 ta</h3>
                <p className="text-[11px] text-emerald-400 font-bold">92% Standart, 8% VIP 4K</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-slate-400">Katalogdagi Kinolar</p>
                <h3 className="text-2xl font-black text-white">{movies.length + 1240} ta</h3>
                <p className="text-[11px] text-amber-400 font-bold">100% O&apos;zbekcha dublyaj bilan</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-slate-400">Server Yuklanishi (CPU)</p>
                <h3 className="text-2xl font-black text-white">28% / 100%</h3>
                <p className="text-[11px] text-emerald-400 font-bold">Tas-IX kesh serverlari barqaror</p>
              </div>
            </div>

            {/* Payment Gateways Breakdown */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                To&apos;lov Tizimlari Taqsimoti (O&apos;zbekiston)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30">
                  <span className="text-xs font-bold text-blue-400">CLICK</span>
                  <p className="text-lg font-black text-white mt-1">42,800,000 so&apos;m</p>
                  <p className="text-xs text-slate-400">41% jami daromad</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30">
                  <span className="text-xs font-bold text-emerald-400">PAYME</span>
                  <p className="text-lg font-black text-white mt-1">38,100,000 so&apos;m</p>
                  <p className="text-xs text-slate-400">36% jami daromad</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30">
                  <span className="text-xs font-bold text-purple-400">UZUM BANK</span>
                  <p className="text-lg font-black text-white mt-1">24,500,000 so&apos;m</p>
                  <p className="text-xs text-slate-400">23% jami daromad</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA CMS & TMDB AUTOCOMPLETE */}
        {activeTab === 'cms' && (
          <div className="space-y-8">
            {/* TMDB 1-Click Importer Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    TMDB Orqali 1-Tugmada Film Qo&apos;shish (Media CMS)
                  </h3>
                  <p className="text-xs text-slate-400">
                    TMDB ID yoki film nomini yozing. Tizim avtomatik tarzda rasmlar, aktyorlar, poster va ma&apos;lumotlarni yuklaydi.
                  </p>
                </div>
              </div>

              {/* Input row */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Masalan: Gladiator, Matrix, Batman, yoki TMDB ID..."
                    value={tmdbSearch}
                    onChange={(e) => setTmdbSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTmdbSearch()}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 placeholder:text-slate-500"
                  />
                </div>
                <button
                  onClick={handleTmdbSearch}
                  disabled={isTmdbLoading || !tmdbSearch.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isTmdbLoading ? "Qidirilmoqda..." : "TMDB dan tortib olish"}
                </button>
              </div>

              {/* TMDB Preview Result Card */}
              {tmdbResult && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-700/80 space-y-4 animate-in fade-in">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="relative w-32 h-48 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                      <Image
                        src={tmdbResult.posterUrl || ''}
                        alt="Poster"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold">
                          ⭐ IMDb {tmdbResult.imdbRating}
                        </span>
                        <span className="text-xs text-slate-400">{tmdbResult.year} • {tmdbResult.duration}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white">{tmdbResult.title}</h4>
                      <p className="text-xs text-slate-400 font-mono">{tmdbResult.originalTitle}</p>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                        {tmdbResult.description}
                      </p>
                      <div className="text-xs text-slate-400 pt-1">
                        <span className="text-slate-500">Janrlar:</span> {tmdbResult.genres?.join(', ')} •{' '}
                        <span className="text-slate-500">Rejissyor:</span> {tmdbResult.director}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={handlePublishTmdbMovie}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Bosh Sahifa Katalogiga Joylash</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Current Movies List in CMS */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Mavjud Filmlar va Seriallar Ro&apos;yxati ({movies.length})
              </h3>
              <div className="divide-y divide-slate-800">
                {movies.map((m) => (
                  <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                        <Image src={m.posterUrl} alt={m.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{m.title}</h4>
                        <p className="text-xs text-slate-400 truncate">
                          {m.type === 'series' ? 'Serial' : 'Film'} • {m.year} • {m.audioTracks.length} ta audio dublyaj
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                        {m.imdbRating}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">{m.quality[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMENTS & COMMUNITY MODERATION */}
        {activeTab === 'comments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Foydalanuvchilar Taqrizlari va Izohlari</h3>
                <p className="text-xs text-slate-400">
                  Moderatsiya qiling, rasmiy administrator sifatida javob bering yoki spoylerlarni yashiring.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                Jami: {comments.length} ta sharh
              </span>
            </div>

            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    c.isPinned
                      ? 'bg-amber-500/5 border-amber-500/40'
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800">
                        <Image src={c.userAvatar} alt={c.userName} width={32} height={32} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{c.userName}</h4>
                          <span className="text-[11px] text-red-400 font-semibold">• {c.movieTitle}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{c.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {c.isPinned && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                          📌 Qadalgan
                        </span>
                      )}
                      {c.isSpoiler && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                          ⚠️ Spoyler
                        </span>
                      )}
                      <span className="text-xs font-black text-amber-400 px-2 py-0.5 rounded bg-slate-800">
                        ⭐ {c.rating}/10
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{c.text}</p>

                  {/* Existing Admin Reply */}
                  {c.adminReply && (
                    <div className="p-3 rounded-xl bg-red-950/20 border-l-4 border-l-red-500 border border-red-500/30 text-xs">
                      <p className="font-bold text-red-400">{c.adminReply.author} ({c.adminReply.role}):</p>
                      <p className="text-slate-300 mt-0.5">{c.adminReply.text}</p>
                    </div>
                  )}

                  {/* Moderator Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => togglePinComment(c.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Pin className="w-3 h-3" />
                        <span>{c.isPinned ? "Qadashni bekor qilish" : "Qadab qo'yish"}</span>
                      </button>

                      <button
                        onClick={() => toggleSpoilerComment(c.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <EyeOff className="w-3 h-3" />
                        <span>{c.isSpoiler ? "Spoylerni yechish" : "Spoyler deb belgilash"}</span>
                      </button>

                      <button
                        onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
                        className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Reply className="w-3 h-3" />
                        <span>👑 Rasmiy Javob Berish</span>
                      </button>
                    </div>

                    <button
                      onClick={() => deleteComment(c.id)}
                      className="p-1.5 rounded-lg hover:bg-red-600/20 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Admin Reply Input Box */}
                  {replyingToId === c.id && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-red-500/40 space-y-2 mt-2">
                      <p className="text-xs font-bold text-red-400">👑 Administrator nomidan rasmiy javob yozish:</p>
                      <input
                        type="text"
                        placeholder="Masalan: Fikringiz uchun rahmat! Tez orada yangi qismlar yuklanadi..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setReplyingToId(null)}
                          className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 cursor-pointer"
                        >
                          Bekor qilish
                        </button>
                        <button
                          onClick={() => handleSendAdminReply(c.id)}
                          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white cursor-pointer"
                        >
                          Javobni e&apos;lon qilish
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRANSCODER & VIDEO INFRASTRUCTURE */}
        {activeTab === 'transcoder' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    FFmpeg &amp; BullMQ Transcoding Pipeline (HLS &amp; AES-128)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Og&apos;ir 10-50 GB videofayllarni uzilishlarsiz yuklash va ko&apos;p sifatli HLS formatga o&apos;tkazish.
                  </p>
                </div>
              </div>

              {/* Upload Dropzone Simulation */}
              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center bg-slate-950/60 space-y-3">
                <UploadCloud className="w-12 h-12 text-slate-500 mx-auto" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Videofaylni bu yerga sudrab tashlang yoki tanlang (.mp4, .mkv, .mov)
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tus.io / S3 Multipart Resumable Chunked Upload qo&apos;llab-quvvatlanadi
                  </p>
                </div>
                <button
                  onClick={handleStartTranscodeSimulation}
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'Transkodlash jarayonda...' : '25 GB Namunaviy Videoni Transkodlashga Yuborish'}
                </button>
              </div>

              {/* Progress & Live Pipeline Steps */}
              {isUploading && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{transcodeStep}</span>
                    <span className="text-red-500 font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-400 font-mono">
                    <span className={uploadProgress >= 25 ? 'text-emerald-400' : ''}>✓ 1. Chunked Upload</span>
                    <span className={uploadProgress >= 50 ? 'text-emerald-400' : ''}>✓ 2. 1080p/720p/480p</span>
                    <span className={uploadProgress >= 75 ? 'text-emerald-400' : ''}>✓ 3. HLS .m3u8 Pleylist</span>
                    <span className={uploadProgress === 100 ? 'text-emerald-400' : ''}>✓ 4. AES-128 Shifrlash</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
