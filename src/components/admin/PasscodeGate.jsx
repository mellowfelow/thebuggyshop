'use client';
import { useState, useEffect } from 'react';
import { Lock, ShieldAlert, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { useAdminPasscode } from './AdminPasscodeContext';
import { SITE } from '@/src/config/core';

export default function PasscodeGate({ children }) {
  const { passcode, setPasscode, isLoaded } = useAdminPasscode();
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  // Validate stored passcode on mount
  useEffect(() => {
    if (!isLoaded) return;

    if (passcode) {
      verifyPasscode(passcode);
    } else {
      setIsValidated(false);
    }
  }, [isLoaded, passcode]);

  const verifyPasscode = async (codeToTest) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/orders/', {
        headers: {
          'x-admin-passcode': codeToTest,
        },
      });

      if (res.status === 200) {
        setPasscode(codeToTest);
        setIsValidated(true);
      } else if (res.status === 503) {
        setErrorMsg('ADMIN_PASSCODE is not set in environment variables. Please set ADMIN_PASSCODE in Vercel / server env vars.');
        setIsValidated(false);
      } else if (res.status === 401) {
        setErrorMsg('Incorrect administrator passcode. Please try again.');
        setIsValidated(false);
      } else {
        setErrorMsg(`Authentication check returned status ${res.status}`);
        setIsValidated(false);
      }
    } catch (err) {
      setErrorMsg('Failed to connect to authentication server.');
      setIsValidated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    await verifyPasscode(inputCode.trim());
  };

  if (!isLoaded || (passcode && loading && !isValidated)) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mb-3" />
        <p className="text-sm text-slate-400 font-medium">Verifying administrator session...</p>
      </div>
    );
  }

  if (isValidated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="w-16 h-16 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C5A880] shadow-lg">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
          {SITE.name} Reply Portal
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Enter your administrator passcode to access orders, payment composition, and customer enquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="passcode" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Passcode
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input
                  id="passcode"
                  type="password"
                  required
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] sm:text-sm font-mono transition-colors"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMsg}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-[#C5A880]/40 rounded-xl shadow-md text-sm font-bold text-slate-950 bg-[#C5A880] hover:bg-[#D4B27C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A880] disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Passcode is validated server-side and never exposed in client bundles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
