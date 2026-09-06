import React from 'react';
import Link from 'next/link';
import { SITE, POSTS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Golf Buggy Insights & Technical Guides | The Buggy Shop Australia',
  description: 'Technical advice, lithium battery maintenance, golf buggy accessories, and road registration guides for Australian golf buggy buyers.',
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
  openGraph: {
    title: 'Golf Buggy Insights & Technical Guides | The Buggy Shop',
    description: 'Technical advice, lithium battery guides, and golf buggy accessories for Australian owners.',
    url: `https://${SITE.domain}/blog/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function BlogIndexPage() {
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
        "name": "Insights & Guides",
        "item": `https://${SITE.domain}/blog/`
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
          <span className="text-[#0E2A1E] font-bold">Insights & Technical Guides</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D5DFD9] pb-6">
          <div className="space-y-1 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
              Australian Golf Buggy Guides & Technical Insights
            </h1>
            <p className="text-sm text-[#4A5D53]">
              Practical advice on battery chemistry, state transport conditional compliance, remote control golf buggies, and golf buggy accessories.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <article 
            key={post.slug}
            className="bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border-2 border-[#D5DFD9] overflow-hidden shadow-[0_4px_20px_-4px_rgba(14,42,30,0.06)] hover:shadow-[0_20px_45px_-8px_rgba(197,162,101,0.35),0_10px_20px_-6px_rgba(14,42,30,0.2)] hover:border-[#C5A265] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 flex flex-col group"
          >
            <div className="product-frame relative overflow-hidden bg-[#F0F3F1] border-b border-[#D5DFD9] group-hover:border-[#E5D2A8] transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#C5A265] tracking-wider shadow-sm">
                {post.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-[11px] text-[#4A5D53]">
                  <span className="flex items-center gap-1 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-[#8A7045]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#8A7045]" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}/`}>
                  <h2 className="font-black text-lg text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors leading-snug line-clamp-2 font-serif">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] line-clamp-3 leading-relaxed font-normal transition-colors">
                  {post.excerpt}
                </p>
              </div>

              <Link
                href={`/blog/${post.slug}/`}
                className="text-xs font-black text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors inline-flex items-center justify-between pt-3 border-t border-[#D5DFD9] group-hover:border-[#E5D2A8] uppercase tracking-wider"
              >
                <span>Read Full Technical Guide</span>
                <span className="w-6 h-6 rounded-full bg-[#EBF1ED] group-hover:bg-[#C5A265] group-hover:text-[#0E2A1E] flex items-center justify-center transition-all font-black">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
