"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Search, MapPin, ExternalLink } from "lucide-react";
import { REGION_CITIES, OUTDOOR_TYPES, getVenues, type Region, type Tab, type Venue } from '../lib/data';
import { BannerAd, NativeAd } from './Ads';
import { usePlusFlag } from './PlusFlag';

function hostFromUrl(u: string){ try { return new URL(u).host; } catch { return ""; } }
function absolutize(src: string, base: string){ try { return new URL(src, base).href; } catch { return src; } }
async function fetchOgImage(website: string){
  try{
    const host = hostFromUrl(website); if(!host) return null;
    const res = await fetch(`https://r.jina.ai/http://${host}`); if(!res.ok) return null;
    const html = await res.text();
    const m = html.match(/<meta[^>]+(property|name)=['"](og:image|twitter:image)['"][^>]+content=['"]([^'"]+)['"][^>]*>/i);
    if(m && m[3]){ const raw = m[3].replace(/&amp;/g,'&'); return raw.startsWith('http')? raw : absolutize(raw, `https://${host}`); }
    return null;
  }catch{ return null; }
}

function trackClick(v: Venue, type: string, region: Region, tab: Tab){
  try{ fetch('/api/click',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({venue:`${v.name}__${v.city}`,type,region,tab,ts:Date.now()})}); }catch{}
}

export default function Directory({ region, tab }: { region: Region; tab: Tab }) {
  const { isPlus } = usePlusFlag();

  const [q,setQ] = useState("");
  const [cities,setCities] = useState<string[]>([]);
  const [types,setTypes] = useState<string[]>([]);
  const [onlyWaterfront,setOnlyWaterfront] = useState(false);
  const [onlyCovered,setOnlyCovered] = useState(false);
  const [imgMap,setImgMap] = useState<Record<string,string>>({});

  const regionCities = REGION_CITIES[region];
  const baseVenues = useMemo(()=> getVenues(region, tab), [region, tab]);

  useEffect(()=>{ (async()=>{
    const missing = baseVenues.filter(v=>!imgMap[`${v.name}__${v.city}`]);
    const results = await Promise.allSettled(missing.map(async v=>{ const url = await fetchOgImage(v.website); return url? [`${v.name}__${v.city}`, url] as const : null; }));
    const add: Record<string,string> = {}; for(const r of results){ if(r.status==='fulfilled' && r.value){ const [k,u]=r.value; add[k]=u; } }
    if(Object.keys(add).length) setImgMap(prev=>({...prev,...add}));
  })(); },[baseVenues]);

  const data = useMemo(()=>{
    let list = baseVenues.slice();
    const ql = q.trim().toLowerCase();
    if(ql) list = list.filter(v=>[v.name,v.city,v.notes,v.area,v.category].some(x=>`${x||''}`.toLowerCase().includes(ql)));
    if(cities.length) list = list.filter(v=>cities.includes(v.city));
    if(types.length) list = list.filter(v=>types.some(t=>(v.area||'').toLowerCase().includes(t.toLowerCase())));
    if(onlyWaterfront) list = list.filter(v=>v.waterfront);
    if(onlyCovered) list = list.filter(v=>v.covered);
    return list;
  },[q,cities,types,onlyWaterfront,onlyCovered,baseVenues]);

  const getImage=(v: Venue)=> imgMap[`${v.name}__${v.city}`] || `https://picsum.photos/seed/${encodeURIComponent(v.name)}/600/400`;

  return (
    <div>
      {!isPlus && <BannerAd slot="header" />}
      <div className="grid gap-3 md:grid-cols-[1fr,auto] md:items-center mt-3">
        <div className="flex items-center gap-2 rounded-2xl border px-3 py-2">
          <Search className="h-4 w-4" />
          <input value={q} onChange={e=>setQ(e.currentTarget.value)} placeholder="Search by name, area, vibe…" className="w-full outline-none text-sm py-1" />
        </div>
        <div className="text-sm text-slate-600">
          {region==='loco'? 'Hilton Head • Bluffton • Savannah' : 'Charleston • Mt Pleasant • IOP • Sullivan’s • Folly • North CHS'}
        </div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <div className="rounded-2xl border p-3">
          <div className="font-semibold mb-2">City/Area</div>
          <div className="flex flex-wrap gap-2">
            {regionCities.map(c=>{
              const checked=cities.includes(c);
              return <button key={c} onClick={()=> setCities(p=> checked? p.filter(x=>x!==c) : [...p,c])}
                className={`px-3 py-1 rounded-full border text-sm ${checked?"bg-slate-900 text-white border-slate-900":"hover:bg-slate-50"}`}>{c}</button>;
            })}
          </div>
        </div>
        <div className="rounded-2xl border p-3">
          <div className="font-semibold mb-2">Outdoor Type</div>
          <div className="flex flex-wrap gap-2">
            {OUTDOOR_TYPES.map(t=>{
              const checked=types.includes(t);
              return <button key={t} onClick={()=> setTypes(p=> checked? p.filter(x=>x!==t) : [...p,t])}
                className={`px-3 py-1 rounded-full border text-sm ${checked?"bg-orange-100 border-orange-200":"hover:bg-slate-50"}`}>{t}</button>;
            })}
          </div>
        </div>
        <div className="rounded-2xl border p-3">
          <div className="font-semibold mb-2">Features</div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyWaterfront} onChange={e=>setOnlyWaterfront(e.currentTarget.checked)}/> Waterfront</label>
          <label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" checked={onlyCovered} onChange={e=>setOnlyCovered(e.currentTarget.checked)}/> Covered</label>
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-600">{data.length} places found</div>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((v,i)=> (
          <React.Fragment key={`${v.name}__${v.city}`}>
            <div className="rounded-2xl border p-4 hover:shadow-sm overflow-hidden">
              <div className="relative -mx-4 -mt-4 mb-3 h-36 overflow-hidden rounded-t-2xl bg-slate-100">
                <img src={getImage(v)} alt={`${v.name} — ${v.area}`} loading="lazy"
                     onError={(e)=>{(e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(v.name)}/600/400`;}} className="h-full w-full object-cover"/>
                <div className="pointer-events-none absolute bottom-1 left-2 text-[10px] text-white/90">Photo: {hostFromUrl(v.website)}</div>
              </div>
              <div className="text-lg font-semibold leading-tight">{v.name}</div>
              <div className="text-sm text-slate-500">{v.category}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-slate-100">{v.area}</span>
                {v.waterfront && <span className="px-2 py-1 rounded-full bg-blue-100">Waterfront</span>}
                {v.covered && <span className="px-2 py-1 rounded-full bg-green-100">Covered</span>}
              </div>
              <div className="mt-3 text-sm">{v.notes}</div>
              <div className="mt-3 flex items-center gap-2 text-sm"><MapPin className="h-4 w-4"/><span>{v.address}</span></div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a href={v.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 hover:bg-slate-50">Website <ExternalLink className="h-3.5 w-3.5"/></a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.address || v.name)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 hover:bg-slate-50">Directions <ExternalLink className="h-3.5 w-3.5"/></a>
                <a href={`https://www.booking.com/searchresults.html?aid=${process.env.NEXT_PUBLIC_BOOKING_AID||'0000000'}&ss=${encodeURIComponent(v.city)}&utm_source=porchbrews&utm_medium=affiliate`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 hover:bg-slate-50">Hotels nearby <ExternalLink className="h-3.5 w-3.5"/></a>
                <a href={`https://www.getyourguide.com/-l_236/?partner_id=${process.env.NEXT_PUBLIC_GYG_PARTNER_ID||'porchbrews'}&utm_source=porchbrews&utm_medium=affiliate&utm_campaign=${encodeURIComponent(v.city)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 hover:bg-slate-50">Experiences nearby <ExternalLink className="h-3.5 w-3.5"/></a>
              </div>
            </div>
            {((i+1)%6===0) && !isPlus && <NativeAd slot="grid-6" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
