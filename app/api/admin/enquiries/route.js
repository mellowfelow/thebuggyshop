import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listEnquiries } from '@/lib/enquiryStore';

export async function GET(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  try {
    const enquiries = await listEnquiries();
    return NextResponse.json({ enquiries });
  } catch (err) {
    console.error('[api/admin/enquiries] Error listing enquiries:', err);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}
