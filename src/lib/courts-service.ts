import { createClient } from './supabase/client';
import { AggregatedCourtResult, Court, CourtSlot, SearchState, Venue } from '@/types/courts';

// Dumaguete Mock Database for instant prototyping & fallback
export const DUMAGUETE_MOCK_VENUES: Venue[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Praxevilla Sports Club',
    slug: 'praxevilla-sports-club',
    description: 'Premier sports destination in Dumaguete featuring synthetic mat & cushioned pickleball courts with floodlights for evening games.',
    address: 'Praxevilla Subd., Mangnao-Canal',
    barangay: 'Mangnao',
    city: 'Dumaguete City',
    latitude: 9.2945,
    longitude: 123.2980,
    phone: '+63 917 123 4567',
    messenger_url: 'https://m.me/praxevillasports',
    website_url: 'https://facebook.com/praxevillasports',
    booking_url: 'https://setmore.com/praxevillasports',
    cover_image_url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'rental_gear', 'canteen', 'shower'],
    distance_km: 1.2,
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    name: 'Riverside Badminton & Pickleball Hall',
    slug: 'riverside-badminton-pickleball-hall',
    description: 'Top-tier indoor air-cooled facility with tournament-grade Olympic mats, pro paddle rentals, and locker rooms.',
    address: 'E.J. Blanco Drive, Bantayan',
    barangay: 'Bantayan',
    city: 'Dumaguete City',
    latitude: 9.3242,
    longitude: 123.3055,
    phone: '+63 928 987 6543',
    messenger_url: 'https://m.me/riversidecourtshub',
    website_url: 'https://facebook.com/riversidecourtshub',
    booking_url: 'https://riverside.setmore.com',
    cover_image_url: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['aircon', 'parking', 'shower', 'rental_gear', 'pro_shop'],
    distance_km: 2.1,
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    name: 'Valencia Highlands Sports Park',
    slug: 'valencia-highlands-sports-park',
    description: 'Play with a fresh cool mountain breeze at the foothills of Mt. Talinis. Covered courts with open-play communities.',
    address: 'Poblacion North, Valencia Road',
    barangay: 'Poblacion',
    city: 'Valencia',
    latitude: 9.2825,
    longitude: 123.2450,
    phone: '+63 939 555 1212',
    messenger_url: 'https://m.me/valenciahighlandscourts',
    website_url: 'https://facebook.com/valenciahighlands',
    booking_url: 'https://valenciasports.ph/book',
    cover_image_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'cafe', 'mountain_view', 'open_play'],
    distance_km: 8.5,
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    name: 'Sibulan Coastal Arena',
    slug: 'sibulan-coastal-arena',
    description: '5 minutes from Dumaguete Airport. Sea-breeze outdoor and covered courts with LED lighting and spectator area.',
    address: 'National Highway, Poblacion',
    barangay: 'Poblacion',
    city: 'Sibulan',
    latitude: 9.3580,
    longitude: 123.2870,
    phone: '+63 906 444 8899',
    messenger_url: 'https://m.me/sibulancoastalsports',
    website_url: 'https://facebook.com/sibulancoastal',
    booking_url: 'https://sibulancourts.setmore.com',
    cover_image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'sea_breeze', 'refreshments'],
    distance_km: 5.4,
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    name: 'Silliman Multi-Purpose Covered Courts',
    slug: 'silliman-multi-purpose-covered-courts',
    description: 'Centrally located downtown along Piapi. All-weather covered court complex popular for basketball and community badminton.',
    address: 'Aldecoa Drive, Piapi',
    barangay: 'Piapi',
    city: 'Dumaguete City',
    latitude: 9.3140,
    longitude: 123.3070,
    phone: '+63 915 222 3344',
    messenger_url: 'https://m.me/sillimansportscenter',
    website_url: 'https://facebook.com/sillimansports',
    booking_url: 'https://su.edu.ph/athletics/courts',
    cover_image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'bleachers', 'locker_room'],
    distance_km: 0.8,
  },
];

export const DUMAGUETE_MOCK_COURTS: Court[] = [
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    venue_id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Court 1 (Pickleball Premier)',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 200,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b1111111-1111-1111-1111-111111111112',
    venue_id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Court 2 (Pickleball Cushioned)',
    sport_type: 'pickleball',
    surface: 'acrylic',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 200,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b1111111-1111-1111-1111-111111111113',
    venue_id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Tennis Court A (Night Lights)',
    sport_type: 'tennis',
    surface: 'acrylic',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 300,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b2222222-2222-2222-2222-222222222221',
    venue_id: 'a2222222-2222-2222-2222-222222222222',
    name: 'Indoor Hall Court A (Pickleball)',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 250,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    venue_id: 'a2222222-2222-2222-2222-222222222222',
    name: 'Indoor Hall Court B (Badminton)',
    sport_type: 'badminton',
    surface: 'synthetic_mat',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 250,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b3333333-3333-3333-3333-333333333331',
    venue_id: 'a3333333-3333-3333-3333-333333333333',
    name: 'Mountain View Pickleball 1',
    sport_type: 'pickleball',
    surface: 'concrete',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 180,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b3333333-3333-3333-3333-333333333332',
    venue_id: 'a3333333-3333-3333-3333-333333333333',
    name: 'Mountain View Tennis 1',
    sport_type: 'tennis',
    surface: 'acrylic',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 280,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b4444444-4444-4444-4444-444444444441',
    venue_id: 'a4444444-4444-4444-4444-444444444444',
    name: 'Coastal Breeze Pickleball Court',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 220,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b4444444-4444-4444-4444-444444444442',
    venue_id: 'a4444444-4444-4444-4444-444444444444',
    name: 'Coastal Basketball Half-Court',
    sport_type: 'basketball',
    surface: 'concrete',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 160,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b5555555-5555-5555-5555-555555555551',
    venue_id: 'a5555555-5555-5555-5555-555555555555',
    name: 'Piapi Covered Basketball Court',
    sport_type: 'basketball',
    surface: 'wood',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 350,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'b5555555-5555-5555-5555-555555555552',
    venue_id: 'a5555555-5555-5555-5555-555555555555',
    name: 'Piapi Badminton Court 1',
    sport_type: 'badminton',
    surface: 'wood',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 220,
    currency: 'PHP',
    status: 'active',
  },
];

// Helper to generate dynamic realistic slots for any target date
export function generateMockSlotsForDate(dateStr: string): CourtSlot[] {
  const slots: CourtSlot[] = [];
  const hours = [6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21];

  for (const court of DUMAGUETE_MOCK_COURTS) {
    for (const h of hours) {
      const startH = h < 10 ? `0${h}:00:00` : `${h}:00:00`;
      const endH = h + 1 < 10 ? `0${h + 1}:00:00` : `${h + 1}:00:00`;

      // Deterministic availability based on court id + hour
      const seed = (court.id.charCodeAt(1) + h * 7) % 10;
      let status: 'available' | 'booked' = 'available';

      // Peak evening hours 17-20 are tighter
      if (h >= 17 && h <= 20) {
        status = seed > 4 ? 'booked' : 'available';
      } else {
        status = seed > 7 ? 'booked' : 'available';
      }

      slots.push({
        id: `slot-${court.id}-${h}`,
        court_id: court.id,
        slot_date: dateStr,
        start_time: startH,
        end_time: endH,
        status,
        source: 'partner_sync',
        last_verified_at: new Date().toISOString(),
      });
    }
  }
  return slots;
}

// Format time string (06:00:00 -> 6:00 AM)
export function formatTime12h(timeStr: string): string {
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${ampm}`;
}

export function formatTimeSlotRange(start: string, end: string): string {
  return `${formatTime12h(start)} - ${formatTime12h(end)}`;
}

// Preformatted Messenger Inquiry Link Generator
export function getMessengerInquiryUrl(venue: Venue, court: Court, slotDate: string, startTime: string): string {
  const dateFormatted = new Date(slotDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const timeFormatted = formatTime12h(startTime);
  const text = `Hi ${venue.name}! Inquiring via WhereToPickle: Is ${court.name} free on ${dateFormatted} at ${timeFormatted}?`;
  
  if (venue.messenger_url) {
    return `${venue.messenger_url}?text=${encodeURIComponent(text)}`;
  }
  return `https://m.me/where2pickle?text=${encodeURIComponent(text)}`;
}

export function getInquiryText(venue: Venue, court: Court, slotDate: string, startTime: string): string {
  const dateFormatted = new Date(slotDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const timeFormatted = formatTime12h(startTime);
  return `Hi ${venue.name}! Inquiring via WhereToPickle: Is ${court.name} free on ${dateFormatted} at ${timeFormatted}?`;
}

// Match time window filter
function isTimeInWindow(startTime: string, window: SearchState['timeWindow']): boolean {
  if (window === 'all') return true;
  const hour = parseInt(startTime.split(':')[0], 10);
  switch (window) {
    case 'morning':
      return hour >= 6 && hour < 12;
    case 'afternoon':
      return hour >= 12 && hour < 17;
    case 'evening':
      return hour >= 17 && hour < 21;
    case 'night':
      return hour >= 21 && hour < 24;
    default:
      return true;
  }
}

// Main Search & Aggregator Query
export async function searchCourts(filters: SearchState): Promise<{
  results: AggregatedCourtResult[];
  totalCourts: number;
  totalOpenSlots: number;
  isLiveSupabase: boolean;
}> {
  let venues: Venue[] = DUMAGUETE_MOCK_VENUES;
  let courts: Court[] = DUMAGUETE_MOCK_COURTS;
  let allSlots: CourtSlot[] = [];
  let isLiveSupabase = false;

  try {
    const supabase = createClient();
    const { data: dbVenues, error: vErr } = await supabase.from('venues').select('*');
    const { data: dbCourts, error: cErr } = await supabase.from('courts').select('*');
    const { data: dbSlots, error: sErr } = await supabase
      .from('court_slots')
      .select('*')
      .eq('slot_date', filters.date);

    if (!vErr && dbVenues && dbVenues.length > 0 && !cErr && dbCourts && dbCourts.length > 0) {
      venues = dbVenues as Venue[];
      courts = dbCourts as Court[];
      if (!sErr && dbSlots && dbSlots.length > 0) {
        allSlots = dbSlots as CourtSlot[];
      } else {
        allSlots = generateMockSlotsForDate(filters.date);
      }
      isLiveSupabase = true;
    } else {
      allSlots = generateMockSlotsForDate(filters.date);
    }
  } catch {
    allSlots = generateMockSlotsForDate(filters.date);
  }

  // 1. Filter courts by sport type
  let matchedCourts = courts.filter((c) => c.sport_type === filters.sport);

  // 2. Filter indoor / lights / price
  if (filters.filterIndoorOnly) {
    matchedCourts = matchedCourts.filter((c) => c.is_indoor);
  }
  if (filters.filterLightsOnly) {
    matchedCourts = matchedCourts.filter((c) => c.has_lighting);
  }
  if (filters.maxPrice) {
    matchedCourts = matchedCourts.filter((c) => Number(c.rate_per_hour) <= filters.maxPrice);
  }

  const venueMap = new Map<string, Venue>();
  venues.forEach((v) => venueMap.set(v.id, v));

  // 3. Match locations if specified
  if (filters.location && filters.location !== 'all') {
    matchedCourts = matchedCourts.filter((c) => {
      const v = venueMap.get(c.venue_id);
      if (!v) return false;
      const term = filters.location.toLowerCase();
      return (
        v.city.toLowerCase().includes(term) ||
        (v.barangay && v.barangay.toLowerCase().includes(term)) ||
        v.address.toLowerCase().includes(term)
      );
    });
  }

  // 4. Aggregate slots for each court
  const aggregated: AggregatedCourtResult[] = [];
  let totalOpenSlots = 0;

  for (const court of matchedCourts) {
    const venue = venueMap.get(court.venue_id);
    if (!venue) continue;

    // Filter slots for this court
    const courtSlots = allSlots
      .filter((s) => s.court_id === court.id)
      .filter((s) => isTimeInWindow(s.start_time, filters.timeWindow))
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

    const availableSlots = courtSlots.filter((s) => s.status === 'available');
    totalOpenSlots += availableSlots.length;

    aggregated.push({
      court,
      venue,
      slots: courtSlots,
      availableCount: availableSlots.length,
      earliestSlot: availableSlots.length > 0 ? availableSlots[0] : null,
    });
  }

  // 5. Sort results
  aggregated.sort((a, b) => {
    // Courts with available slots first
    if (a.availableCount > 0 && b.availableCount === 0) return -1;
    if (a.availableCount === 0 && b.availableCount > 0) return 1;

    if (filters.sortBy === 'earliest') {
      if (a.earliestSlot && b.earliestSlot) {
        return a.earliestSlot.start_time.localeCompare(b.earliestSlot.start_time);
      }
      return b.availableCount - a.availableCount;
    }

    if (filters.sortBy === 'price') {
      return Number(a.court.rate_per_hour) - Number(b.court.rate_per_hour);
    }

    if (filters.sortBy === 'proximity') {
      const distA = a.venue.distance_km ?? 99;
      const distB = b.venue.distance_km ?? 99;
      return distA - distB;
    }

    return 0;
  });

  return {
    results: aggregated,
    totalCourts: aggregated.length,
    totalOpenSlots,
    isLiveSupabase,
  };
}
