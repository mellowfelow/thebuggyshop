import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '@/lib/enquiryStore';
import { sendMail } from '@/lib/mailer';
import { enquiryReplyEmail } from '@/utils/emailTemplates';
import { CONTACT, FORMS } from '@/src/config/site';

export async function POST(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { enquiryId, replyMessage } = body;

    if (!enquiryId || !replyMessage) {
      return NextResponse.json(
        { error: 'Enquiry ID and reply message are required.' },
        { status: 400 }
      );
    }

    const enquiry = await getEnquiry(enquiryId);
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    if (!enquiry.email) {
      return NextResponse.json({ error: 'Enquiry does not have an email address.' }, { status: 400 });
    }

    // 1. Send Email to Enquirer
    const adminFrom = process.env.CONTACT_EMAIL || FORMS.destinations?.contact || CONTACT.email;
    const sendResult = await sendMail({
      to: enquiry.email,
      subject: `Re: ${enquiry.subject || 'Your Enquiry to The Buggy Shop'}`,
      html: enquiryReplyEmail(enquiry, replyMessage),
      replyTo: adminFrom,
    });

    // 2. Mark enquiry as replied in store
    const updated = await markEnquiryReplied(enquiryId, replyMessage);

    return NextResponse.json({
      success: true,
      emailSent: sendResult.sent,
      reason: sendResult.reason || null,
      enquiry: updated,
      message: sendResult.sent
        ? 'Reply email sent successfully.'
        : 'Reply recorded, but email could not be sent (SMTP not configured).',
    });
  } catch (err) {
    console.error('[api/admin/reply-enquiry] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to send reply' },
      { status: 500 }
    );
  }
}
