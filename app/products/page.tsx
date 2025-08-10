// app/products/page.tsx
import { prisma } from "@/lib/db";
import { seedProducts } from "@/lib/seed";

export default async function ProductsPage() {
  // Auto-seed products if none exist
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await seedProducts();
  }

  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {products.length === 0 && <p>No products available.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 font-bold">${(product.priceCents / 100).toFixed(2)}</p>
            {product.subscriptionEligible && (
              <p className="text-sm text-green-600">Subscription available</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
