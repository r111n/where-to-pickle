# Where to Pickle — Dumaguete Court Search Aggregator
*The "Trip.com / Skyscanner" for Sports Court Availability in Dumaguete City*

---

## 1. Problem Statement & Mission
In **Dumaguete City and neighboring areas** (Valencia, Sibulan, Bacong), recreational sports—particularly **pickleball, badminton, tennis, and basketball**—are experiencing a massive boom. However, booking a court is painful:

1. **Scattered Information**: Courts announce availability across separate Facebook pages, private Messenger threads, Google Sheets, or third-party booking widgets (like Setmore).
2. **Time Friction**: Players waste 20–30 minutes messaging multiple court managers just to locate a single open slot for today at 6:00 PM.
3. **Mismatched Demand**: Peak slots (5:00 PM – 9:00 PM) are intensely competitive, while off-peak or recently canceled slots go unfilled.

### The Mission
Build a **unified availability search engine** inspired by **Trip.com / Google Flights**:
> Users select **Sport**, **Date**, and **Time Window**, and the platform instantly queries, aggregates, and compares all open courts across Dumaguete, complete with rates, specs, and instant booking/inquiry deep-links.

---

## 2. Product Experience: Trip.com Metaphor Applied to Courts

- **Unified Search Bar**: Sport selector (Pickleball, Badminton, Tennis, Basketball), Date Picker, Time Window (Morning, Afternoon, Evening/Peak, Night), Location/Barangay.
- **Aggregated Court Cards**: Shows open time slots as interactive chips, venue badges, amenities (synthetic mat, lights, indoor/outdoor), and hourly rate.
- **1-Click Deep Links**: Direct venue booking or pre-formatted Facebook Messenger inquiry text:
  *"Hi [Venue Name]! Inquiring via WhereToPickle: Is [Court Name] free on [Date] at [Time]?"*

---

## 3. Data Aggregation Architecture
1. **Tier 1 — Automated Web / Embed Scrapers**: Setmore, Google Calendar, web forms.
2. **Tier 2 — Venue Partner & Google Sheets Sync**: Two-way sync with Google Sheets & mobile manager toggle.
3. **Tier 3 — Outbound Deep Linking**: Direct checkout links or prefilled Messenger inquiry dialogs.

---

## 4. Supabase Schema
Tables:
- `venues`: Venue metadata, coordinates, contact URLs, amenities.
- `courts`: Specific courts per venue, surface type, indoor/outdoor, rates.
- `court_slots`: Real-time availability ledger per date and time range.

---

## 5. Technology Stack
- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Repository**: git@github-personal:r111n/where-to-pickle.git
