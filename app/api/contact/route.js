import { NextResponse } from 'next/server';
import { CONTACT, SITE } from '@/src/config/site';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, model_interest } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    // In production with Resend/SendGrid, you would forward the message.
    // For default Web3Forms / client-side workflow, acknowledge receipt.
    return NextResponse.json({
      success: true,
      message: 'Inquiry received by Queensland sales desk.',
      details: { name, email, phone, model_interest },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
