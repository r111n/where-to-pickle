'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, Flame } from 'lucide-react';
import { SearchState, SportType, TimeWindow } from '@/types/courts';

interface SearchWidgetProps {
  filters: SearchState;
  onUpdateFilters: (updates: Partial<SearchState>) => void;
  onSearch: () => void;
}

const SPORTS: { type: SportType; label: string; icon: string }[] = [
  { type: 'pickleball', label: 'Pickleball', icon: '🥒' },
  { type: 'badminton', label: 'Badminton', icon: '🏸' },
  { type: 'tennis', label: 'Tennis', icon: '🎾' },
  { type: 'basketball', label: 'Basketball', icon: '🏀' },
];

const TIME_WINDOWS: { id: TimeWindow; label: string; range: string; isPeak?: boolean }[] = [
  { id: 'all', label: 'All Day', range: '6:00 AM - 11:00 PM' },
  { id: 'morning', label: 'Morning', range: '6:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 PM - 5:00 PM' },
  { id: 'evening', label: 'Evening Peak', range: '5:00 PM - 9:00 PM', isPeak: true },
  { id: 'night', label: 'Night Owls', range: '9:00 PM - 11:00 PM' },
];

const LOCATIONS = [
  { id: 'all', label: 'All Metro Dumaguete' },
  { id: 'dumaguete', label: 'Dumaguete Central' },
  { id: 'bantayan', label: 'Bantayan (Sports Strip)' },
  { id: 'mangnao', label: 'Mangnao / Praxevilla' },
  { id: 'valencia', label: 'Valencia (Cool Breeze)' },
  { id: 'sibulan', label: 'Sibulan (Airport & Coastal)' },
  { id: 'piapi', label: 'Piapi / Silliman' },
];

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  filters,
  onUpdateFilters,
  onSearch,
}) => {
  const [todayStr, setTodayStr] = useState('2026-10-12');
  const [tomorrowStr, setTomorrowStr] = useState('2026-10-13');

  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    setTodayStr(todayFormatted);
    setTomorrowStr(tomorrowFormatted);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-emerald-900 to-emerald-950 p-4 sm:p-6 text-white shadow-2xl border border-emerald-800/60">
      
      {/* 1. Sport Tabs (Trip.com style top tabs) */}
      <div className="mb-6 flex flex-wrap gap-2 sm:gap-3 border-b border-emerald-800/70 pb-4">
        {SPORTS.map((sport) => {
          const isSelected = filters.sport === sport.type;
          return (
            <button
              key={sport.type}
              onClick={() => onUpdateFilters({ sport: sport.type })}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                isSelected
                  ? 'bg-lime-400 text-emerald-950 shadow-md shadow-lime-400/30 scale-102'
                  : 'bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800 hover:text-white border border-emerald-700/50'
              }`}
            >
              <span className="text-lg">{sport.icon}</span>
              <span>{sport.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Main Search Fields Bar (Flight / Hotel search bar row) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
        
        {/* Date Field */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-lime-400" />
            Play Date
          </label>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateFilters({ date: todayStr })}
              className={`rounded-lg px-2.5 py-2 text-xs font-bold transition-colors ${
                filters.date === todayStr
                  ? 'bg-lime-400 text-emerald-950'
                  : 'bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => onUpdateFilters({ date: tomorrowStr })}
              className={`rounded-lg px-2.5 py-2 text-xs font-bold transition-colors ${
                filters.date === tomorrowStr
                  ? 'bg-lime-400 text-emerald-950'
                  : 'bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700'
              }`}
            >
              Tomorrow
            </button>
            <input
              type="date"
              value={filters.date}
              min={todayStr}
              onChange={(e) => onUpdateFilters({ date: e.target.value })}
              className="w-full flex-1 rounded-xl bg-emerald-950/90 px-3 py-2 text-sm text-white border border-emerald-700/60 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-lime-400" />
            Location / Area
          </label>
          <select
            value={filters.location}
            onChange={(e) => onUpdateFilters({ location: e.target.value })}
            className="w-full rounded-xl bg-emerald-950/90 px-3 py-2.5 text-sm text-white border border-emerald-700/60 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id} className="bg-emerald-950 text-white">
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-4">
          <button
            onClick={onSearch}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-5 py-3 text-base font-extrabold text-emerald-950 shadow-lg shadow-lime-400/25 transition-all hover:brightness-105 active:scale-98"
          >
            <Search className="h-5 w-5" />
            <span>Search Live Courts</span>
          </button>
        </div>
      </div>

      {/* 3. Time Window Quick Selectors (Skyscanner flight time filters) */}
      <div className="mt-5 pt-4 border-t border-emerald-800/60">
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2.5">
          <Clock className="h-3.5 w-3.5 text-lime-400" />
          Preferred Time Window:
        </div>
        <div className="flex flex-wrap gap-2">
          {TIME_WINDOWS.map((win) => {
            const isSelected = filters.timeWindow === win.id;
            return (
              <button
                key={win.id}
                onClick={() => onUpdateFilters({ timeWindow: win.id })}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-lime-400 text-emerald-950 shadow-sm font-bold'
                    : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-700/40'
                }`}
              >
                {win.isPeak && <Flame className="h-3 w-3 text-amber-400 animate-pulse" />}
                <span>{win.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-800' : 'text-emerald-400'}`}>
                  ({win.range.split(' - ')[0]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
