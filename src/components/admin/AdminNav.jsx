'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Mail, Megaphone, LogOut, ArrowLeft, Shield } from 'lucide-react';
import { useAdminPasscode } from './AdminPasscodeContext';
import { SITE, REPLY } from '@/src/config/core';

export default function AdminNav() {
  const pathname = usePathname();
  const { clearPasscode } = useAdminPasscode();

  const links = [
    { href: '/admin/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/orders/', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/enquiries/', label: 'Enquiries', icon: Mail },
    { href: '/admin/announcements/', label: 'Announcements', icon: Megaphone },
  ];

  const isActive = (link) => {
    if (link.exact) {
      return pathname === link.href;
    }
    return pathname.startsWith(link.href);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white tracking-wide">{SITE.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30">
                  Reply Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">Order Dispatch &amp; Enquiry Management</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(link);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-slate-800 text-[#C5A880] font-semibold shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#C5A880]' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: View Store & Sign Out */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>

            <button
              type="button"
              onClick={clearPasscode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/50 rounded-lg transition-colors border border-rose-900/50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

        {/* Mobile Subnav */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800">
          {links.map((link) => {
            const active = isActive(link);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  active
                    ? 'bg-slate-800 text-[#C5A880] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </header>
  );
}
