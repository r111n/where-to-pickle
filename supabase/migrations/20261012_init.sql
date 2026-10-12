-- 1. Venues Table
create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  address text not null,
  barangay text,
  city text default 'Dumaguete City',
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  phone text,
  messenger_url text,
  website_url text,
  booking_url text,
  cover_image_url text,
  amenities text[], -- e.g. ['parking', 'shower', 'lights', 'rental_gear', 'aircon']
  created_at timestamptz default now()
);

-- 2. Courts Table
create table if not exists courts (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  name text not null, -- e.g. 'Court 1', 'Main Indoor Court'
  sport_type text not null, -- 'pickleball', 'badminton', 'tennis', 'basketball'
  surface text, -- 'wood', 'acrylic', 'synthetic_mat', 'concrete'
  is_indoor boolean default false,
  has_lighting boolean default true,
  rate_per_hour numeric(10, 2) not null,
  currency text default 'PHP',
  status text default 'active',
  created_at timestamptz default now()
);

-- 3. Real-time Availability Ledger Table
create table if not exists court_slots (
  id uuid primary key default gen_random_uuid(),
  court_id uuid references courts(id) on delete cascade,
  slot_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null check (status in ('available', 'booked', 'maintenance', 'pending')),
  source text default 'scraped', -- 'scraped', 'partner_sync', 'manual'
  last_verified_at timestamptz default now(),
  created_at timestamptz default now(),
  unique (court_id, slot_date, start_time, end_time)
);

-- 4. Fast Search Indexes
create index if not exists idx_court_slots_date_status on court_slots(slot_date, status, start_time);
create index if not exists idx_courts_sport on courts(sport_type);
create index if not exists idx_courts_venue_id on courts(venue_id);
create index if not exists idx_venues_barangay on venues(barangay);

-- 5. Row Level Security Policies (Public Read)
alter table venues enable row level security;
alter table courts enable row level security;
alter table court_slots enable row level security;

create policy "Allow public read on venues" on venues for select using (true);
create policy "Allow public read on courts" on courts for select using (true);
create policy "Allow public read on court_slots" on court_slots for select using (true);
