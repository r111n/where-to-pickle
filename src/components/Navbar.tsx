'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, Sparkles, MapPin, RefreshCw, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenArchitecture: () => void;
  isLiveSupabase?: boolean;
  onRefreshData?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenArchitecture,
  isLiveSupabase = false,
  onRefreshData,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState<string | null>(null);

  const handleSyncNow = async () => {
    try {
      setIsSyncing(true);
      setSyncStatusText('Syncing 5 platforms...');
      const res = await fetch('/api/sync');
      const data = await res.json();
      if (data.success) {
        setSyncStatusText(`Synced ${data.summary.totalSlotsIngested} slots`);
        if (onRefreshData) onRefreshData();
      } else {
        setSyncStatusText('Sync error');
      }
    } catch {
      setSyncStatusText('Sync error');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatusText(null), 3500);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/20 bg-emerald-950/90 text-white backdrop-blur-md shadow-lg shadow-emerald-950/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-lime-400 to-emerald-400 shadow-md shadow-lime-400/20 text-emerald-950 font-black text-2xl">
            🥒
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Where<span className="text-lime-300">ToPickle</span>
              </span>
              <span className="rounded-full bg-lime-400/20 px-2 py-0.5 text-[10px] font-semibold text-lime-300 border border-lime-400/30">
                DUMAGUETE
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 font-medium hidden sm:block">
              Dumaguete Sports Court Availability Aggregator
            </p>
          </div>
        </div>

        {/* Live Status and Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sync Now Button */}
          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-lime-300 transition-all border border-emerald-600/40 active:scale-95 disabled:opacity-50"
            title="Trigger Tier 1 Live Scrapers for Dumaguete platforms"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-lime-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{syncStatusText || 'Sync Scrapers'}</span>
          </button>

          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800/80 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition-all border border-emerald-700/40"
            title="View 3-Tier Aggregator Architecture"
          >
            <Activity className="h-3.5 w-3.5 text-lime-300" />
            <span className="hidden md:inline">How It Works</span>
          </button>

          <a
            href="https://m.me/where2pickle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 px-3.5 py-1.5 text-xs font-bold text-emerald-950 shadow-sm transition-transform active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>List a Court</span>
          </a>
        </div>
      </div>
    </header>
  );
};
