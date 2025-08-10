// app/products/page.tsx
export const dynamic = 'force-dynamic';

import Image from "next/image";
import { prisma } from "../../lib/db";      // <- relative import (no @ alias)
import { seedProducts } from "../../lib/seed";

function money(cents: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);
}

export default async function ProductsPage() {
  // Auto-seed if empty
  const count = await prisma.product.count();
  if (count === 0) {
    await seedProducts();
  }

  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {products.length === 0 && <p>No products available.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            {p.imageUrl && (
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={600}
                height={400}
                className="rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-3">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="mt-2 font-bold">{money(p.priceCents)}</p>
            {p.subscriptionEligible && (
              <p className="text-sm text-green-600">Subscription available</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
