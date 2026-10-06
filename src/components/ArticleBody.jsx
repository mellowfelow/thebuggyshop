// src/components/ArticleBody.jsx
// Small, safe markdown renderer for blog posts (no raw HTML, no dependencies).
// Supports: ## and ### headings, paragraphs, - lists, 1. lists, > callouts, | tables |, **bold**, [links](/path/).
// Tables sit in a horizontal scroller so they never widen the page on a phone.
import React from 'react';
import Link from 'next/link';

export const slugify = (s) => String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** H2 headings of a post, for the table of contents. */
export function headingsOf(md) {
  return String(md || '').split('\n').filter((l) => l.startsWith('## ')).map((l) => ({ text: l.slice(3).trim(), id: slugify(l.slice(3)) }));
}

function Inline({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return /^https?:\/\//i.test(href)
        ? <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#8A7045] underline underline-offset-2 hover:text-[#0E2A1E]">{label}</a>
        : <Link key={i} href={href} className="font-semibold text-[#8A7045] underline underline-offset-2 hover:text-[#0E2A1E]">{label}</Link>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

export default function ArticleBody({ content }) {
  const lines = String(content || '').replace(/\r/g, '').split('\n');
  const out = [];
  let i = 0; let k = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      out.push(<h2 key={k++} id={slugify(text)} className="text-2xl sm:text-3xl font-black text-[#0E2A1E] pt-6 font-serif scroll-mt-28">{text}</h2>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      out.push(<h3 key={k++} className="text-lg sm:text-xl font-black text-[#0E2A1E] pt-2 font-serif">{line.slice(4).trim()}</h3>);
      i++; continue;
    }
    if (line.trim().startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i]); i++; }
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      out.push(
        <div key={k++} className="overflow-x-auto rounded-2xl border border-[#D5DFD9] bg-white shadow-xs">
          <table className="w-full min-w-[34rem] text-left text-xs sm:text-sm">
            <thead className="bg-[#0E2A1E] text-[#E7D3AE]">
              <tr>{head.map((h, j) => <th key={j} scope="col" className="px-3 py-2.5 font-black uppercase tracking-wider text-[10px] sm:text-xs whitespace-nowrap"><Inline text={h} /></th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className={ri % 2 ? 'bg-[#FAF8F5]' : 'bg-white'}>
                  {r.map((c, ci) => <td key={ci} className="px-3 py-2.5 align-top text-[#1E3A2B]"><Inline text={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) { items.push(lines[i].slice(2)); i++; }
      out.push(<ul key={k++} className="list-disc pl-5 space-y-2 text-[#2A4D3B]">{items.map((t, j) => <li key={j}><Inline text={t} /></li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, '')); i++; }
      out.push(<ol key={k++} className="list-decimal pl-5 space-y-2 text-[#2A4D3B]">{items.map((t, j) => <li key={j}><Inline text={t} /></li>)}</ol>);
      continue;
    }
    if (line.startsWith('> ')) {
      const q = [];
      while (i < lines.length && lines[i].startsWith('> ')) { q.push(lines[i].slice(2)); i++; }
      out.push(<aside key={k++} className="rounded-2xl border border-[#E8DDC4] bg-[#FAF8F5] px-5 py-4 text-sm text-[#1E3A2B] leading-relaxed"><Inline text={q.join(' ')} /></aside>);
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |\||- |\d+\. |> )/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    out.push(<p key={k++}><Inline text={para.join(' ')} /></p>);
  }
  return <div className="space-y-5 text-[15px] sm:text-base leading-relaxed text-[#12241D]">{out}</div>;
}
