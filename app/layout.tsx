import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Porch Brews',
  description: 'Directory of porches, patios, balconies, decks, and rooftops',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-800">
        <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black tracking-tight">Porch Brews</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100">Directory</span>
            </div>
            <nav className="flex items-center gap-2 text-sm">
              <a href="/loco/bars" className="px-3 py-1 rounded-full border hover:bg-slate-50">Lowcountry</a>
              <a href="/chs/bars"  className="px-3 py-1 rounded-full border hover:bg-slate-50">Greater Charleston</a>
              <span className="mx-2">•</span>
              <a href="/advertise" className="px-3 py-1 rounded-full border hover:bg-slate-50">Advertise</a>
              <a href="/plus"      className="px-3 py-1 rounded-full border hover:bg-slate-50">Plus</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <footer className="border-t py-6 text-sm text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
            <div>© Porch Brews. We do not sell or ship alcohol.</div>
            <div className="flex items-center gap-3">
              <a href="/advertise" className="underline">Advertise</a>
              <a href="/plus" className="underline">Plus</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
