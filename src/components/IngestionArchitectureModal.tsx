'use client';

import React from 'react';
import { X, Activity, Database, Sparkles, MessageCircle, RefreshCw, Layers } from 'lucide-react';

interface IngestionArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLiveSupabase: boolean;
}

export const IngestionArchitectureModal: React.FC<IngestionArchitectureModalProps> = ({
  isOpen,
  onClose,
  isLiveSupabase,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-emerald-950 font-black text-xl shadow-md">
            ⚡
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3-Tier Availability Aggregator Architecture
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The &ldquo;Trip.com / Skyscanner&rdquo; Ingestion Engine for Dumaguete City
            </p>
          </div>
        </div>

        {/* Database Sync Status */}
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 dark:border-emerald-800/60 dark:bg-emerald-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-600 dark:text-lime-400" />
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                Supabase PostgreSQL Backend:
              </span>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isLiveSupabase
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              {isLiveSupabase ? '● Live Supabase Connected' : '● Dumaguete Metro Engine Active'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
            Schema includes: <code className="font-mono font-bold">venues</code>, <code className="font-mono font-bold">courts</code>, and <code className="font-mono font-bold">court_slots</code> ledger with RLS.
          </p>
        </div>

        {/* 3-Tier Breakdown */}
        <div className="mt-6 space-y-4">
          
          {/* Tier 1 */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-800 text-xs font-black dark:bg-blue-950 dark:text-blue-300">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Tier 1 — Automated Web &amp; Embed Scrapers
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Periodically probes public booking calendars (e.g. Setmore booking widgets, public iCal/JSON feeds, and court portals) every 15–30 minutes during booking hours to extract open slots into the <code className="font-mono">court_slots</code> ledger.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-100 text-purple-800 text-xs font-black dark:bg-purple-950 dark:text-purple-300">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Tier 2 — Venue Partner &amp; Google Sheets Sync
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides two-way synchronization for local venue operators maintaining court schedules on Google Sheets, plus a quick mobile-first toggle panel for venue managers to block/release courts with one tap.
            </p>
          </div>

          {/* Tier 3 */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 text-xs font-black dark:bg-emerald-950 dark:text-lime-300">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Tier 3 — 1-Click Outbound Deep Linking
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Eliminates the 20-minute friction of messaging managers by pre-filling the exact inquiry message directly into Facebook Messenger or redirecting to the venue checkout with exact court, date, and hour.
            </p>
          </div>

        </div>

        {/* SQL Migration instruction */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Supabase SQL Migration Ready:
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Migration files and seed scripts are saved at <code className="font-mono text-emerald-600 dark:text-lime-400">supabase/migrations/20261012_init.sql</code> and <code className="font-mono text-emerald-600 dark:text-lime-400">supabase/seed.sql</code>. Run them in your Supabase SQL Editor anytime.
          </p>
        </div>

      </div>
    </div>
  );
};
