import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|fonts/|api/).*)'],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const accept = request.headers.get('accept') || '';

  // Check if client explicitly prioritizes Markdown over HTML using q-values
  if (prefersMarkdownOverHtml(accept) && isEligiblePath(url.pathname)) {
    // Rewrite or respond with plain text / llms.txt context
    const response = NextResponse.next();
    response.headers.set('X-Agent-Markdown-Negotiation', 'supported');
    return response;
  }

  return NextResponse.next();
}

function isEligiblePath(pathname) {
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return false;
  }
  return true;
}

function prefersMarkdownOverHtml(accept) {
  let mdQ = -1;
  let htmlQ = -1;

  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }

  return mdQ > -1 && mdQ > htmlQ;
}
