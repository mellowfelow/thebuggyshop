'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus, Save, RotateCcw, AlertCircle, CheckCircle2, Megaphone, RefreshCw } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import { ANNOUNCEMENT_LIMITS } from '@/src/config/announcements';

const newId = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

export default function AdminAnnouncementsPage() {
  const { passcode } = useAdminPasscode();
  const [slides, setSlides] = useState([]);
  const [seconds, setSeconds] = useState(5);
  const [source, setSource] = useState('default');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState(null); // {type:'ok'|'err', text}

  const headers = { 'x-admin-passcode': passcode, 'Content-Type': 'application/json' };

  const load = useCallback(async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/announcements/', { headers: { 'x-admin-passcode': passcode }, cache: 'no-store' });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Could not load.');
      setSlides(j.slides);
      setSeconds(j.seconds);
      setSource(j.source);
      setDirty(false);
    } catch (e) {
      setMsg({ type: 'err', text: e.message });
    } finally {
      setLoading(false);
    }
  }, [passcode]);

  useEffect(() => { if (passcode) load(); }, [passcode, load]);

  const edit = (fn) => { setSlides((s) => fn([...s])); setDirty(true); setMsg(null); };
  const update = (i, patch) => edit((s) => { s[i] = { ...s[i], ...patch }; return s; });
  const move = (i, d) => edit((s) => { const j = i + d; if (j < 0 || j >= s.length) return s; [s[i], s[j]] = [s[j], s[i]]; return s; });
  const remove = (i) => edit((s) => { s.splice(i, 1); return s; });
  const add = () => edit((s) => { if (s.length < ANNOUNCEMENT_LIMITS.maxSlides) s.push({ id: newId(), text: '', href: '', active: true }); return s; });

  const save = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/announcements/', { method: 'PUT', headers, body: JSON.stringify({ seconds, slides }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Could not save.');
      setSlides(j.slides);
      setSeconds(j.seconds);
      setSource('saved');
      setDirty(false);
      setMsg({ type: 'ok', text: 'Saved. The bar on the website updates within about a minute.' });
    } catch (e) {
      setMsg({ type: 'err', text: e.message });
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!window.confirm('Reset the announcement bar to the original messages? Your edits will be lost.')) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/announcements/', { method: 'DELETE', headers });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Could not reset.');
      setSlides(j.slides);
      setSeconds(j.seconds);
      setSource('default');
      setDirty(false);
      setMsg({ type: 'ok', text: 'Reset to the original messages.' });
    } catch (e) {
      setMsg({ type: 'err', text: e.message });
    } finally {
      setSaving(false);
    }
  };

  const activeCount = slides.filter((s) => s.active).length;
  const inputCls = 'w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50';

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#C5A880]" /> Announcement bar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            The slider at the top of every page. Messages rotate automatically in the order below.
            {source === 'default' && ' Showing the original messages until you save a change.'}
          </p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg cursor-pointer">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Reload
        </button>
      </div>

      {msg && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2.5 border ${msg.type === 'ok' ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300' : 'bg-rose-950/50 border-rose-800 text-rose-300'}`} role="status">
          {msg.type === 'ok' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{msg.text}</span>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : (
        <>
          <ul className="space-y-3">
            {slides.map((s, i) => (
              <li key={s.id} className={`rounded-xl border p-3.5 space-y-3 ${s.active ? 'bg-slate-900 border-slate-800' : 'bg-slate-900/40 border-slate-800/60 opacity-70'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#C5A880]">Message {i + 1}</span>
                  <div className="flex items-center gap-1">
                    <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 mr-2 cursor-pointer">
                      <input type="checkbox" checked={s.active} onChange={(e) => update(i, { active: e.target.checked })} className="accent-[#C5A880] w-4 h-4" />
                      Show
                    </label>
                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move message ${i + 1} up`} className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"><ArrowUp className="w-4 h-4" /></button>
                    <button type="button" onClick={() => move(i, 1)} disabled={i === slides.length - 1} aria-label={`Move message ${i + 1} down`} className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"><ArrowDown className="w-4 h-4" /></button>
                    <button type="button" onClick={() => remove(i)} aria-label={`Delete message ${i + 1}`} className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/50 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <label htmlFor={`t-${s.id}`} className="block text-[11px] font-bold text-slate-400 mb-1">Message</label>
                  <input id={`t-${s.id}`} className={inputCls} value={s.text} maxLength={ANNOUNCEMENT_LIMITS.maxTextLength} onChange={(e) => update(i, { text: e.target.value })} placeholder="e.g. Free freight on all lithium batteries this month" />
                  <div className="text-[10px] text-slate-500 mt-1 text-right">{s.text.length}/{ANNOUNCEMENT_LIMITS.maxTextLength}</div>
                </div>
                <div>
                  <label htmlFor={`h-${s.id}`} className="block text-[11px] font-bold text-slate-400 mb-1">Link (optional)</label>
                  <input id={`h-${s.id}`} className={inputCls} value={s.href} onChange={(e) => update(i, { href: e.target.value })} placeholder="/shop/batteries/  or  https://..." />
                </div>
              </li>
            ))}
          </ul>

          <button type="button" onClick={add} disabled={slides.length >= ANNOUNCEMENT_LIMITS.maxSlides} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-200 text-sm font-semibold hover:border-[#C5A880] hover:text-[#C5A880] disabled:opacity-40 cursor-pointer">
            <Plus className="w-4 h-4" /> Add message {slides.length >= ANNOUNCEMENT_LIMITS.maxSlides && `(max ${ANNOUNCEMENT_LIMITS.maxSlides})`}
          </button>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
            <label htmlFor="secs" className="block text-xs font-bold text-slate-300 mb-2">Seconds each message is shown: <span className="text-[#C5A880]">{seconds}</span></label>
            <input id="secs" type="range" min={ANNOUNCEMENT_LIMITS.minSeconds} max={ANNOUNCEMENT_LIMITS.maxSeconds} value={seconds} onChange={(e) => { setSeconds(Number(e.target.value)); setDirty(true); }} className="w-full accent-[#C5A880]" />
          </div>

          {activeCount === 0 && (
            <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800 rounded-lg p-3">No message is switched on, so the website will fall back to the original messages. Tick “Show” on at least one.</p>
          )}

          <div className="flex flex-wrap items-center gap-3 sticky bottom-3 bg-slate-950/90 backdrop-blur rounded-xl border border-slate-800 p-3">
            <button type="button" onClick={save} disabled={saving || !dirty} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A880] text-slate-950 text-sm font-black disabled:opacity-40 cursor-pointer">
              <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button type="button" onClick={reset} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-800 cursor-pointer">
              <RotateCcw className="w-4 h-4" /> Reset to original
            </button>
            {dirty && <span className="text-xs text-amber-300">Unsaved changes</span>}
          </div>
        </>
      )}
    </div>
  );
}
