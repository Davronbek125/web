'use client';

import React, { useState } from 'react';
import { useCinema } from '@/context/CinemaContext';
import { SUBSCRIPTION_PLANS } from '@/data/mockData';
import {
  X,
  Crown,
  Check,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Tv,
  Smartphone,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubscriptionModal() {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen, upgradeSubscription, subscription } =
    useCinema();

  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium_4k'>('premium_4k');
  const [selectedPayment, setSelectedPayment] = useState<'Click' | 'Payme' | 'Uzum Bank'>('Click');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isSubscriptionModalOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'KINO2026' || promoCode.trim().toUpperCase() === 'VIP') {
      setDiscount(20);
      setPromoMessage('20% chegirma muvaffaqiyatli qo‘llandi!');
    } else {
      setDiscount(0);
      setPromoMessage('Noto‘g‘ri promokod kiritildi');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.warn(e);
      }
      upgradeSubscription(selectedPlan, selectedPayment);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e131d] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-amber-600/30 via-red-600/20 to-transparent border-b border-slate-800">
          <button
            onClick={() => setIsSubscriptionModalOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Crown className="w-4 h-4 fill-amber-400" />
            <span>VIP Premium Obunalar</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cheksiz Kino va Seriallar Dunyosi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            4K Ultra HD format, professional dublyaj va barcha premyeralar bitta oylik qulay to&apos;lov bilan.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-red-600/10 border-red-500 shadow-xl shadow-red-600/20'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                      Eng Ommabop
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-white">{plan.name}</h3>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-red-600 border-red-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-black text-white">
                        {discount > 0 && isSelected
                          ? `${Math.round(
                              parseInt(plan.price.replace(/[^0-9]/g, '')) * (1 - discount / 100)
                            ).toLocaleString()} so'm`
                          : plan.price}
                      </span>
                      <span className="text-xs text-slate-400">{plan.period}</span>
                    </div>

                    <p className="text-xs font-semibold text-amber-400 mb-4 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {plan.quality}
                    </p>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Gateways (Click, Payme, Uzum Bank) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              To&apos;lov usulini tanlang:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Click', color: 'bg-blue-600/20 border-blue-500/50 text-blue-400', logo: 'CLICK' },
                { name: 'Payme', color: 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400', logo: 'PAYME' },
                { name: 'Uzum Bank', color: 'bg-purple-600/20 border-purple-500/50 text-purple-400', logo: 'UZUM' },
              ].map((gw) => (
                <button
                  key={gw.name}
                  onClick={() => setSelectedPayment(gw.name as any)}
                  className={`p-3.5 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    selectedPayment === gw.name
                      ? `${gw.color} ring-2 ring-red-500`
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{gw.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400 shrink-0" />
            <input
              type="text"
              placeholder="Promokod (masalan: KINO2026)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none uppercase font-semibold"
            />
            <button
              onClick={handleApplyPromo}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              Qo&apos;llash
            </button>
          </div>
          {promoMessage && (
            <p
              className={`text-xs -mt-3 font-semibold ${
                discount > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {promoMessage}
            </p>
          )}

          {/* Security Guarantee & Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% xavfsiz to&apos;lov. Istalgan paytda bekor qilish mumkin.</span>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:opacity-95 text-white font-black text-sm shadow-xl shadow-red-600/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'To‘lov amalga oshirilmoqda...' : `${selectedPayment} orqali to‘lash`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
