import { NextRequest, NextResponse } from 'next/server';
import { runAllScrapers } from '@/lib/scrapers';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const targetDate = dateParam || new Date().toISOString().split('T')[0];

    const result = await runAllScrapers(targetDate);

    return NextResponse.json({
      success: true,
      message: `Scraped live court availability for ${targetDate}`,
      summary: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to execute court scrapers',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const targetDate = body.date || new Date().toISOString().split('T')[0];

    const result = await runAllScrapers(targetDate);

    return NextResponse.json({
      success: true,
      message: `Scraped live court availability for ${targetDate}`,
      summary: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to execute court scrapers',
      },
      { status: 500 }
    );
  }
}
