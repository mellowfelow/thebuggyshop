import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, POSTS, PRODUCTS, CONTACT } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { seoTitle, seoDesc } from '@/lib/seo';

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: { absolute: seoTitle(`${post.title} | The Buggy Shop Australia`) },
    description: seoDesc(post.excerpt),
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://${SITE.domain}/blog/${post.slug}/`,
      images: [{ url: post.image }],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://${SITE.domain}/blog/${post.slug}/#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": [post.image],
        "datePublished": "2026-03-01T08:00:00+10:00",
        "dateModified": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": SITE.name,
          "url": `https://${SITE.domain}/`
        },
        "publisher": {
          "@type": "Organization",
          "name": SITE.name,
          "logo": {
            "@type": "ImageObject",
            "url": `https://${SITE.domain}/images/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://${SITE.domain}/blog/${post.slug}/`
        }
      },
      {
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
            "name": "Insights",
            "item": `https://${SITE.domain}/blog/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://${SITE.domain}/blog/${post.slug}/`
          }
        ]
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={blogSchema} />

      {/* Navigation Breadcrumb */}
      <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
        <span>/</span>
        <Link href="/blog/" className="hover:text-[#0E2A1E]">Insights & Guides</Link>
        <span>/</span>
        <span className="text-[#0E2A1E] font-bold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#DDE4DF] pb-8">
        <div className="inline-flex items-center gap-2 bg-[#0E2A1E] text-[#C5A265] text-xs font-black uppercase px-3 py-1 rounded-full border border-[#C5A265]/40 tracking-wider">
          {post.category}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight leading-tight font-serif">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A5D53] pt-2">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-[#8A7045]" /> {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-[#8A7045]" /> {post.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <User className="w-4 h-4 text-[#8A7045]" /> Australian Technical Engineering Desk
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="product-frame rounded-3xl overflow-hidden border border-[#DDE4DF] shadow-xs bg-[#F0F3F1]">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 768px"
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose max-w-none text-[#0E2A1E] space-y-6 text-sm sm:text-base leading-relaxed">
        <p className="font-semibold text-lg text-[#0E2A1E] leading-relaxed border-l-4 border-[#C5A265] pl-4 py-1">
          {post.excerpt}
        </p>

        <p>
          Selecting and maintaining a golf buggy for sale in Australia requires understanding course terrain, battery life, remote control technology, and vehicle construction. Whether you are seeking a luxury electric golf buggy with seat, a remote control golf buggy, a rugged off road buggy, or a lightweight push golf buggy, durability and battery efficiency are paramount.
        </p>

        <h2 className="text-2xl font-black text-[#0E2A1E] pt-4 font-serif">
          1. Thermal Stability and Lithium Iron Phosphate (LiFePO4)
        </h2>
        <p>
          Traditional lead-acid golf buggy batteries lose over 35% of their effective amp-hour capacity when subjected to sustained ambient heat above 38°C on Australian fairways. In contrast, automotive-grade LiFePO4 cells maintain continuous internal thermal equilibrium via integrated Battery Management Systems (BMS) with over-temperature cutoff protocols.
        </p>
        <p>
          With zero acid venting, zero water topping maintenance, and over 3,500 full depth-of-discharge cycles, lithium represents a fundamental leap in long-term reliability for private resort courses, championship fairways, and rural estates.
        </p>

        <h2 className="text-2xl font-black text-[#0E2A1E] pt-4 font-serif">
          2. Remote Control Golf Buggy & Push Buggy Technology
        </h2>
        <p>
          For walking golfers, electric remote control golf buggies and precision golf push buggies provide effortless maneuverability. Equipped with dual-drive motors, gyroscope straight-line tracking, and quick-fold aircraft-grade aluminum frames, they reduce physical fatigue across 18 or 36 holes.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[#4A5D53]">
          <li><strong>Remote Control Navigation:</strong> Directional control up to 50 meters with automatic braking.</li>
          <li><strong>Golf Buggy Accessories:</strong> Deluxe umbrella holders, GPS mounts, padded seating, and cooler compartments.</li>
          <li><strong>Off Road Buggy Capabilities:</strong> High-traction all-terrain tread patterns designed for steep undulations and wet turf.</li>
        </ul>

        <div className="my-8 p-6 bg-[#0E2A1E] text-white rounded-2xl border border-[#C5A265]/40 space-y-3">
          <h3 className="font-black text-lg text-[#C5A265] font-serif">Need Help Selecting Your Golf Buggy or Accessories?</h3>
          <p className="text-xs text-[#D3DFD8]">
            Our Brisbane team provides expert guidance on golf buggies for sale, remote control units, and complete accessories packages with nationwide delivery.
          </p>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
              `G'day! I just read your article "${post.title}" and would like to ask a technical question regarding golf buggies.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-[#071810] font-black text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+61 480 811 308)</span>
          </a>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#DDE4DF] flex justify-between items-center">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A265]" />
          <span>Back to All Articles</span>
        </Link>
        <Link
          href="/shop/"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] uppercase tracking-wider"
        >
          <span>Explore Golf Buggies For Sale</span>
          <ArrowRight className="w-4 h-4 text-[#C5A265]" />
        </Link>
      </div>
    </div>
  );
}
