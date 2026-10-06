import { NextResponse } from 'next/server';
import { getAnnouncements } from '@/lib/announcementStore';

// Public, read-only: the storefront bar reads this after it loads.
export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getAnnouncements();
  return NextResponse.json(
    { seconds: data.seconds, slides: data.slides.filter((s) => s.active) },
    { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' } }
  );
}
