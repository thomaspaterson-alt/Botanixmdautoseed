export const dynamic = 'force-dynamic';
import Image from "next/image"
import { prisma } from "@/lib/db"
import { autoSeed } from "@/lib/seed"

function money(n:number){ return new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(n/100) }

export default async function ProductsPage(){
  await autoSeed()
  let products:any[] = []
  try{
    products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  }catch{ products = [] }
  return <section className="section">
    <h1>Shop</h1>
    {products.length===0 ? <p>No products yet.</p> :
      <div className="grid">
        {products.map((p:any)=>(
          <article key={p.id} className="card">
            {p.imageUrl && <Image src={p.imageUrl} alt={p.name} width={600} height={400}/>}
            <h3>{p.name}</h3>
            <p style={{opacity:.8}}>{p.benefit} {p.subscriptionEligible ? "• Subscribe & save 15%" : ""}</p>
            <p className="price">{money(p.priceCents)}</p>
          </article>
        ))}
      </div>
    }
  </section>
}
