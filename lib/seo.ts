import type { Venue, Region, Tab } from './data';

export function regionTitle(region: Region, tab: Tab) {
  const r = region === 'loco' ? 'Lowcountry' : 'Greater Charleston';
  const t = tab === 'coffee' ? 'Coffee & Tea' : 'Bars & Restaurants';
  return `${r} — ${t} | Porch Brews`;
}

export function regionDescription(region: Region, tab: Tab) {
  const r = region === 'loco' ? 'Hilton Head • Bluffton • Savannah' : 'Charleston • Mt Pleasant • IOP • Sullivan’s • Folly • North CHS';
  const t = tab === 'coffee' ? 'coffee & tea porches' : 'porch, patio, balcony, deck, rooftop spots';
  return `Search ${t} in ${r}. Waterfront and covered options included.`;
}

export function regionJsonLd(url: string, venues: Venue[]) {
  const items = venues.slice(0, 20).map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: v.website,
    name: v.name,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url,
    itemListElement: items,
  };
}

export function pageJsonLd(url: string, name: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url, name, description,
  };
}
