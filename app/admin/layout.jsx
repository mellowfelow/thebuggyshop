'use client';
import { AdminPasscodeProvider } from '@/src/components/admin/AdminPasscodeContext';
import PasscodeGate from '@/src/components/admin/PasscodeGate';
import AdminNav from '@/src/components/admin/AdminNav';

export default function AdminLayout({ children }) {
  return (
    <AdminPasscodeProvider>
      <PasscodeGate>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
          <AdminNav />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </PasscodeGate>
    </AdminPasscodeProvider>
  );
}
