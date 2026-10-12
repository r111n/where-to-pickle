export type SportType = 'pickleball' | 'badminton' | 'tennis' | 'basketball';

export type TimeWindow = 'all' | 'morning' | 'afternoon' | 'evening' | 'night';

export type BookingPlatform =
  | 'court-access'
  | 'dinky'
  | 'a-courts'
  | 'playtimescheduler'
  | 'playserve'
  | 'direct';

export interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  barangay: string | null;
  city: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  messenger_url: string | null;
  website_url: string | null;
  booking_url: string | null;
  booking_platform?: BookingPlatform;
  cover_image_url: string | null;
  amenities: string[];
  distance_km?: number;
}

export interface Court {
  id: string;
  venue_id: string;
  name: string;
  sport_type: SportType;
  surface: 'wood' | 'acrylic' | 'synthetic_mat' | 'concrete' | string | null;
  is_indoor: boolean;
  has_lighting: boolean;
  rate_per_hour: number;
  currency: string;
  status: string;
}

export interface CourtSlot {
  id: string;
  court_id: string;
  slot_date: string;
  start_time: string; // HH:MM:SS
  end_time: string;   // HH:MM:SS
  status: 'available' | 'booked' | 'maintenance' | 'pending';
  source: 'scraped' | 'partner_sync' | 'manual';
  last_verified_at: string;
}

export interface AggregatedCourtResult {
  court: Court;
  venue: Venue;
  slots: CourtSlot[];
  availableCount: number;
  earliestSlot: CourtSlot | null;
}

export interface SearchState {
  sport: SportType;
  date: string; // YYYY-MM-DD
  timeWindow: TimeWindow;
  location: string;
  sortBy: 'earliest' | 'price' | 'proximity';
  filterIndoorOnly: boolean;
  filterLightsOnly: boolean;
  maxPrice: number;
}
