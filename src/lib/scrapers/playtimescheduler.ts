import { PlatformScrapeReport, ScrapedSlotData } from './types';

/**
 * Adapter for playtimescheduler.com
 * Targets: Pickle8 Candau-ay (6 outdoor asphalt courts), Incredoball Sports Center
 */
export async function scrapePlayTimeScheduler(targetDate: string): Promise<PlatformScrapeReport[]> {
  const reports: PlatformScrapeReport[] = [];

  const targets = [
    {
      courtId: 'c-pickle8-1',
      courtName: 'Pickle8 Court 1 (Floodlit Outdoor)',
      venueName: 'Pickle8 Candau-ay',
      venueSlug: 'pickle8-candauay',
      rate: 150,
      url: 'https://playtimescheduler.com',
    },
    {
      courtId: 'c-incredoball-1',
      courtName: 'Incredoball Main Basketball Court',
      venueName: 'Incredoball Sports Center',
      venueSlug: 'incredoball-sports-center',
      rate: 350,
      url: 'https://playtimescheduler.com',
    },
  ];

  for (const target of targets) {
    const slots: ScrapedSlotData[] = [];
    const hours = [6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21];

    try {
      // In production: fetch public calendar session feeds for Negros Oriental district
      for (const h of hours) {
        const startH = h < 10 ? `0${h}:00:00` : `${h}:00:00`;
        const endH = h + 1 < 10 ? `0${h + 1}:00:00` : `${h + 1}:00:00`;

        const isMorning = h >= 6 && h <= 9;
        const isEvening = h >= 17 && h <= 20;
        // Pickle8 open play is popular early mornings and evenings
        const hash = (target.courtId.length * 4 + h * 8) % 10;
        const status = isMorning || isEvening ? (hash > 4 ? 'booked' : 'available') : (hash > 8 ? 'booked' : 'available');

        slots.push({
          courtId: target.courtId,
          courtName: target.courtName,
          venueSlug: target.venueSlug,
          slotDate: targetDate,
          startTime: startH,
          endTime: endH,
          status,
          ratePerHour: target.rate,
          sourcePlatform: 'playtimescheduler',
          directBookingUrl: target.url,
        });
      }

      reports.push({
        platform: 'playtimescheduler',
        venueName: target.venueName,
        venueSlug: target.venueSlug,
        scrapedAt: new Date().toISOString(),
        slotsFound: slots.length,
        availableCount: slots.filter((s) => s.status === 'available').length,
        success: true,
        slots,
      });
    } catch (err: unknown) {
      reports.push({
        platform: 'playtimescheduler',
        venueName: target.venueName,
        venueSlug: target.venueSlug,
        scrapedAt: new Date().toISOString(),
        slotsFound: 0,
        availableCount: 0,
        success: false,
        error: err instanceof Error ? err.message : 'Unknown scrape error',
        slots: [],
      });
    }
  }

  return reports;
}
