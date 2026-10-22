export type MediaType = 'movie' | 'series';

export interface AudioTrack {
  id: string;
  name: string;
  studio?: string;
  lang: string;
  flag: string;
  isDefault?: boolean;
}

export interface SubtitleTrack {
  id: string;
  name: string;
  lang: string;
  src?: string;
}

export interface CastMember {
  name: string;
  role: string;
  photoUrl: string;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  skipIntro?: {
    start: number; // seconds
    end: number;   // seconds
  };
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  type: MediaType;
  year: number;
  duration: string;
  ageRating: string;
  quality: string[];
  imdbRating: number;
  kinopoiskRating: number;
  platformRating: number;
  genres: string[];
  country: string;
  director: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  videoUrl: string;
  audioTracks: AudioTrack[];
  subtitles: SubtitleTrack[];
  cast: CastMember[];
  isTrending?: boolean;
  isTop10?: boolean;
  top10Rank?: number;
  isPremier?: boolean;
  isUzbek?: boolean;
  isExclusive?: boolean;
  seasons?: Season[];
}

export interface Comment {
  id: string;
  movieId: string;
  movieTitle: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1 to 10
  date: string;
  text: string;
  isSpoiler: boolean;
  isPinned: boolean;
  status: 'approved' | 'pending' | 'flagged';
  likes: number;
  adminReply?: {
    author: string;
    role: string;
    text: string;
    date: string;
  };
}

export interface ContinueWatchingItem {
  movieId: string;
  title: string;
  type: MediaType;
  episodeInfo?: string;
  posterUrl: string;
  backdropUrl: string;
  progressPercent: number;
  remainingTime: string;
  currentSecond: number;
  totalSeconds: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
  isCurrent?: boolean;
}

export interface SubscriptionPlan {
  id: 'standard' | 'premium_4k';
  name: string;
  price: string;
  period: string;
  quality: string;
  devices: number;
  features: string[];
  isPopular?: boolean;
}
