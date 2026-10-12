'use client';

import React from 'react';
import { ArrowUpDown, ShieldCheck, SunMedium, Umbrella, SlidersHorizontal } from 'lucide-react';
import { SearchState } from '@/types/courts';

interface FilterBarProps {
  filters: SearchState;
  onUpdateFilters: (updates: Partial<SearchState>) => void;
  totalCourts: number;
  totalOpenSlots: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  totalCourts,
  totalOpenSlots,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Result Status Count */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {totalCourts} {totalCourts === 1 ? 'Court' : 'Courts'} Found
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            {totalOpenSlots} Available Slots
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Sorted by real-time availability in Dumaguete
        </p>
      </div>

      {/* Sorting & Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        
        {/* Sort Select */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-slate-500 font-medium hidden md:inline">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onUpdateFilters({
                sortBy: e.target.value as SearchState['sortBy'],
              })
            }
            className="bg-transparent font-semibold text-slate-800 focus:outline-none dark:text-slate-200 cursor-pointer"
          >
            <option value="earliest">Earliest Open Slot</option>
            <option value="price">Lowest Price (₱)</option>
            <option value="proximity">Distance / Proximity</option>
          </select>
        </div>

        {/* Indoor Only Toggle */}
        <button
          onClick={() => onUpdateFilters({ filterIndoorOnly: !filters.filterIndoorOnly })}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            filters.filterIndoorOnly
              ? 'bg-emerald-600 text-white'
              : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <Umbrella className="h-3.5 w-3.5" />
          <span>Indoor</span>
        </button>

        {/* Night Lights Toggle */}
        <button
          onClick={() => onUpdateFilters({ filterLightsOnly: !filters.filterLightsOnly })}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            filters.filterLightsOnly
              ? 'bg-amber-600 text-white'
              : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <SunMedium className="h-3.5 w-3.5" />
          <span>With Lights</span>
        </button>

      </div>
    </div>
  );
};
