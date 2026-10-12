'use client';

import React from 'react';
import {
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { AggregatedCourtResult, CourtSlot } from '@/types/courts';
import { formatTimeSlotRange } from '@/lib/courts-service';

interface CourtCardProps {
  result: AggregatedCourtResult;
  selectedDate: string;
  onSelectSlot: (slot: CourtSlot, result: AggregatedCourtResult) => void;
  onOpenSchedule: (result: AggregatedCourtResult) => void;
}

export const CourtCard: React.FC<CourtCardProps> = ({
  result,
  selectedDate,
  onSelectSlot,
  onOpenSchedule,
}) => {
  const { court, venue, slots, availableCount, earliestSlot } = result;

  // Filter available slots for display chips
  const openSlots = slots.filter((s) => s.status === 'available');

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      
      <div className="flex flex-col lg:flex-row">
        
        {/* 1. Venue Cover Image & Badges */}
        <div className="relative h-48 w-full lg:h-auto lg:w-72 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={venue.cover_image_url || 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80'}
            alt={venue.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />

          {/* Availability Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {availableCount > 0 ? (
              <span className="flex items-center gap-1 rounded-full bg-emerald-600/95 px-2.5 py-1 text-xs font-extrabold text-white shadow-md backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse" />
                {availableCount} {availableCount === 1 ? 'Slot Open' : 'Slots Open'}
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                <AlertCircle className="h-3 w-3" />
                Booked in this window
              </span>
            )}

            {court.is_indoor && (
              <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-sky-300 backdrop-blur-md border border-sky-400/30">
                Indoor Air-Cooled
              </span>
            )}
          </div>

          {/* Surface & Lighting info */}
          <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium lg:hidden">
            <span className="capitalize">{court.surface?.replace('_', ' ')}</span> • {venue.barangay || venue.city}
          </div>
        </div>

        {/* 2. Court Details & Open Slot Chips */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            {/* Location & Title */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    {venue.barangay ? `${venue.barangay}, ` : ''}{venue.city}
                    {venue.distance_km ? ` • ${venue.distance_km} km away` : ''}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors dark:text-white dark:group-hover:text-lime-300">
                  {court.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {venue.name}
                </p>
              </div>

              {/* Surface & Tag specs */}
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 capitalize dark:bg-slate-800 dark:text-slate-300">
                  {court.surface?.replace('_', ' ')} surface
                </span>
                {court.has_lighting && (
                  <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    Night Lights
                  </span>
                )}
              </div>
            </div>

            {/* Available Time Slots Section (Skyscanner style slot pills) */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  Available Slots for Selected Window:
                </span>
                <button
                  onClick={() => onOpenSchedule(result)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-lime-400 dark:hover:underline"
                >
                  View full day timeline →
                </button>
              </div>

              {openSlots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {openSlots.slice(0, 5).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => onSelectSlot(slot, result)}
                      className="group/slot flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50/80 px-2.5 py-1.5 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white active:scale-95 shadow-2xs"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 group-hover/slot:text-white dark:text-lime-400" />
                      <span>{formatTimeSlotRange(slot.start_time, slot.end_time)}</span>
                    </button>
                  ))}
                  {openSlots.length > 5 && (
                    <button
                      onClick={() => onOpenSchedule(result)}
                      className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    >
                      +{openSlots.length - 5} more
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                  No open slots in this selected window. Tap &ldquo;View full day timeline&rdquo; to find adjacent hours.
                </div>
              )}
            </div>
          </div>

          {/* 3. Price & Action Buttons Footer */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            {/* Price Display */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ₱{Number(court.rate_per_hour).toFixed(0)}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  / hour
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">
                Direct Venue Rate • No markups
              </span>
            </div>

            {/* Action Buttons: 1-Click Outbound Booking & Messenger Deep Link */}
            <div className="flex items-center gap-2">
              {venue.booking_url && (
                <a
                  href={venue.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <span>Book Site</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <button
                onClick={() => {
                  const targetSlot = earliestSlot || openSlots[0];
                  if (targetSlot) {
                    onSelectSlot(targetSlot, result);
                  } else {
                    onOpenSchedule(result);
                  }
                }}
                className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Inquire via Messenger</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
