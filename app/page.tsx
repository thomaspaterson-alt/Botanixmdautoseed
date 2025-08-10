import Link from "next/link"
export default function Home(){
  return <section className="section">
    <h1>Clinically crafted, plant‑powered wellness.</h1>
    <p>CBD + adaptogens for Calm, Sleep, Focus, Recovery.</p>
    <Link className="cta" href="/products">Shop products</Link>
  </section>
}
