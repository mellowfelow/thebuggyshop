import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getAnnouncements, saveAnnouncements, resetAnnouncements } from '@/lib/announcementStore';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;
  return NextResponse.json(await getAnnouncements());
}

export async function PUT(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const saved = await saveAnnouncements(body);
    return NextResponse.json({ ...saved, source: 'saved' });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Could not save.' }, { status: 400 });
  }
}

export async function DELETE(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;
  const data = await resetAnnouncements();
  return NextResponse.json({ ...data, source: 'default' });
}
