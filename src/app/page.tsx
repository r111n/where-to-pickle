'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchWidget } from '@/components/SearchWidget';
import { FilterBar } from '@/components/FilterBar';
import { CourtCard } from '@/components/CourtCard';
import { InquiryModal } from '@/components/InquiryModal';
import { CourtScheduleModal } from '@/components/CourtScheduleModal';
import { IngestionArchitectureModal } from '@/components/IngestionArchitectureModal';
import { AreaHighlights } from '@/components/AreaHighlights';
import { AggregatedCourtResult, CourtSlot, SearchState } from '@/types/courts';
import { searchCourts } from '@/lib/courts-service';
import { Sparkles, Calendar, Clock, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [filters, setFilters] = useState<SearchState>({
    sport: 'pickleball',
    date: '2026-10-12',
    timeWindow: 'all',
    location: 'all',
    sortBy: 'earliest',
    filterIndoorOnly: false,
    filterLightsOnly: false,
    maxPrice: 1000,
  });

  const [results, setResults] = useState<AggregatedCourtResult[]>([]);
  const [totalCourts, setTotalCourts] = useState(0);
  const [totalOpenSlots, setTotalOpenSlots] = useState(0);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Modals state
  const [selectedSlot, setSelectedSlot] = useState<CourtSlot | null>(null);
  const [selectedSlotResult, setSelectedSlotResult] = useState<AggregatedCourtResult | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const [scheduleResult, setScheduleResult] = useState<AggregatedCourtResult | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFilters((prev) => ({ ...prev, date: today }));
  }, []);

  const executeSearch = () => {
    startTransition(async () => {
      const data = await searchCourts(filters);
      setResults(data.results);
      setTotalCourts(data.totalCourts);
      setTotalOpenSlots(data.totalOpenSlots);
      setIsLiveSupabase(data.isLiveSupabase);
    });
  };

  useEffect(() => {
    executeSearch();
  }, [filters]);

  const handleUpdateFilters = (updates: Partial<SearchState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectSlot = (slot: CourtSlot, result: AggregatedCourtResult) => {
    setSelectedSlot(slot);
    setSelectedSlotResult(result);
    setIsInquiryModalOpen(true);
  };

  const handleOpenSchedule = (result: AggregatedCourtResult) => {
    setScheduleResult(result);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        isLiveSupabase={isLiveSupabase}
        onRefreshData={executeSearch}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 pt-8 pb-16 text-white px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          
          <div className="mb-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-400/20 px-3 py-1 text-xs font-bold text-lime-300 border border-lime-400/30 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-Time Dumaguete Court Search</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Compare &amp; Book Courts Across <span className="text-lime-400">Dumaguete</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-200/90 max-w-2xl">
              The unified availability search engine for recreational sports. Instant aggregation from Court-Access, Dinky, A-Courts, PlayTime Scheduler, and local clubs.
            </p>
          </div>

          {/* Trip.com Skyscanner Search Widget */}
          <SearchWidget
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            onSearch={executeSearch}
          />

        </div>
      </section>

      {/* Main Results Container */}
      <main className="mx-auto -mt-6 w-full max-w-6xl px-4 sm:px-6 pb-20 flex-1">
        
        {/* Filter and Sorting Header */}
        <FilterBar
          filters={filters}
          onUpdateFilters={handleUpdateFilters}
          totalCourts={totalCourts}
          totalOpenSlots={totalOpenSlots}
        />

        {/* Loading Indicator */}
        {isPending && (
          <div className="flex items-center justify-center gap-2 py-8 text-emerald-600 dark:text-lime-400 text-sm font-semibold">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Updating real-time court availability...</span>
          </div>
        )}

        {/* Court Cards Grid */}
        <div className="mt-6 space-y-4">
          {results.length > 0 ? (
            results.map((result) => (
              <CourtCard
                key={result.court.id}
                result={result}
                selectedDate={filters.date}
                onSelectSlot={handleSelectSlot}
                onOpenSchedule={handleOpenSchedule}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl dark:bg-emerald-950">
                🎾
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                No courts matched this specific combination
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try switching the time window to &ldquo;All Day&rdquo; or clearing specific filters like indoor-only.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    sport: 'pickleball',
                    date: '2026-10-12',
                    timeWindow: 'all',
                    location: 'all',
                    sortBy: 'earliest',
                    filterIndoorOnly: false,
                    filterLightsOnly: false,
                    maxPrice: 1000,
                  })
                }
                className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Area Highlights */}
        <AreaHighlights
          onSelectArea={(loc) => handleUpdateFilters({ location: loc })}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <span>🥒 WhereToPickle Dumaguete</span>
            <span>•</span>
            <span className="font-normal text-slate-500">Connecting Dumaguete, Valencia, Sibulan &amp; Bacong Sports</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-lime-300"
            >
              Aggregation Architecture
            </button>
            <a
              href="https://github.com/r111n/where-to-pickle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-lime-300"
            >
              GitHub (r111n)
            </a>
          </div>
        </div>
      </footer>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        slot={selectedSlot}
        result={selectedSlotResult}
      />

      {/* Full Day Schedule Modal */}
      <CourtScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        result={scheduleResult}
        selectedDate={filters.date}
        onSelectSlot={handleSelectSlot}
      />

      {/* Architecture Modal */}
      <IngestionArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
        isLiveSupabase={isLiveSupabase}
      />

    </div>
  );
}
