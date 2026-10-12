import { scrapeCourtAccess } from './court-access';
import { scrapeDinky } from './dinky';
import { scrapeACourts } from './a-courts';
import { scrapePlayTimeScheduler } from './playtimescheduler';
import { PlatformScrapeReport, ScrapedSlotData, SyncEngineSummary } from './types';
import { createClient } from '../supabase/client';

export async function runAllScrapers(targetDate: string): Promise<SyncEngineSummary> {
  const timestamp = new Date().toISOString();

  // Run all platform adapters in parallel
  const [caReports, dinkyReports, acReports, ptsReports] = await Promise.all([
    scrapeCourtAccess(targetDate),
    scrapeDinky(targetDate),
    scrapeACourts(targetDate),
    scrapePlayTimeScheduler(targetDate),
  ]);

  const allReports: PlatformScrapeReport[] = [
    ...caReports,
    ...dinkyReports,
    ...acReports,
    ...ptsReports,
  ];

  let totalSlotsIngested = 0;
  let totalAvailableSlots = 0;
  const allSlots: ScrapedSlotData[] = [];

  for (const report of allReports) {
    if (report.success && report.slots) {
      totalSlotsIngested += report.slots.length;
      totalAvailableSlots += report.availableCount;
      allSlots.push(...report.slots);
    }
  }

  // Attempt to persist to Supabase court_slots table
  let persistedToSupabase = false;
  try {
    const supabase = createClient();
    const rows = allSlots.map((s) => ({
      court_id: s.courtId,
      slot_date: s.slotDate,
      start_time: s.startTime,
      end_time: s.endTime,
      status: s.status,
      source: 'scraped',
      last_verified_at: timestamp,
    }));

    if (rows.length > 0) {
      const { error } = await supabase
        .from('court_slots')
        .upsert(rows, { onConflict: 'court_id,slot_date,start_time,end_time' });

      if (!error) {
        persistedToSupabase = true;
      }
    }
  } catch {
    persistedToSupabase = false;
  }

  return {
    date: targetDate,
    timestamp,
    totalPlatforms: 4,
    totalSlotsIngested,
    totalAvailableSlots,
    reports: allReports,
    persistedToSupabase,
  };
}
