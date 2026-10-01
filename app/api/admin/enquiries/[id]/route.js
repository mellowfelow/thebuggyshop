import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, deleteEnquiry, markEnquiryReplied } from '@/lib/enquiryStore';

export async function GET(request, { params }) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  const { id } = await params;
  const enquiry = await getEnquiry(id);

  if (!enquiry) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ enquiry });
}

export async function DELETE(request, { params }) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  const { id } = await params;
  const success = await deleteEnquiry(id);

  if (!success) {
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request, { params }) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();

  if (body.action === 'mark_replied') {
    const updated = await markEnquiryReplied(id, body.replyText);
    return NextResponse.json({ success: true, enquiry: updated });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
