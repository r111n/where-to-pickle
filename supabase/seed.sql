-- Seed Venues
insert into venues (id, name, slug, description, address, barangay, city, latitude, longitude, phone, messenger_url, website_url, booking_url, cover_image_url, amenities)
values
  (
    'a1111111-1111-1111-1111-111111111111',
    'Praxevilla Sports Club',
    'praxevilla-sports-club',
    'Premier outdoor and covered sports club in Dumaguete featuring synthetic mat and cushioned courts with LED night lighting.',
    'Praxevilla Subd., Mangnao-Canal',
    'Mangnao',
    'Dumaguete City',
    9.2945,
    123.2980,
    '+63 917 123 4567',
    'https://m.me/praxevillasports',
    'https://facebook.com/praxevillasports',
    'https://setmore.com/praxevillasports',
    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
    array['parking', 'lights', 'rental_gear', 'canteen', 'shower']
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    'Riverside Badminton & Pickleball Hall',
    'riverside-badminton-pickleball-hall',
    'Full indoor air-cooled facility with tournament-grade Olympic mats, pro paddle rentals, and locker rooms.',
    'E.J. Blanco Drive, Bantayan',
    'Bantayan',
    'Dumaguete City',
    9.3242,
    123.3055,
    '+63 928 987 6543',
    'https://m.me/riversidecourtshub',
    'https://facebook.com/riversidecourtshub',
    'https://riverside.setmore.com',
    'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=1200&q=80',
    array['aircon', 'parking', 'shower', 'rental_gear', 'pro_shop']
  ),
  (
    'a3333333-3333-3333-3333-333333333333',
    'Valencia Highlands Sports Park',
    'valencia-highlands-sports-park',
    'Enjoy cool mountain breeze while playing pickleball and tennis. Covered pavilion with panoramic views of Mt. Talinis.',
    'Poblacion North, Valencia Road',
    'Poblacion',
    'Valencia',
    9.2825,
    123.2450,
    '+63 939 555 1212',
    'https://m.me/valenciahighlandscourts',
    'https://facebook.com/valenciahighlands',
    'https://valenciasports.ph/book',
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    array['parking', 'lights', 'cafe', 'mountain_view', 'open_play']
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    'Sibulan Coastal Arena',
    'sibulan-coastal-arena',
    'Just 5 minutes north of Dumaguete Airport. Multi-sport courts right by the sea with cool breeze and high-lumen floodlights.',
    'National Highway, Poblacion',
    'Poblacion',
    'Sibulan',
    9.3580,
    123.2870,
    '+63 906 444 8899',
    'https://m.me/sibulancoastalsports',
    'https://facebook.com/sibulancoastal',
    'https://sibulancourts.setmore.com',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    array['parking', 'lights', 'sea_breeze', 'refreshments']
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    'Silliman Multi-Purpose Covered Courts',
    'silliman-multi-purpose-covered-courts',
    'Central Dumaguete downtown location. Covered all-weather basketball and multi-sport courts with hardwood and acrylic surfacing.',
    'Aldecoa Drive, Piapi',
    'Piapi',
    'Dumaguete City',
    9.3140,
    123.3070,
    '+63 915 222 3344',
    'https://m.me/sillimansportscenter',
    'https://facebook.com/sillimansports',
    'https://su.edu.ph/athletics/courts',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    array['parking', 'lights', 'bleachers', 'locker_room']
  )
on conflict (id) do nothing;

-- Seed Courts
insert into courts (id, venue_id, name, sport_type, surface, is_indoor, has_lighting, rate_per_hour, currency, status)
values
  -- Praxevilla Courts
  ('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Court 1 (Pickleball Premier)', 'pickleball', 'synthetic_mat', false, true, 200.00, 'PHP', 'active'),
  ('b1111111-1111-1111-1111-111111111112', 'a1111111-1111-1111-1111-111111111111', 'Court 2 (Pickleball Cushioned)', 'pickleball', 'acrylic', false, true, 200.00, 'PHP', 'active'),
  ('b1111111-1111-1111-1111-111111111113', 'a1111111-1111-1111-1111-111111111111', 'Tennis Main Court', 'tennis', 'acrylic', false, true, 300.00, 'PHP', 'active'),
  
  -- Riverside Bantayan
  ('b2222222-2222-2222-2222-222222222221', 'a2222222-2222-2222-2222-222222222222', 'Indoor Hall Court A (Pickleball)', 'pickleball', 'synthetic_mat', true, true, 250.00, 'PHP', 'active'),
  ('b2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Indoor Hall Court B (Badminton)', 'badminton', 'synthetic_mat', true, true, 250.00, 'PHP', 'active'),
  ('b2222222-2222-2222-2222-222222222223', 'a2222222-2222-2222-2222-222222222222', 'Indoor Hall Court C (Badminton)', 'badminton', 'synthetic_mat', true, true, 250.00, 'PHP', 'active'),

  -- Valencia Highlands
  ('b3333333-3333-3333-3333-333333333331', 'a3333333-3333-3333-3333-333333333333', 'Mountain View Pickleball 1', 'pickleball', 'concrete', false, true, 180.00, 'PHP', 'active'),
  ('b3333333-3333-3333-3333-333333333332', 'a3333333-3333-3333-3333-333333333333', 'Mountain View Tennis 1', 'tennis', 'acrylic', false, true, 280.00, 'PHP', 'active'),

  -- Sibulan Coastal
  ('b4444444-4444-4444-4444-444444444441', 'a4444444-4444-4444-4444-444444444442', 'Breeze Court 1 (Pickleball)', 'pickleball', 'synthetic_mat', false, true, 220.00, 'PHP', 'active'),
  ('b4444444-4444-4444-4444-444444444442', 'a4444444-4444-4444-4444-444444444442', 'Coastal Basketball Half-Court', 'basketball', 'concrete', false, true, 150.00, 'PHP', 'active'),

  -- Silliman
  ('b5555555-5555-5555-5555-555555555551', 'a5555555-5555-5555-5555-555555555555', 'Piapi Covered Basketball Court', 'basketball', 'wood', true, true, 350.00, 'PHP', 'active'),
  ('b5555555-5555-5555-5555-555555555552', 'a5555555-5555-5555-5555-555555555555', 'Piapi Badminton Court 1', 'badminton', 'wood', true, true, 220.00, 'PHP', 'active')
on conflict (id) do nothing;

-- Generate slots for today and next 7 days
do $$
declare
  court_rec record;
  d date;
  curr_date date := current_date;
  slot_time time;
  slot_end time;
  slot_stat text;
  rnd float;
begin
  for court_rec in select id from courts loop
    for d in select generate_series(curr_date, curr_date + interval '7 days', interval '1 day')::date loop
      -- Hours: 06:00 to 22:00
      for h in 6..21 loop
        slot_time := make_time(h, 0, 0);
        slot_end := make_time(h + 1, 0, 0);
        
        rnd := random();
        if h between 17 and 20 then
          -- Peak hours have higher booked probability
          if rnd < 0.45 then
            slot_stat := 'available';
          else
            slot_stat := 'booked';
          end if;
        else
          if rnd < 0.75 then
            slot_stat := 'available';
          else
            slot_stat := 'booked';
          end if;
        end if;

        insert into court_slots (court_id, slot_date, start_time, end_time, status, source)
        values (court_rec.id, d, slot_time, slot_end, slot_stat, 'partner_sync')
        on conflict (court_id, slot_date, start_time, end_time) do nothing;
      end loop;
    end loop;
  end loop;
end $$;
