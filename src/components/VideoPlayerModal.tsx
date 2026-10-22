'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCinema } from '@/context/CinemaContext';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  Settings,
  Headphones,
  Subtitles,
  FastForward,
  Check,
  Shield,
  Sparkles
} from 'lucide-react';

export default function VideoPlayerModal() {
  const { playingMovie, setPlayingMovie, updateContinueWatching } = useCinema();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeMenu, setActiveMenu] = useState<'none' | 'quality' | 'audio' | 'subtitles'>('none');

  // Selected tracks
  const [selectedQuality, setSelectedQuality] = useState('1080p Full HD');
  const [selectedAudio, setSelectedAudio] = useState("O'zbekcha (Tarjima Kinolar Studio)");
  const [selectedSubtitle, setSelectedSubtitle] = useState("O'chirilgan");

  // Floating Watermark coordinates (anti-piracy)
  const [watermarkPos, setWatermarkPos] = useState({ top: '15%', left: '80%' });

  // Inactivity controls hide timer
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const movie = playingMovie?.movie;
  const episode = playingMovie?.episode;
  const currentVideoSrc = episode?.videoUrl || movie?.videoUrl;
  const skipIntro = episode?.skipIntro || { start: 10, end: 40 };

  // Periodically randomize watermark position slightly (Anti-Piracy USP)
  useEffect(() => {
    if (!playingMovie) return;
    const wmInterval = setInterval(() => {
      const top = Math.floor(Math.random() * 60 + 15) + '%';
      const left = Math.floor(Math.random() * 60 + 20) + '%';
      setWatermarkPos({ top, left });
    }, 15000);
    return () => clearInterval(wmInterval);
  }, [playingMovie]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekBy = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + seconds)
    );
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.warn(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleClose = () => {
    if (videoRef.current && movie) {
      updateContinueWatching(
        movie.id,
        Math.floor(videoRef.current.currentTime),
        Math.floor(videoRef.current.duration || 3600)
      );
    }
    setPlayingMovie(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!playingMovie) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        seekBy(-10);
      } else if (e.code === 'ArrowRight') {
        seekBy(10);
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
        } else {
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playingMovie, isPlaying, isFullscreen]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleSkipIntro = () => {
    if (!videoRef.current || !skipIntro) return;
    videoRef.current.currentTime = skipIntro.end;
  };

  if (!playingMovie || !movie) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isIntroActive =
    skipIntro && currentTime >= skipIntro.start && currentTime <= skipIntro.end;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* HTML5 / HLS Video Element */}
      <video
        ref={videoRef}
        src={currentVideoSrc}
        autoPlay
        playsInline
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            videoRef.current.volume = volume;
          }
        }}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Dynamic Anti-Piracy Watermark (Master Plan Section 3.4) */}
      <div
        style={{ top: watermarkPos.top, left: watermarkPos.left }}
        className="absolute pointer-events-none transition-all duration-1000 select-none text-[11px] font-mono font-bold text-white/20 tracking-widest px-2 py-1 rounded bg-black/10 border border-white/5"
      >
        ID: UZ-89412 • KINOSTREAM
      </div>

      {/* "Skip Intro" Button (Appears during intro timestamps) */}
      {isIntroActive && (
        <button
          onClick={handleSkipIntro}
          className="absolute bottom-24 right-8 z-40 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-black font-black text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 animate-bounce"
        >
          <FastForward className="w-4 h-4 fill-black" />
          <span>Introni o&apos;tkazib yuborish</span>
        </button>
      )}

      {/* Subtitles Overlay if active */}
      {selectedSubtitle !== "O'chirilgan" && (
        <div className="absolute bottom-20 left-0 right-0 pointer-events-none flex justify-center z-30 px-4">
          <span className="bg-black/75 backdrop-blur-sm text-amber-300 font-bold text-base sm:text-lg px-4 py-1.5 rounded-lg shadow-lg tracking-wide text-center">
            {movie.title} • {selectedSubtitle} subtitri faol
          </span>
        </div>
      )}

      {/* Top Bar Controls (Title & Close) */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 z-40 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              {movie.title}
              {episode && (
                <span className="text-xs px-2 py-0.5 rounded bg-blue-600/80 text-white font-medium">
                  {episode.title}
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedQuality} • {selectedAudio}
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-medium text-slate-300">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>HLS AES-128 Shifrlangan</span>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 z-40 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Slider */}
        <div className="relative mb-3 group/seek flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full h-1.5 group-hover/seek:h-2.5 bg-slate-700/70 rounded-full appearance-none cursor-pointer accent-red-600 transition-all"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Controls: Play, Seek +/- 10s, Volume, Time */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-transform active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white translate-x-0.5" />
              )}
            </button>

            <button
              onClick={() => seekBy(-10)}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="10 soniya orqaga"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => seekBy(10)}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="10 soniya oldinga"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-red-600"
              />
            </div>

            {/* Timestamps */}
            <div className="text-xs font-semibold text-slate-300">
              <span>{formatTime(currentTime)}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span className="text-slate-400">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls: Quality, Audio, Subtitles, Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* Audio Track Selector */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'audio' ? 'none' : 'audio')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  activeMenu === 'audio'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Dublyaj / Audio"
              >
                <Headphones className="w-5 h-5" />
              </button>

              {activeMenu === 'audio' && (
                <div className="absolute bottom-12 right-0 w-64 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700 z-50 text-xs">
                  <p className="px-3 py-1.5 font-bold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                    Audio Yo&apos;lakcha (Dublyaj)
                  </p>
                  {movie.audioTracks.map((tr) => (
                    <button
                      key={tr.id}
                      onClick={() => {
                        setSelectedAudio(`${tr.name} (${tr.studio || 'Original'})`);
                        setActiveMenu('none');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-800/80 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-slate-200">
                        <span>{tr.flag}</span>
                        <span>{tr.name}</span>
                        <span className="text-[10px] text-slate-400">({tr.studio})</span>
                      </span>
                      {selectedAudio.includes(tr.name) && (
                        <Check className="w-3.5 h-3.5 text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subtitles Selector */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'subtitles' ? 'none' : 'subtitles')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  activeMenu === 'subtitles'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Subtitrlar"
              >
                <Subtitles className="w-5 h-5" />
              </button>

              {activeMenu === 'subtitles' && (
                <div className="absolute bottom-12 right-0 w-52 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700 z-50 text-xs">
                  <p className="px-3 py-1.5 font-bold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                    Subtitrlar
                  </p>
                  {["O'chirilgan", "O'zbekcha", 'Ruscha', 'English'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubtitle(sub);
                        setActiveMenu('none');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-800/80 transition-colors"
                    >
                      <span className="text-slate-200">{sub}</span>
                      {selectedSubtitle === sub && <Check className="w-3.5 h-3.5 text-red-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Switcher */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'quality' ? 'none' : 'quality')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  activeMenu === 'quality'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Video sifati"
              >
                <Settings className="w-5 h-5" />
              </button>

              {activeMenu === 'quality' && (
                <div className="absolute bottom-12 right-0 w-56 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700 z-50 text-xs">
                  <p className="px-3 py-1.5 font-bold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                    Sifatni tanlash
                  </p>
                  {[
                    'Auto (HLS Adaptiv)',
                    '4K Ultra HD (2160p)',
                    '1080p Full HD',
                    '720p HD',
                    '480p SD',
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setSelectedQuality(q);
                        setActiveMenu('none');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-800/80 transition-colors"
                    >
                      <span className="text-slate-200">{q}</span>
                      {selectedQuality === q && <Check className="w-3.5 h-3.5 text-red-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-slate-300 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
              title="To'liq ekran (F)"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
