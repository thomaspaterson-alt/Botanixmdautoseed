import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = { title: "BotanixMD", description: "Clinically crafted botanicals." }

export default function RootLayout({ children }: { children: React.ReactNode }){
  return <html lang="en"><body>
    <header className="container header">
      <Link href="/" className="brand">BotanixMD</Link>
      <nav className="nav">
        <Link href="/products">Shop</Link>
      </nav>
    </header>
    <main className="container">{children}</main>
  </body></html>
}
