'use client';

import React from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { AggregatedCourtResult, CourtSlot } from '@/types/courts';
import { formatTime12h, formatTimeSlotRange } from '@/lib/courts-service';

interface CourtScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AggregatedCourtResult | null;
  selectedDate: string;
  onSelectSlot: (slot: CourtSlot, result: AggregatedCourtResult) => void;
}

export const CourtScheduleModal: React.FC<CourtScheduleModalProps> = ({
  isOpen,
  onClose,
  result,
  selectedDate,
  onSelectSlot,
}) => {
  if (!isOpen || !result) return null;

  const { court, venue, slots } = result;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>{venue.name} • {venue.barangay ? `${venue.barangay}, ` : ''}{venue.city}</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {court.name} — Full Day Availability Timeline
          </h2>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs font-medium border-y border-slate-100 dark:border-slate-800 py-2.5">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span>Available (Tap to Inquire/Book)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>Booked / Reserved</span>
          </div>
        </div>

        {/* Slots Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {slots.map((slot) => {
            const isAvailable = slot.status === 'available';
            return (
              <button
                key={slot.id}
                disabled={!isAvailable}
                onClick={() => {
                  onSelectSlot(slot, result);
                  onClose();
                }}
                className={`flex items-center justify-between rounded-xl p-3 text-left transition-all ${
                  isAvailable
                    ? 'border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-600 dark:hover:text-white group cursor-pointer shadow-xs'
                    : 'border border-slate-200 bg-slate-100/70 opacity-60 dark:border-slate-800 dark:bg-slate-800/40 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-white dark:text-slate-100">
                    {formatTimeSlotRange(slot.start_time, slot.end_time)}
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-emerald-100 dark:text-slate-400 mt-0.5">
                    {isAvailable ? 'Available now' : 'Booked'}
                  </div>
                </div>

                {isAvailable ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 group-hover:text-white dark:text-lime-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
