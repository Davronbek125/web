'use client';

import React from 'react';
import { CinemaProvider } from '@/context/CinemaContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CinemaProvider>{children}</CinemaProvider>;
}
