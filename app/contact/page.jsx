import React from 'react';
import Link from 'next/link';
import { SITE, CONTACT, FORMS, SHOP } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Truck, 
  FileCheck2, 
  Zap 
} from 'lucide-react';
import ContactFormClient from './ContactFormClient';

export const metadata = {
  title: 'Contact Queensland Golf Buggy Sales & Quotes | The Buggy Shop',
  description: 'Connect with The Buggy Shop Queensland for golf buggy for sale availability, tail-lift freight quotes, commercial invoices, and conditional road registration guidance.',
  alternates: {
    canonical: `https://${SITE.domain}/contact/`,
  },
  openGraph: {
    title: 'Contact Queensland Golf Buggy Sales & Quotes | The Buggy Shop',
    description: 'Connect with The Buggy Shop for golf buggies for sale and freight quotes across Australia.',
    url: `https://${SITE.domain}/contact/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://${SITE.domain}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `https://${SITE.domain}/contact/`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-3">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">Contact Sales Desk</span>
        </nav>

        <div className="space-y-2 border-b border-[#D5DFD9] pb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Queensland Golf Buggy Sales & Technical Workshop Desk
          </h1>
          <p className="text-sm text-[#4A5D53] max-w-2xl leading-relaxed">
            Get in touch for stock availability, tail-lift freight estimates to your property or club, commercial finance invoices, or state registration assistance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
        {/* Left Column: Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Action Card */}
          <div className="p-6 bg-gradient-to-br from-[#25D366]/15 via-[#25D366]/10 to-transparent border border-[#25D366]/40 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-[#0B1E13] flex items-center justify-center font-black shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0E2A1E] font-serif">Instant WhatsApp Priority</h3>
                <span className="text-xs text-[#3A5244] font-medium">Average response under 15 minutes</span>
              </div>
            </div>

            <p className="text-xs text-[#1E382B] leading-relaxed font-medium">
              Connect directly with our Queensland buggy specialists for stock checks, video walkarounds, and instant freight quotes.
            </p>

            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                "G'day! I would like to inquire about golf buggies for sale and freight options."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#071810] font-black text-xs uppercase tracking-wider block text-center transition-all shadow-md active:scale-[0.98]"
            >
              Start WhatsApp Conversation ({CONTACT.phoneDisplay})
            </a>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 sm:p-7 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-3xl border border-[#D5DFD9] shadow-md space-y-5">
            <h3 className="font-black text-xs uppercase tracking-widest text-[#8A7045]">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs text-[#0E2A1E]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8A7045] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0E2A1E]">Telephone Desk:</strong>
                  <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} className="text-[#0E2A1E] hover:underline font-bold">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8A7045] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0E2A1E]">Email Sales & Quotes:</strong>
                  <span className="text-[#4A5D53]">
                    info&#64;{SITE.domain.toLowerCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8A7045] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0E2A1E]">Queensland Headquarters:</strong>
                  <span className="text-[#4A5D53]">{CONTACT.hq}, Australia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8A7045] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0E2A1E]">Trading Hours:</strong>
                  <span className="text-[#4A5D53]">Mon - Fri: 7:30am - 5:30pm AEST</span>
                  <span className="block text-[#4A5D53]">Saturday: 8:30am - 2:00pm AEST</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D5DFD9] text-xs text-[#4A5D53] space-y-1">
              <div className="font-black text-[#0E2A1E]">Accepted Australian Settlement:</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 bg-white border border-[#D5DFD9] rounded-lg font-medium text-[#0E2A1E] shadow-2xs">Australian PayID</span>
                <span className="px-2.5 py-1 bg-white border border-[#D5DFD9] rounded-lg font-medium text-[#0E2A1E] shadow-2xs">Bank Transfer (EFT)</span>
                <span className="px-2.5 py-1 bg-white border border-[#D5DFD9] rounded-lg font-medium text-[#0E2A1E] shadow-2xs">Commercial Invoice</span>
                <span className="px-2.5 py-1 bg-[#0E2A1E] text-[#C5A265] border border-[#C5A265]/40 rounded-lg font-bold shadow-2xs">10% Bitcoin / USDT Rebate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Web3Forms CORS Form */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-3xl p-6 sm:p-10 border border-[#D5DFD9] shadow-md space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">
              Submit an Online Golf Buggy Quote Inquiry
            </h2>
            <p className="text-xs text-[#4A5D53]">
              Fill in your details below and our Queensland sales desk will respond within 4 business hours with vehicle specs and freight availability.
            </p>
          </div>

          <ContactFormClient web3formsKey={FORMS.web3formsKey} />
        </div>
      </div>
    </div>
  );
}
