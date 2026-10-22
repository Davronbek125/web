'use client';

import React from 'react';
import Link from 'next/link';
import { Film, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#070a0e] text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/40">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                KINO<span className="text-red-500">STREAM</span>
                <span className="text-[10px] text-amber-400 ml-1 font-bold">UZ</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              O‘zbekistondagi eng yirik milliy va xalqaro kino striming platformasi. 4K Ultra HD
              sifat, professional dublyaj va yuqori tezlikdagi HLS oqim.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Litsenziyalangan kontent va mualliflik huquqi himoyasi</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Bo‘limlar</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <a href="#top-10-section" className="hover:text-red-400 transition-colors">
                  Top-10 O‘zbekistonda
                </a>
              </li>
              <li>
                <a href="#watchlist-section" className="hover:text-red-400 transition-colors">
                  Mening ro‘yxatim
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-red-400 transition-colors">
                  Admin boshqaruv paneli
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Janrlar va Dublyaj */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Dublyaj va Hamkorlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-300">🇺🇿 Tarjima Kinolar Studio</li>
              <li className="text-slate-300">🇺🇿 Milliy Dublyaj Markazi</li>
              <li className="text-slate-300">🎬 O‘zbekfilm Oltin Fondi</li>
              <li className="text-slate-300">🌐 Cloudflare &amp; S3 CDN</li>
            </ul>
          </div>

          {/* Col 4: Payments & Guarantee */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              To‘lov Hamkorlari
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Click, Payme va Uzum Bank orqali 1 soniyada xavfsiz to‘lov:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400">
                CLICK
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-emerald-400">
                PAYME
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-purple-400">
                UZUM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 KINOSTREAM UZ. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            <span>O‘zbekistonda ishlab chiqilgan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
