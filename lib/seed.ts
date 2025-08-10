// lib/seed.ts
import { prisma } from "./db";

export async function seedProducts() {
  const products = [
    {
      slug: "calm-gummies",
      name: "Calm Gummies",
      description: "CBD + ashwagandha for stress support.",
      benefit: "Calm",
      priceCents: 3900,
      imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      subscriptionEligible: true,
    },
    {
      slug: "sleep-tincture",
      name: "Sleep Tincture",
      description: "CBD + melatonin + lavender for restful sleep.",
      benefit: "Sleep",
      priceCents: 4900,
      imageUrl: "https://images.unsplash.com/photo-1611078489935-0cb9649c0b9a",
      subscriptionEligible: true,
    },
    {
      slug: "focus-capsules",
      name: "Focus Capsules",
      description: "CBD + L-theanine + bacopa for clarity.",
      benefit: "Focus",
      priceCents: 4200,
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      subscriptionEligible: false,
    },
    {
      slug: "recovery-balm",
      name: "Recovery Balm",
      description: "Topical CBD with arnica and menthol.",
      benefit: "Recovery",
      priceCents: 3500,
      imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceffab1b93",
      subscriptionEligible: false,
    },
  ];

  // Upsert to be idempotent (safe to run multiple times)
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
}
