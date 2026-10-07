import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, MessageCircle, RefreshCw } from 'lucide-react';
import { SITE, POSTS, CONTACT } from '@/src/config/site';
import { FAQ_BANK } from '@/src/config/faq';
import JsonLd from '@/src/components/JsonLd';
import FaqSection from '@/src/components/FaqSection';
import ArticleBody, { headingsOf } from '@/src/components/ArticleBody';
import { seoTitle, seoDesc, absUrl } from '@/lib/seo';

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

const when = (iso) => new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };
  const url = `https://${SITE.domain}/blog/${post.slug}/`;
  return {
    title: { absolute: seoTitle(post.titleTag || post.title) },
    description: seoDesc(post.metaDescription || post.excerpt),
    alternates: { canonical: url },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, url, images: [{ url: absUrl(post.image) }], publishedTime: post.date, modifiedTime: post.updated },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = `https://${SITE.domain}/blog/${post.slug}/`;
  const toc = post.toc ? headingsOf(post.content) : [];
  const faqs = (post.faqIds || []).map((id) => FAQ_BANK.find((f) => f.id === id)).filter(Boolean);
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [absUrl(post.image)],
        datePublished: post.date,
        dateModified: post.updated,
        wordCount: post.words,
        author: { '@type': 'Organization', name: SITE.name, url: `https://${SITE.domain}/` },
        publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `https://${SITE.domain}/images/logo.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `https://${SITE.domain}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={blogSchema} />

      <nav className="text-xs text-[#4A5D53] flex flex-wrap items-center gap-1.5 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
        <span>/</span>
        <Link href="/blog/" className="hover:text-[#0E2A1E]">Guides</Link>
        <span>/</span>
        <span className="text-[#0E2A1E] font-bold truncate max-w-[16rem] sm:max-w-md">{post.title}</span>
      </nav>

      <header className="space-y-4 border-b border-[#DDE4DF] pb-8">
        <div className="inline-flex items-center gap-2 bg-[#0E2A1E] text-[#C5A265] text-xs font-black uppercase px-3 py-1 rounded-full border border-[#C5A265]/40 tracking-wider">
          {post.category}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight leading-tight font-serif">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#4A5D53] pt-1">
          <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-4 h-4 text-[#7A5C22]" /> Published {when(post.date)}</span>
          <span className="flex items-center gap-1.5 font-medium"><RefreshCw className="w-4 h-4 text-[#7A5C22]" /> Last updated {when(post.updated)}</span>
          <span className="flex items-center gap-1.5 font-medium"><Clock className="w-4 h-4 text-[#7A5C22]" /> {post.readTime}</span>
          <span className="flex items-center gap-1.5 font-medium"><User className="w-4 h-4 text-[#7A5C22]" /> The Buggy Shop team, Queensland</span>
        </div>
      </header>

      <div className="rounded-3xl overflow-hidden border border-[#DDE4DF] bg-white shadow-xs flex items-center justify-center">
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 768px"
          priority
          className="w-full h-auto max-h-[28rem] object-contain p-4"
        />
      </div>

      {toc.length >= 5 && (
        <nav aria-label="In this guide" className="rounded-2xl border border-[#D5DFD9] bg-[#FAF8F5] p-5">
          <div className="text-xs font-black uppercase tracking-wider text-[#7A5C22] mb-2">In this guide</div>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-[#1E3A2B] columns-1 sm:columns-2">
            {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="hover:underline">{h.text}</a></li>)}
          </ol>
        </nav>
      )}

      <article>
        <ArticleBody content={post.content} />
      </article>

      <FaqSection faqs={faqs} url={`/blog/${post.slug}/`} heading="Your questions answered" id="post-faq" />

      <div className="p-6 bg-[#0E2A1E] text-white rounded-2xl border border-[#C5A265]/40 space-y-3">
        <h2 className="font-black text-lg text-[#C5A265] font-serif">Need help choosing?</h2>
        <p className="text-xs text-[#D3DFD8]">Our Queensland team can match a buggy, cart or accessories to how you play. Delivery is Australia-wide.</p>
        <a
          href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(`G'day! I just read your guide "${post.title}" and would like some advice.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-[#071810] font-black text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp ({CONTACT.phoneDisplay})</span>
        </a>
      </div>

      <section aria-labelledby="more-guides" className="space-y-4">
        <h2 id="more-guides" className="text-xl font-black text-[#0E2A1E] font-serif">More guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {more.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="rounded-2xl border border-[#D5DFD9] bg-white p-4 hover:border-[#C5A265] hover:shadow-md transition-all space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#7A5C22]">{p.category}</span>
              <div className="font-bold text-sm text-[#0E2A1E] leading-snug">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-[#DDE4DF] flex justify-between items-center">
        <Link href="/blog/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0E2A1E] hover:text-[#7A5C22]">
          <ArrowLeft className="w-4 h-4" /> All guides
        </Link>
        <Link href="/shop/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0E2A1E] hover:text-[#7A5C22]">
          Shop golf buggies <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
