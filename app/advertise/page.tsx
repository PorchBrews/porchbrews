import Script from 'next/script';
import { pageJsonLd } from '../../lib/seo';
import { NewsletterForm } from '../../components/Forms';

export const metadata = { title: 'Advertise | Porch Brews', description: 'Reach locals and travelers planning outdoor hangs.' };

export default function Advertise(){
  const jsonLd = pageJsonLd('/advertise','Advertise | Porch Brews','Plans and sponsorships');
  const email = process.env.NEXT_PUBLIC_ADVERTISE_EMAIL || 'sales@porchbrews.example';
  return (
    <>
      <Script id="ld-adv" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Advertise on Porch Brews</h1>
        <p className="mt-2 text-slate-600 text-sm">Reach locals and travelers searching for patios, rooftops, and waterfront decks.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[{t:'Starter',p:'$49/mo',d:'Rotating feature, 1 photo, 1 special/mo'},
            {t:'Pro',p:'$149/mo',d:'Top-row feature, 3 photos, 4 specials/mo'},
            {t:'Premium',p:'$399/mo',d:'#1 slot + hero, 5 photos, unlimited specials'}].map(x=>(
            <div key={x.t} className="rounded-2xl border p-4">
              <div className="font-semibold">{x.t}</div>
              <div className="text-2xl mt-1">{x.p}</div>
              <div className="text-sm text-slate-600 mt-2">{x.d}</div>
            </div>
          ))}
        </div>
        <a href={`mailto:${email}?subject=Advertise%20on%20Porch%20Brews`} className="mt-4 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-slate-50">Contact sales</a>
        <div className="mt-6 rounded-2xl border p-4">
          <div className="font-semibold">Subscribe to updates</div>
          <div className="text-sm text-slate-600">Get our media kit and seasonal calendar.</div>
          <NewsletterForm source="advertise" />
        </div>
      </div>
    </>
  );
}
