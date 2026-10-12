'use client';

import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import { AggregatedCourtResult, CourtSlot } from '@/types/courts';
import {
  formatTime12h,
  formatTimeSlotRange,
  getInquiryText,
  getMessengerInquiryUrl,
} from '@/lib/courts-service';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: CourtSlot | null;
  result: AggregatedCourtResult | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  slot,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !slot || !result) return null;

  const { venue, court } = result;
  const inquiryText = getInquiryText(venue, court, slot.slot_date, slot.start_time);
  const messengerUrl = getMessengerInquiryUrl(venue, court, slot.slot_date, slot.start_time);

  const handleCopy = () => {
    navigator.clipboard.writeText(inquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
            💬
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Instant Court Inquiry
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tier 3 Direct Messenger Deep Link for Dumaguete Courts
            </p>
          </div>
        </div>

        {/* Selected Slot Summary Card */}
        <div className="mt-4 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {court.name}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-lime-400">
              ₱{Number(court.rate_per_hour).toFixed(0)} / hr
            </span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-emerald-500" />
            <span>{venue.name} • {venue.barangay ? `${venue.barangay}, ` : ''}{venue.city}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300 pt-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{new Date(slot.slot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{formatTimeSlotRange(slot.start_time, slot.end_time)}</span>
            </div>
          </div>
        </div>

        {/* Pre-formatted Message Preview */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pre-Formatted Inquiry Text:
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-lime-400"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-xs font-medium text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
            &ldquo;{inquiryText}&rdquo;
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-98"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Launch Messenger Now</span>
          </a>

          {venue.booking_url && (
            <a
              href={venue.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-200 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span>Book on Site</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Venue Contact Info */}
        {venue.phone && (
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
            <Phone className="h-3.5 w-3.5" />
            <span>Venue Phone: {venue.phone}</span>
          </div>
        )}

      </div>
    </div>
  );
};
