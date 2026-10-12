import { BookingPlatform, CourtSlot } from '@/types/courts';

export interface ScrapedSlotData {
  courtId: string;
  courtName: string;
  venueSlug: string;
  slotDate: string;   // YYYY-MM-DD
  startTime: string;  // HH:MM:SS
  endTime: string;    // HH:MM:SS
  status: 'available' | 'booked';
  ratePerHour?: number;
  sourcePlatform: BookingPlatform;
  directBookingUrl?: string;
}

export interface PlatformScrapeReport {
  platform: BookingPlatform;
  venueName: string;
  venueSlug: string;
  scrapedAt: string;
  slotsFound: number;
  availableCount: number;
  success: boolean;
  error?: string;
  slots: ScrapedSlotData[];
}

export interface SyncEngineSummary {
  date: string;
  timestamp: string;
  totalPlatforms: number;
  totalSlotsIngested: number;
  totalAvailableSlots: number;
  reports: PlatformScrapeReport[];
  persistedToSupabase: boolean;
}
