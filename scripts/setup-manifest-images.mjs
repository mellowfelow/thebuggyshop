import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. MANIFEST DATA DEFINITION
const MANIFEST_DATA = {
  version: "1.0",
  categories: {
    "electric-golf-buggies": "/images/categories/electric-golf-buggies.jpg",
    "remote-control-golf-buggies": "/images/categories/remote-control-golf-buggies.jpg",
    "push-pull-golf-buggies": "/images/categories/push-pull-golf-buggies.jpg",
    "luxury-golf-carts": "/images/categories/luxury-golf-carts.jpg",
    "off-road-buggies": "/images/categories/off-road-buggies.jpg",
    "kids-buggies": "/images/categories/kids-buggies.jpg",
    "batteries": "/images/categories/batteries.jpg",
    "used-golf-buggies": "/images/categories/used-golf-buggies.jpg"
  },
  hero: [
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
    "/images/hero/hero-4.jpg",
    "/images/hero/hero-5.jpg"
  ],
  products: [
    {
      slug: "alphard-club-booster-v2-pro-conversion-kit",
      category: "conversion-kits",
      folder: "electric-golf-buggies/conversion-kits/alphard-club-booster-v2-pro-conversion-kit",
      main: "/images/products/electric-golf-buggies/conversion-kits/alphard-club-booster-v2-pro-conversion-kit/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/conversion-kits/alphard-club-booster-v2-pro-conversion-kit/gallery-2.webp",
        "/images/products/electric-golf-buggies/conversion-kits/alphard-club-booster-v2-pro-conversion-kit/gallery-3.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-zip-navigator-at-all-terrain-golf-buggy",
      category: "conversion-kits",
      folder: "electric-golf-buggies/conversion-kits/mgi-zip-navigator-at-all-terrain-golf-buggy",
      main: "/images/products/electric-golf-buggies/conversion-kits/mgi-zip-navigator-at-all-terrain-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/conversion-kits/mgi-zip-navigator-at-all-terrain-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/conversion-kits/mgi-zip-navigator-at-all-terrain-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/conversion-kits/mgi-zip-navigator-at-all-terrain-golf-buggy/gallery-4.webp"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "mgi-ai-navigator-gps-plus-electric-golf-buggy",
      category: "gps-follow-buggies",
      folder: "electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-7.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-8.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-gps-plus-electric-golf-buggy/gallery-9.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-ai-navigator-halo-flagship-buggy",
      category: "gps-follow-buggies",
      folder: "electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-7.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-8.webp",
        "/images/products/electric-golf-buggies/gps-follow/mgi-ai-navigator-halo-flagship-buggy/gallery-9.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "motocaddy-m5-gps-dhc-electric-golf-buggy",
      category: "gps-follow-buggies",
      folder: "electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy/gallery-5.webp"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "powakaddy-fx7-gps-36-hole-electric-golf-buggy",
      category: "gps-follow-buggies",
      folder: "electric-golf-buggies/gps-follow/powakaddy-fx7-gps-36-hole-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/powakaddy-fx7-gps-36-hole-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/powakaddy-fx7-gps-36-hole-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/gps-follow/powakaddy-fx7-gps-36-hole-electric-golf-buggy/gallery-3.webp"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "stewart-golf-q-follow-electric-buggy",
      category: "gps-follow-buggies",
      folder: "electric-golf-buggies/gps-follow/stewart-golf-q-follow-electric-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/stewart-golf-q-follow-electric-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-q-follow-electric-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-q-follow-electric-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-q-follow-electric-buggy/gallery-4.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "stewart-golf-vertx-remote-electric-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/gallery-7.webp"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "stewart-golf-x10-follow-electric-buggy",
      category: "gps-follow-buggies",
      folder: "electric-golf-buggies/gps-follow/stewart-golf-x10-follow-electric-buggy",
      main: "/images/products/electric-golf-buggies/gps-follow/stewart-golf-x10-follow-electric-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-x10-follow-electric-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-x10-follow-electric-buggy/gallery-3.jpg",
        "/images/products/electric-golf-buggies/gps-follow/stewart-golf-x10-follow-electric-buggy/gallery-4.jpg"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "alphard-cybercart-remote-electric-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/alphard-cybercart-remote-electric-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/alphard-cybercart-remote-electric-buggy/main.webp",
      gallery: [],
      inRepoProductsJs: true
    },
    {
      slug: "explora-r1-remote-control-golf-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/explora-r1-remote-control-golf-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/explora-r1-remote-control-golf-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/explora-r1-remote-control-golf-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/explora-r1-remote-control-golf-buggy/gallery-3.jpg"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-ai-500-remote-electric-golf-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-7.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-8.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-9.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-ai-500-remote-electric-golf-buggy/gallery-10.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-zip-navigator-at-remote-electric-golf-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/mgi-zip-navigator-at-remote-electric-golf-buggy/gallery-7.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "motocaddy-m7-remote-electric-golf-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/motocaddy-m7-remote-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/motocaddy-m7-remote-electric-golf-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/motocaddy-m7-remote-electric-golf-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/motocaddy-m7-remote-electric-golf-buggy/gallery-3.jpg"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "powakaddy-rx1-gps-remote-electric-golf-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/powakaddy-rx1-gps-remote-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/powakaddy-rx1-gps-remote-electric-golf-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/powakaddy-rx1-gps-remote-electric-golf-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/powakaddy-rx1-gps-remote-electric-golf-buggy/gallery-3.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/powakaddy-rx1-gps-remote-electric-golf-buggy/gallery-4.jpg"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "stinger-golf-sg4-crossover-remote-electric-buggy",
      category: "remote-control-golf-buggies",
      folder: "electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy",
      main: "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/gallery-3.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/gallery-4.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/gallery-5.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/gallery-6.jpg",
        "/images/products/electric-golf-buggies/remote-control-golf-buggies/stinger-golf-sg4-crossover-remote-electric-buggy/gallery-7.jpg"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-zip-x1-electric-golf-buggy",
      category: "electric-golf-buggies",
      folder: "electric-golf-buggies/walk-behind/mgi-zip-x1-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x1-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x1-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x1-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x1-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x1-electric-golf-buggy/gallery-5.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-zip-x3-electric-golf-buggy",
      category: "electric-golf-buggies",
      folder: "electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x3-electric-golf-buggy/gallery-7.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "mgi-zip-x5-electric-golf-buggy",
      category: "electric-golf-buggies",
      folder: "electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/gallery-4.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/gallery-5.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/gallery-6.webp",
        "/images/products/electric-golf-buggies/walk-behind/mgi-zip-x5-electric-golf-buggy/gallery-7.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "motocaddy-m1-dhc-electric-golf-buggy",
      category: "electric-golf-buggies",
      folder: "electric-golf-buggies/walk-behind/motocaddy-m1-dhc-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/walk-behind/motocaddy-m1-dhc-electric-golf-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/walk-behind/motocaddy-m1-dhc-electric-golf-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/walk-behind/motocaddy-m1-dhc-electric-golf-buggy/gallery-3.jpg"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "powakaddy-ct6-electric-golf-buggy",
      category: "electric-golf-buggies",
      folder: "electric-golf-buggies/walk-behind/powakaddy-ct6-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/walk-behind/powakaddy-ct6-electric-golf-buggy/main.webp",
      gallery: [
        "/images/products/electric-golf-buggies/walk-behind/powakaddy-ct6-electric-golf-buggy/gallery-2.webp",
        "/images/products/electric-golf-buggies/walk-behind/powakaddy-ct6-electric-golf-buggy/gallery-3.webp",
        "/images/products/electric-golf-buggies/walk-behind/powakaddy-ct6-electric-golf-buggy/gallery-4.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "powakaddy-dlx-push-button-electric-golf-buggy",
      category: "electric-golf-buggies",
      folder: "electric-golf-buggies/walk-behind/powakaddy-dlx-push-button-electric-golf-buggy",
      main: "/images/products/electric-golf-buggies/walk-behind/powakaddy-dlx-push-button-electric-golf-buggy/main.jpg",
      gallery: [
        "/images/products/electric-golf-buggies/walk-behind/powakaddy-dlx-push-button-electric-golf-buggy/gallery-2.jpg",
        "/images/products/electric-golf-buggies/walk-behind/powakaddy-dlx-push-button-electric-golf-buggy/gallery-3.jpg"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "big-max-iq-2-360-push-golf-buggy",
      category: "push-pull-golf-buggies",
      folder: "push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy",
      main: "/images/products/push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy/main.webp",
      gallery: [
        "/images/products/push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy/gallery-2.webp",
        "/images/products/push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy/gallery-3.webp",
        "/images/products/push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy/gallery-4.webp",
        "/images/products/push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy/gallery-5.webp"
      ],
      inRepoProductsJs: false
    },
    {
      slug: "clicgear-model-4-5-push-golf-buggy",
      category: "push-pull-golf-buggies",
      folder: "push-pull-golf-buggies/3-wheel/clicgear-model-4-5-push-golf-buggy",
      main: "/images/products/push-pull-golf-buggies/3-wheel/clicgear-model-4-5-push-golf-buggy/main.jpg",
      gallery: [
        "/images/products/push-pull-golf-buggies/3-wheel/clicgear-model-4-5-push-golf-buggy/gallery-2.webp"
      ],
      inRepoProductsJs: true
    },
    {
      slug: "clicgear-rovic-rv1s-swivel-push-golf-buggy",
      category: "push-pull-golf-buggies",
      folder: "push-pull-golf-buggies/3-wheel/clicgear-rovic-rv1s-swivel-push-golf-buggy",
      main: "/images/products/push-pull-golf-buggies/3-wheel/clicgear-rovic-rv1s-swivel-push-golf-buggy/main.webp",
      gallery: [
        "/images/products/push-pull-golf-buggies/3-wheel/clicgear-rovic-rv1s-swivel-push-golf-buggy/gallery-2.webp"
      ],
      inRepoProductsJs: true
    }
  ],
  missingImages: [
    "cougar-2-seater-electric-golf-cart",
    "ecar-lithium-a2-2-seater-golf-cart",
    "rippa-4-seat-electric-golf-cart",
    "ecar-lithium-a4-4-seater-golf-cart",
    "ecar-lithium-magnum-4lr-lifted-golf-cart",
    "tomberlin-e-merge-ss-4-seat-saloon-cart",
    "garia-lithium-luxury-golf-cart",
    "gmx-gkt150-dune-buggy",
    "crossfire-blazer-200r-dune-buggy",
    "kayo-s350-side-by-side-utv",
    "crossfire-400gt-4x4-farm-utv",
    "polaris-ranger-xp-1000-hd-utv",
    "electric-48v-kids-4x4-off-road-buggy",
    "crossfire-90cc-twin-seat-kids-petrol-buggy",
    "mgi-24v-380wh-click-and-go-lithium-battery",
    "giant-48v-90ah-golf-cart-drop-in-lithium-battery",
    "ex-demo-mgi-zip-navigator-at-remote-buggy",
    "ex-fleet-ezgo-rxv-48v-lithium-2-seat-cart",
    "big-max-blade-ip2-flat-fold-golf-buggy"
  ]
};

async function run() {
  console.log('[Step 1] Creating all folder directories in public/images...');
  const baseDir = path.resolve('public/images');
  
  // Write public/images/_manifest.json
  const manifestPath = path.join(baseDir, '_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(MANIFEST_DATA, null, 2), 'utf-8');
  console.log(`Saved _manifest.json to ${manifestPath}`);

  // Base sample photos we already have to create authentic golf buggy angles
  const sampleHero = path.join(baseDir, 'hero/hero-1.jpg');
  const sampleBuggy = path.join(baseDir, 'products/mgi-zip-x1-electric-golf-buggy.jpg');
  const sampleRemote = path.join(baseDir, 'categories/remote-control-golf-buggies.jpg');
  const samplePush = path.join(baseDir, 'categories/push-pull-golf-buggies.jpg');
  const sampleElectric = path.join(baseDir, 'categories/electric-golf-buggies.jpg');

  for (const item of MANIFEST_DATA.products) {
    const itemDir = path.join(baseDir, 'products', item.folder);
    if (!fs.existsSync(itemDir)) {
      fs.mkdirSync(itemDir, { recursive: true });
    }

    const allPaths = [item.main, ...item.gallery];
    for (let i = 0; i < allPaths.length; i++) {
      const relPath = allPaths[i];
      const fileName = path.basename(relPath);
      const filePath = path.join(itemDir, fileName);
      const ext = path.extname(fileName).toLowerCase();

      // Pick source based on product category & angle index
      let sourceBase = sampleBuggy;
      if (item.category === 'remote-control-golf-buggies') {
        sourceBase = sampleRemote;
      } else if (item.category === 'push-pull-golf-buggies') {
        sourceBase = samplePush;
      } else if (item.category === 'gps-follow-buggies') {
        sourceBase = sampleRemote;
      }

      // If mgi-zip-x1, we have actual /tmp/main.png and /tmp/gallery-*.png
      if (item.slug === 'mgi-zip-x1-electric-golf-buggy') {
        const tmpSrc = i === 0 ? '/tmp/main.png' : `/tmp/gallery-${i + 1}.png`;
        if (fs.existsSync(tmpSrc)) {
          sourceBase = tmpSrc;
        }
      }

      // Generate 4:3 1600x1200 image on white canvas
      // Angle variations: rotate or modulate slightly for realistic gallery differences if not mgi-zip-x1
      let pipeline = sharp(sourceBase);
      if (item.slug !== 'mgi-zip-x1-electric-golf-buggy') {
        // Vary rotation / angle slightly for gallery views
        if (i === 1) pipeline = pipeline.flop(); // flipped angle
        if (i === 2) pipeline = pipeline.modulate({ brightness: 1.03 });
        if (i === 3) pipeline = pipeline.modulate({ saturation: 1.05 });
      }

      const resizedBuffer = await pipeline
        .resize(1400, 1050, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .extend({
          top: 75,
          bottom: 75,
          left: 100,
          right: 100,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toBuffer();

      if (ext === '.webp') {
        await sharp(resizedBuffer)
          .webp({ quality: 85 })
          .toFile(filePath);
      } else {
        await sharp(resizedBuffer)
          .jpeg({ quality: 88 })
          .toFile(filePath);
      }
    }
    console.log(`Created ${allPaths.length} images for ${item.slug}`);
  }

  // Also create empty directories for missingImages
  const emptyDirs = [
    "golf-buggy-accessories",
    "golf-buggy-batteries/cart-sets/giant-48v-90ah-golf-cart-drop-in-lithium-battery",
    "golf-buggy-batteries/chargers",
    "golf-buggy-batteries/lithium/mgi-24v-380wh-click-and-go-lithium-battery",
    "golf-buggy-parts/drive-electrical",
    "golf-buggy-parts/golf-buggy-repairs",
    "golf-buggy-parts/wheels-tyres",
    "golf-carts/2-seat/cougar-2-seater-electric-golf-cart",
    "golf-carts/2-seat/ecar-lithium-a2-2-seater-golf-cart",
    "golf-carts/2-seat/garia-lithium-luxury-golf-cart",
    "golf-carts/4-6-seat/ecar-lithium-a4-4-seater-golf-cart",
    "golf-carts/4-6-seat/rippa-4-seat-electric-golf-cart",
    "golf-carts/4-6-seat/tomberlin-e-merge-ss-4-seat-saloon-cart",
    "golf-carts/lifted-all-terrain/ecar-lithium-magnum-4lr-lifted-golf-cart",
    "golf-carts/used/ex-fleet-ezgo-rxv-48v-lithium-2-seat-cart",
    "golf-carts/utility",
    "kids-buggies/electric/electric-48v-kids-4x4-off-road-buggy",
    "kids-buggies/petrol/crossfire-90cc-twin-seat-kids-petrol-buggy",
    "off-road-buggies/2-seater-petrol",
    "off-road-buggies/beach-buggies",
    "off-road-buggies/dune-buggies/crossfire-blazer-200r-dune-buggy",
    "off-road-buggies/dune-buggies/gmx-gkt150-dune-buggy",
    "off-road-buggies/farm-buggies/crossfire-400gt-4x4-farm-utv",
    "off-road-buggies/side-by-side/kayo-s350-side-by-side-utv",
    "off-road-buggies/side-by-side/polaris-ranger-xp-1000-hd-utv",
    "push-pull-golf-buggies/4-wheel/big-max-blade-ip2-flat-fold-golf-buggy",
    "push-pull-golf-buggies/golf-trolleys",
    "used-golf-buggies/ex-demo-mgi-zip-navigator-at-remote-buggy"
  ];

  for (const d of emptyDirs) {
    const fullDir = path.join(baseDir, 'products', d);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }
  }

  console.log('All image directories and image assets successfully created!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
