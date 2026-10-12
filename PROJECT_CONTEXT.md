# Project Context: Where to Pickle (Dumaguete Court Aggregator)

## 1. Executive Summary & Product Vision
**Where to Pickle** is an availability aggregator and discovery engine for sports courts (pickleball, badminton, tennis, and basketball) in **Dumaguete City and surrounding Negros Oriental areas**.

Modeled after flight aggregation platforms like **Trip.com**, **Skyscanner**, and **Google Flights**, the platform eliminates the frustration of checking multiple venue websites, Facebook pages, or Messenger chats to find an open court. Users simply input their **preferred date, time slot, and sport**, and the platform instantly scans and displays all available courts across affiliated venues in real time.

---

## 2. Core Problem & Market Opportunity
- **Fragmented Availability**: In Dumaguete, court bookings are scattered across different platforms—some use Setmore, others use Google Forms/Sheets, many post weekly photo schedules on Facebook, and others rely purely on SMS/Messenger.
- **High Friction for Players**: Organizers waste 15–30 minutes messaging 3–5 different court owners just to find one open hour (especially during peak hours: 5:00 PM – 10:00 PM on weekdays and weekend mornings).
- **Underutilized Non-Peak Slots**: Courts frequently have open slots that go unfilled simply because players don't know they are free.
- **The Solution**: A unified "Search & Compare" engine that ingests posted availability data, indexes open time slots, and connects players directly to the court's booking system or management.

---

## 3. Product Benchmark: The "Trip.com / Skyscanner" Experience
Just like searching for a flight on Trip.com:

| Trip.com Flight Search | Where to Pickle Court Aggregator |
| :--- | :--- |
| **Origin & Destination** | **Sport & Location/Zone** (e.g. *Pickleball in Dumaguete / Bantayan / Valencia*) |
| **Departure Date & Return** | **Date & Duration** (e.g. *Today, Tomorrow, Oct 15 / 1 hr, 2 hrs*) |
| **Time Window Filter** | **Time Slot Filters** (e.g. *Morning 6-11 AM, Afternoon 1-5 PM, Evening 5-10 PM, or exact 7:00 PM*) |
| **Airline & Cabin Class** | **Venue, Court Specs & Amenities** (*Indoor, A/C, Synthetic Mat, Night Lights, Paddle Rental*) |
| **Price Comparison** | **Hourly Rate Comparison** (*PHP 150/hr vs PHP 300/hr*) |
| **"Book on Airline Site"** | **Direct Deep-Link Booking** (*Redirect to venue Setmore/Calendly/Website or 1-Click Messenger pre-filled inquiry*) |
| **Price / Seat Alerts** | **Availability Alerts** (*"Notify me if a 6-8 PM slot opens up on Friday at Riverside"*) |

---

## 4. Key User Personas
1. **The Casual Player**: Wants to play this evening after work (6:00 PM) with friends and needs to know within 10 seconds which court in Dumaguete has an open slot right now.
2. **The Tournament / Weekend Organizer**: Plans a Saturday 3-hour session (8:00 AM - 11:00 AM) and needs to compare rates, court surfaces, and multi-court availability.
3. **The Court Owner / Venue Manager**: Wants higher court occupancy with zero booking conflict overhead and simple schedule sync.

---

## 5. System Architecture & Tech Stack

### 5.1 Technology Stack
- **Frontend Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling & UI**: Tailwind CSS (Dark/Light mode, modern glassmorphism, responsive mobile-first)
- **Icons & Animation**: Lucide React, Framer Motion
- **Backend & Database**: Supabase (PostgreSQL with RLS, Supabase Auth, Storage)
- **Scraping & Ingestion**: Next.js API Routes / Supabase Edge Functions / Scheduled Cron (Scheduled sync workers)
- **State Management**: Zustand / React Server Components + URL Search Params (shareable search URLs like Trip.com: `?sport=pickleball&date=2026-10-15&time=18:00&duration=2`)

### 5.2 High-Level Architecture Diagram
```
[ Court-Affiliated Data Sources ]
  ├── Setmore / SimplyBook Webhooks & Embed APIs
  ├── Public Google Sheets / Forms booking feeds
  ├── Venue Websites & Public Booking Calendars
  └── Direct Partner Schedule Management (Admin Portal)
               │
               ▼
[ Ingestion & Normalization Worker (Cron / Edge) ]
  ├── Ingest raw schedule data
  ├── Normalize time intervals (e.g. 60-min slots: 06:00-07:00, 07:00-08:00)
  ├── Compute slot status: 'available' | 'booked' | 'maintenance' | 'tentative'
  └── Cache & upsert into Supabase PostgreSQL
               │
               ▼
[ Supabase PostgreSQL ]
  ├── venues (Location, amenities, contacts, deep-links)
  ├── courts (Surfaces, specs, rates, indoor/outdoor)
  └── court_slots (Date, start_time, end_time, status, source)
               │
               ▼
[ Next.js 16 Aggregator Frontend (Trip.com UX) ]
  ├── Global Search Bar (Sport, Date, Time, Area)
  ├── Real-time Availability Matrix & Timeline View
  ├── Filter Drawer (Rates, Indoor/Outdoor, Lighting)
  └── 1-Click Deep Booking Outbound Link / Messenger CTA
```

---

## 6. Data Ingestion & Sync Strategy
Dumaguete venues operate with differing levels of technical infrastructure. The system uses a **tri-tier ingestion model**:

1. **Tier 1: Direct Web Scraping & API Ingestion (Automated)**
   - Scrapes public booking calendars (e.g. Setmore widget endpoints, Google Calendar public iCal/JSON feeds, venue booking forms).
   - Frequency: Polled every 15–30 minutes during active booking hours.
2. **Tier 2: Partner Portal / Google Sheets Two-Way Sync (Semi-Automated)**
   - For venues using a shared Google Sheet or calendar for reservations: direct Google Sheets API sync.
   - Court managers can update availability directly via a mobile-optimized 1-tap toggle portal.
3. **Tier 3: Social & Community Verification (Fallback)**
   - Many Dumaguete courts post weekly schedules on their Facebook pages on Sundays.
   - Moderator schedule input tool or user crowdsourced "Slot verified 1 hour ago" reporting.

---

## 7. Database Schema (Supabase)

```sql
-- 1. Venues Table
create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  address text not null,
  barangay text,
  city text default 'Dumaguete City',
  province text default 'Negros Oriental',
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  phone text,
  messenger_url text,
  website_url text,
  booking_url text,
  cover_image_url text,
  amenities text[], -- e.g. ['parking', 'shower', 'lights', 'paddle_rental', 'water_station', 'aircon']
  created_at timestamptz default now()
);

-- 2. Courts Table
create table courts (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  name text not null, -- e.g. 'Court 1 (Indoor)', 'Center Court'
  sport_type text not null, -- 'pickleball', 'badminton', 'tennis', 'basketball'
  surface text, -- 'wood', 'acrylic', 'synthetic_mat', 'concrete'
  is_indoor boolean default false,
  has_lighting boolean default true,
  rate_per_hour numeric(10, 2) not null,
  currency text default 'PHP',
  status text default 'active',
  created_at timestamptz default now()
);

-- 3. Court Slots (Availability Ledger)
create table court_slots (
  id uuid primary key default gen_random_uuid(),
  court_id uuid references courts(id) on delete cascade,
  slot_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null check (status in ('available', 'booked', 'maintenance', 'pending')),
  source text default 'scraped', -- 'scraped', 'partner_sync', 'manual'
  external_booking_id text,
  last_verified_at timestamptz default now(),
  created_at timestamptz default now(),
  unique (court_id, slot_date, start_time, end_time)
);

-- 4. Scraper / Data Sources Config
create table data_sources (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  source_type text not null, -- 'setmore', 'google_calendar', 'html_scraper', 'google_sheets'
  config jsonb not null, -- URLs, selectors, feed IDs
  sync_frequency_minutes int default 30,
  last_synced_at timestamptz,
  sync_status text default 'idle',
  error_log text,
  is_active boolean default true
);

-- 5. User Slot Alerts (Optional / Retention)
create table slot_alerts (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  sport_type text not null,
  target_date date not null,
  preferred_start_time time,
  preferred_end_time time,
  venue_id uuid references venues(id) on delete cascade,
  is_triggered boolean default false,
  created_at timestamptz default now()
);
```

---

## 8. UX & Functional Feature Roadmap

### Phase 1: Core Search & Availability Engine (MVP)
- **Trip.com Style Search Header**:
  - Sport Selector: Pickleball, Badminton, Tennis, Basketball
  - Date Picker: Quick pills ("Today", "Tomorrow", "This Weekend", Custom Calendar)
  - Time Range Slider / Buttons: "Morning (6 AM - 12 PM)", "Afternoon (12 PM - 5 PM)", "Evening (5 PM - 10 PM)", or Exact Hour selector
- **Aggregated Results List**:
  - Filterable by price, distance, surface, indoor/outdoor
  - Clear visual badge: **Available**, **1 Slot Left**, **Booked**
  - Instant pricing in PHP
- **Venue & Court Card**:
  - Court name, photo, location badge in Dumaguete (e.g. Bantayan, Piapi, Daro)
  - Interactive hour pills showing exactly which hours are free (e.g. [5PM ✅] [6PM ❌] [7PM ✅] [8PM ✅])
  - Outbound Action CTA: Direct link to venue booking URL or 1-tap Facebook Messenger inquiry with pre-formatted inquiry text:
    `"Hi [Venue Name]! Inquiring via WhereToPickle: Is [Court Name] available on [Date] at [Time]?"`

### Phase 2: Timeline Matrix View & Smart Sync
- **Day Matrix View (Flight Seat/Schedule Grid)**:
  - Horizontal timeline table showing all courts on the Y-axis and hours (6 AM to 10 PM) on the X-axis for rapid visual comparison.
- **Automated Data Scraping Workers**:
  - Setmore / public schedule crawler for Dumaguete venues.
  - Periodic background sync via Supabase Edge Functions or GitHub Actions Cron.

### Phase 3: Community & Venue Partner Ecosystem
- **Venue Claiming & Self-Service Portal**: Court owners can directly log in, verify availability, and update rates or promotions.
- **Community "Court Status" Ping**: Players can report court conditions (e.g., wet court due to rain, maintenance, lights working).
- **Slot Availability Notifications**: Web push / email alerts when high-demand peak slots open up.

---

## 9. Initial Dumaguete Target Venues Reference
- **Pickleball & Multi-Sport**:
  - Dumaguete Pickleball Courts (Bantayan / Piapi / Daro hubs)
  - Praxevilla Tennis & Pickleball Courts
  - Lamberto Macias Sports Complex / Capitol Gym
  - Valencia Sports Complex (high-demand cooler weather courts)
  - Sibulan Municipal Covered Courts & private badminton halls
  - Local School & University Courts (Silliman Gym, Foundation University, St. Paul)
