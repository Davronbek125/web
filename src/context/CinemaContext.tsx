'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, Comment, ContinueWatchingItem, UserProfile } from '@/types/cinema';
import { INITIAL_MOVIES, INITIAL_COMMENTS, INITIAL_CONTINUE_WATCHING, USER_PROFILES } from '@/data/mockData';

interface PlayingMovieState {
  movie: Movie;
  episode?: {
    episodeNumber: number;
    title: string;
    videoUrl: string;
    skipIntro?: { start: number; end: number };
  };
}

interface CinemaContextType {
  movies: Movie[];
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  activeMovie: Movie | null;
  setActiveMovie: (movie: Movie | null) => void;
  playingMovie: PlayingMovieState | null;
  setPlayingMovie: (data: PlayingMovieState | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  profiles: UserProfile[];
  subscription: {
    isSubscribed: boolean;
    plan: string;
    expiresAt: string;
  };
  upgradeSubscription: (planId: string, paymentMethod: string) => void;
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
  comments: Comment[];
  addComment: (movieId: string, text: string, rating: number, isSpoiler: boolean) => void;
  addAdminReply: (commentId: string, replyText: string) => void;
  togglePinComment: (commentId: string) => void;
  toggleSpoilerComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
  addNewMovie: (newMovie: Movie) => void;
  continueWatching: ContinueWatchingItem[];
  updateContinueWatching: (movieId: string, currentSec: number, totalSec: number) => void;
}

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

export function CinemaProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [watchlist, setWatchlist] = useState<string[]>(['dune-2', 'mendirman-jaloliddin']);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<PlayingMovieState | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Hammasi');
  const [profiles, setProfiles] = useState<UserProfile[]>(USER_PROFILES);
  const [userProfile, setUserProfile] = useState<UserProfile>(USER_PROFILES[0]);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscription, setSubscription] = useState({
    isSubscribed: true,
    plan: 'Premium VIP 4K',
    expiresAt: '2026-10-15',
  });
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>(INITIAL_CONTINUE_WATCHING);

  // Load persisted data if available
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem('cinema_watchlist');
      if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));

      const savedSub = localStorage.getItem('cinema_sub');
      if (savedSub) setSubscription(JSON.parse(savedSub));

      const savedComments = localStorage.getItem('cinema_comments');
      if (savedComments) setComments(JSON.parse(savedComments));

      const savedMovies = localStorage.getItem('cinema_movies');
      if (savedMovies) setMovies(JSON.parse(savedMovies));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, []);

  const toggleWatchlist = (movieId: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId];
      try {
        localStorage.setItem('cinema_watchlist', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const isInWatchlist = (movieId: string) => watchlist.includes(movieId);

  const upgradeSubscription = (planId: string, paymentMethod: string) => {
    const planName = planId === 'premium_4k' ? 'Premium VIP 4K' : 'Standart Full HD';
    const nextSub = {
      isSubscribed: true,
      plan: `${planName} (${paymentMethod})`,
      expiresAt: '2027-01-01',
    };
    setSubscription(nextSub);
    try {
      localStorage.setItem('cinema_sub', JSON.stringify(nextSub));
    } catch (e) {
      console.warn(e);
    }
    setIsSubscriptionModalOpen(false);
  };

  const addComment = (movieId: string, text: string, rating: number, isSpoiler: boolean) => {
    const targetMovie = movies.find((m) => m.id === movieId);
    const newComment: Comment = {
      id: 'comm-' + Date.now(),
      movieId,
      movieTitle: targetMovie ? targetMovie.title : 'Film',
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      rating,
      date: 'Hozirgina',
      text,
      isSpoiler,
      isPinned: false,
      status: 'approved',
      likes: 1,
    };
    setComments((prev) => {
      const next = [newComment, ...prev];
      try {
        localStorage.setItem('cinema_comments', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const addAdminReply = (commentId: string, replyText: string) => {
    setComments((prev) => {
      const next = prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            adminReply: {
              author: 'Bosh Administrator',
              role: '👑 Administrator',
              text: replyText,
              date: 'Hozirgina',
            },
          };
        }
        return c;
      });
      try {
        localStorage.setItem('cinema_comments', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const togglePinComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  const toggleSpoilerComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, isSpoiler: !c.isSpoiler } : c))
    );
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const addNewMovie = (newMovie: Movie) => {
    setMovies((prev) => {
      const next = [newMovie, ...prev];
      try {
        localStorage.setItem('cinema_movies', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const updateContinueWatching = (movieId: string, currentSec: number, totalSec: number) => {
    if (!totalSec || totalSec <= 0) return;
    const progressPercent = Math.min(100, Math.round((currentSec / totalSec) * 100));
    const remainingMinutes = Math.max(1, Math.round((totalSec - currentSec) / 60));
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    setContinueWatching((prev) => {
      const filtered = prev.filter((item) => item.movieId !== movieId);
      const newItem: ContinueWatchingItem = {
        movieId,
        title: movie.title,
        type: movie.type,
        posterUrl: movie.posterUrl,
        backdropUrl: movie.backdropUrl,
        progressPercent,
        remainingTime: `${remainingMinutes} daqiqa qoldi`,
        currentSecond: currentSec,
        totalSeconds: totalSec,
      };
      return [newItem, ...filtered];
    });
  };

  return (
    <CinemaContext.Provider
      value={{
        movies,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        activeMovie,
        setActiveMovie,
        playingMovie,
        setPlayingMovie,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        userProfile,
        setUserProfile,
        profiles,
        subscription,
        upgradeSubscription,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        comments,
        addComment,
        addAdminReply,
        togglePinComment,
        toggleSpoilerComment,
        deleteComment,
        addNewMovie,
        continueWatching,
        updateContinueWatching,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
}

export function useCinema() {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error('useCinema must be used within a CinemaProvider');
  }
  return context;
}
