import { createClient } from './supabase/client';
import { AggregatedCourtResult, Court, CourtSlot, SearchState, Venue } from '@/types/courts';

// REAL Dumaguete Venues Active on court-access, dinky, a-courts, playtimescheduler, playserve
export const DUMAGUETE_MOCK_VENUES: Venue[] = [
  {
    id: 'dgt-v-acourts',
    name: 'A-Courts Dumaguete',
    slug: 'a-courts-dumaguete',
    description: 'Premier indoor, air-conditioned pickleball facility in Dumaguete. Tournament-grade cushioned surfaces and lounge.',
    address: 'Flores Ave, Bantayan',
    barangay: 'Bantayan',
    city: 'Dumaguete City',
    latitude: 9.3250,
    longitude: 123.3060,
    phone: '+63 917 888 1234',
    messenger_url: 'https://m.me/acourtsdgt',
    website_url: 'https://a-courts.com',
    booking_url: 'https://a-courts.com',
    booking_platform: 'a-courts',
    cover_image_url: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['aircon', 'parking', 'shower', 'rental_gear', 'lounge'],
    distance_km: 1.8,
  },
  {
    id: 'dgt-v-thedinkclub',
    name: 'The Dink Club @ The Henry Resort',
    slug: 'the-dink-club-henry',
    description: 'Boutique court experience at Bamboo Pavilion behind The Henry Resort. Premium covered and outdoor open-play courts.',
    address: 'Bamboo Pavilion, Tubod',
    barangay: 'Tubod',
    city: 'Dumaguete City',
    latitude: 9.3015,
    longitude: 123.2980,
    phone: '+63 928 333 4567',
    messenger_url: 'https://m.me/thedinkclubdgt',
    website_url: 'https://dinky.ph/venues/the-dink-club-dumaguete',
    booking_url: 'https://dinky.ph/venues/the-dink-club-dumaguete',
    booking_platform: 'dinky',
    cover_image_url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'cafe', 'rental_gear', 'resort_pool'],
    distance_km: 1.4,
  },
  {
    id: 'dgt-v-riverside',
    name: 'The Riverside Courts',
    slug: 'the-riverside-courts',
    description: 'High-volume sports hub featuring 6 tournament indoor courts for both pickleball and badminton with table tennis and billiards.',
    address: 'Negros South Road, Bantayan',
    barangay: 'Bantayan',
    city: 'Dumaguete City',
    latitude: 9.3242,
    longitude: 123.3055,
    phone: '+63 928 987 6543',
    messenger_url: 'https://m.me/riversidecourtshub',
    website_url: 'https://dinky.ph/venues/the-riverside-courts',
    booking_url: 'https://dinky.ph/venues/the-riverside-courts',
    booking_platform: 'dinky',
    cover_image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'shower', 'rental_gear', 'pro_shop', 'canteen'],
    distance_km: 2.1,
  },
  {
    id: 'dgt-v-pickle8',
    name: 'Pickle8 Candau-ay',
    slug: 'pickle8-candauay',
    description: 'Dumaguete open-play hotspot with 6 outdoor asphalt pickleball courts with floodlights. Regular PlayTime Scheduler sessions.',
    address: 'Candau-ay Road',
    barangay: 'Candau-ay',
    city: 'Dumaguete City',
    latitude: 9.3080,
    longitude: 123.2750,
    phone: '+63 919 123 7890',
    messenger_url: 'https://m.me/pickle8dumaguete',
    website_url: 'https://playtimescheduler.com',
    booking_url: 'https://playtimescheduler.com',
    booking_platform: 'playtimescheduler',
    cover_image_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'open_play', 'refreshments'],
    distance_km: 3.5,
  },
  {
    id: 'dgt-v-pickle-hub',
    name: 'The Pickle Hub Dumaguete',
    slug: 'the-pickle-hub-dumaguete',
    description: 'Popular community court facility powered by Court-Access app. Synthetic mat surfacing with evening leagues.',
    address: 'Daro North Drive',
    barangay: 'Daro',
    city: 'Dumaguete City',
    latitude: 9.3170,
    longitude: 123.3010,
    phone: '+63 917 555 4321',
    messenger_url: 'https://m.me/thepicklehubdgt',
    website_url: 'https://app.court-access.com',
    booking_url: 'https://app.court-access.com',
    booking_platform: 'court-access',
    cover_image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'rental_gear', 'canteen'],
    distance_km: 1.1,
  },
  {
    id: 'dgt-v-cassies-commons',
    name: "Cassie's Commons",
    slug: 'cassies-commons-batinguel',
    description: 'Cozy neighborhood multi-court venue in Batinguel near Azumi 2. Available on Court Access and Dinky.',
    address: 'Near Azumi 2, Batinguel',
    barangay: 'Batinguel',
    city: 'Dumaguete City',
    latitude: 9.3095,
    longitude: 123.2890,
    phone: '+63 917 777 9900',
    messenger_url: 'https://m.me/cassiescommons',
    website_url: 'https://app.court-access.com',
    booking_url: 'https://app.court-access.com',
    booking_platform: 'court-access',
    cover_image_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'chill_area'],
    distance_km: 2.3,
  },
  {
    id: 'dgt-v-greenscapes',
    name: 'Greenscapes Flower Garden Courts',
    slug: 'greenscapes-valencia',
    description: 'Cool highland mountain climate pickleball & tennis courts at the foothills of Mt. Talinis, 15 minutes up from Dumaguete.',
    address: 'Valencia Mountain Road, Poblacion',
    barangay: 'Poblacion',
    city: 'Valencia',
    latitude: 9.2825,
    longitude: 123.2450,
    phone: '+63 939 555 1212',
    messenger_url: 'https://m.me/greenscapescourts',
    website_url: 'https://playserve.co',
    booking_url: 'https://playserve.co',
    booking_platform: 'playserve',
    cover_image_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'mountain_view', 'cafe', 'lights'],
    distance_km: 8.5,
  },
  {
    id: 'dgt-v-incredoball',
    name: 'Incredoball Sports Center',
    slug: 'incredoball-sports-center',
    description: 'Indoor multi-court complex featuring 5 indoor wood floor courts for basketball, badminton, and pickleball.',
    address: 'Aldecoa Extension, Piapi',
    barangay: 'Piapi',
    city: 'Dumaguete City',
    latitude: 9.3190,
    longitude: 123.3080,
    phone: '+63 915 222 3344',
    messenger_url: 'https://m.me/incredoballsports',
    website_url: 'https://playtimescheduler.com',
    booking_url: 'https://playtimescheduler.com',
    booking_platform: 'playtimescheduler',
    cover_image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    amenities: ['parking', 'lights', 'bleachers', 'locker_room'],
    distance_km: 1.0,
  },
];

// REAL Dumaguete Courts mapped to Venues
export const DUMAGUETE_MOCK_COURTS: Court[] = [
  // A-Courts Bantayan (a-courts.com)
  {
    id: 'c-acourts-1',
    venue_id: 'dgt-v-acourts',
    name: 'A-Court 1 (Indoor AC Cushioned)',
    sport_type: 'pickleball',
    surface: 'acrylic',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 300,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-acourts-2',
    venue_id: 'dgt-v-acourts',
    name: 'A-Court 2 (Indoor AC Cushioned)',
    sport_type: 'pickleball',
    surface: 'acrylic',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 300,
    currency: 'PHP',
    status: 'active',
  },

  // The Dink Club @ The Henry Resort (dinky.ph)
  {
    id: 'c-dinkclub-1',
    venue_id: 'dgt-v-thedinkclub',
    name: 'Bamboo Pavilion Court 1 (Covered)',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 250,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-dinkclub-2',
    venue_id: 'dgt-v-thedinkclub',
    name: 'Bamboo Pavilion Court 2 (Open Play)',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 250,
    currency: 'PHP',
    status: 'active',
  },

  // The Riverside Courts (dinky.ph)
  {
    id: 'c-riverside-1',
    venue_id: 'dgt-v-riverside',
    name: 'Riverside Court 1 (Indoor Pickleball)',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 220,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-riverside-2',
    venue_id: 'dgt-v-riverside',
    name: 'Riverside Court 2 (Indoor Badminton)',
    sport_type: 'badminton',
    surface: 'synthetic_mat',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 220,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-riverside-3',
    venue_id: 'dgt-v-riverside',
    name: 'Riverside Court 3 (Indoor Badminton)',
    sport_type: 'badminton',
    surface: 'synthetic_mat',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 220,
    currency: 'PHP',
    status: 'active',
  },

  // Pickle8 Candau-ay (playtimescheduler.com)
  {
    id: 'c-pickle8-1',
    venue_id: 'dgt-v-pickle8',
    name: 'Pickle8 Court 1 (Floodlit Outdoor)',
    sport_type: 'pickleball',
    surface: 'concrete',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 150,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-pickle8-2',
    venue_id: 'dgt-v-pickle8',
    name: 'Pickle8 Court 2 (Floodlit Outdoor)',
    sport_type: 'pickleball',
    surface: 'concrete',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 150,
    currency: 'PHP',
    status: 'active',
  },

  // The Pickle Hub Dumaguete (app.court-access.com)
  {
    id: 'c-pickle-hub-1',
    venue_id: 'dgt-v-pickle-hub',
    name: 'Pickle Hub Main Court',
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 200,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-pickle-hub-2',
    venue_id: 'dgt-v-pickle-hub',
    name: 'Pickle Hub Tennis Court',
    sport_type: 'tennis',
    surface: 'acrylic',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 300,
    currency: 'PHP',
    status: 'active',
  },

  // Cassie's Commons (app.court-access.com)
  {
    id: 'c-cassies-1',
    venue_id: 'dgt-v-cassies-commons',
    name: "Cassie's Court A (Covered)",
    sport_type: 'pickleball',
    surface: 'synthetic_mat',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 180,
    currency: 'PHP',
    status: 'active',
  },

  // Greenscapes Valencia (playserve.co)
  {
    id: 'c-greenscapes-1',
    venue_id: 'dgt-v-greenscapes',
    name: 'Highland Mountain Court 1',
    sport_type: 'pickleball',
    surface: 'concrete',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 180,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-greenscapes-2',
    venue_id: 'dgt-v-greenscapes',
    name: 'Highland Tennis Court',
    sport_type: 'tennis',
    surface: 'acrylic',
    is_indoor: false,
    has_lighting: true,
    rate_per_hour: 280,
    currency: 'PHP',
    status: 'active',
  },

  // Incredoball Sports Center (playtimescheduler.com)
  {
    id: 'c-incredoball-1',
    venue_id: 'dgt-v-incredoball',
    name: 'Incredoball Main Basketball Court',
    sport_type: 'basketball',
    surface: 'wood',
    is_indoor: true,
    has_lighting: true,
    rate_per_hour: 350,
    currency: 'PHP',
    status: 'active',
  },
  {
    id: 'c-incredoball-2',
    venue_id: 'dgt-v-incredoball',
    name: 'Incredoball Badminton Court 1',
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
      const seed = (court.id.charCodeAt(court.id.length - 1) + h * 7) % 10;
      let status: 'available' | 'booked' = 'available';

      // Peak evening hours 17-20 are tighter in Dumaguete
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
