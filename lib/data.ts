export type Region = 'loco' | 'chs';
export type Tab = 'bars' | 'coffee';

export const OUTDOOR_TYPES = ["Porch","Patio","Balcony","Deck","Rooftop"] as const;

export const REGION_CITIES: Record<Region, string[]> = {
  loco: ["Hilton Head Island, SC","Bluffton, SC","Savannah, GA","Thunderbolt (Savannah area), GA"],
  chs: ["Charleston, SC","Mount Pleasant, SC","Isle of Palms, SC","Sullivan's Island, SC","Folly Beach, SC","North Charleston, SC"],
};

export const VENUE_ROWS_LOCO = `
Skull Creek Boathouse|Hilton Head Island, SC|Restaurant & Bar|Deck / Patio|Large waterfront deck; outdoor bar; sunset views|397 Squire Pope Rd, Hilton Head Island, SC 29926|https://www.skullcreekboathouse.com/|1|0|0
Skull Creek Dockside|Hilton Head Island, SC|Restaurant & Bar|Covered Deck / Patio|Covered deck; outdoor bar on Skull Creek|2 Hudson Rd, Hilton Head Island, SC 29926|https://www.docksidehhi.com/|1|1|0
Hudson’s Seafood House on the Docks|Hilton Head Island, SC|Restaurant & Bar|Deck / Dock|Dockside seating; Sound views|1 Hudson Rd, Hilton Head Island, SC 29926|https://www.hudsonsonthedocks.com/|1|0|0
Fishcamp on Broad Creek|Hilton Head Island, SC|Restaurant & Bar|Patio / Outdoor Bar|Pet‑friendly patio; live music|11 Simmons Rd, Hilton Head Island, SC 29926|https://fishcamphhi.com/|1|0|0
Quarterdeck (Harbour Town)|Hilton Head Island, SC|Restaurant & Bar|Rooftop / Deck|Harbour Town lighthouse views|160 Lighthouse Rd Unit 3, Hilton Head Island, SC 29938|https://www.seapines.com/dining/restaurants-bars/quarterdeck|1|0|1
The Cottage Café, Bakery & Tea Room|Bluffton, SC|Cafe & Restaurant|Front Porch / Patio|Historic 1868 cottage|38 Calhoun St, Bluffton, SC 29910|https://thecottagebluffton.com/|0|0|0
Peregrin (Perry Lane Hotel)|Savannah, GA|Rooftop Bar|Rooftop Terrace|Open‑air rooftop lounge|256 E Perry St, Savannah, GA 31401|https://www.perrylanehotel.com/dining/peregrin/|0|0|0
Rocks on the Roof (The Bohemian Hotel)|Savannah, GA|Rooftop Bar|Rooftop Deck|Savannah River views|102 W Bay St, Savannah, GA 31401|https://www.rocksontheroof.com/|1|0|0
`;

export const COFFEE_ROWS_LOCO = `
Watusi Cafe & Coffee Bar|Hilton Head Island, SC|Cafe|Patio|Neighborhood cafe with patio|71 Pope Ave, Hilton Head Island, SC 29928|https://www.watusicafe.com/|0|0|0
Hilton Head Social Bakery — Shelter Cove|Hilton Head Island, SC|Bakery & Cafe|Waterfront Patio|Outdoor seating by harbour|17 Harborside Ln, Hilton Head Island, SC 29928|https://www.hiltonheadsocialbakery.com/hilton-head-social-bakery-locations/hilton-head-social-bakery-at-shelter-cove|1|0|0
Foxy Loxy Cafe|Savannah, GA|Cafe & Bakery|Courtyard Patio|Courtyard with fire pits|1919 Bull St, Savannah, GA 31401|https://www.foxyloxycafe.com/|0|0|0
`;

export const VENUE_ROWS_CHS = `
The Rooftop at The Vendue|Charleston, SC|Rooftop Bar|Rooftop Terrace|Panoramic views above The Vendue|19 Vendue Range, Charleston, SC 29401|https://www.thevendue.com/rooftop/|0|0|0
Pavilion Bar (Market Pavilion Hotel)|Charleston, SC|Rooftop Bar|Rooftop Pool Deck|Harbor & city views|225 E Bay St, Charleston, SC 29401|https://marketpavilion.com/pavilion-bar/|0|0|0
Fleet Landing Restaurant & Bar|Charleston, SC|Restaurant & Bar|Waterfront Patio|Waterfront dining on the harbor|186 Concord St, Charleston, SC 29401|https://fleetlanding.net/|1|0|0
Revelry Brewing Co.|Charleston, SC|Brewery & Bar|Rooftop Deck|Brewery rooftop deck|10 Conroy St, Charleston, SC 29403|https://www.revelrybrewingco.com/|0|0|0
`;

export const COFFEE_ROWS_CHS = `
Kudu Coffee & Craft Beer|Charleston, SC|Cafe & Beer|Courtyard Patio|Large courtyard off King St|4 Vanderhorst St, Charleston, SC 29403|https://kuducoffeeandcraftbeer.com/|0|0|0
The Harbinger Cafe & Bakery|Charleston, SC|Cafe & Bakery|Back Patio|Cozy patio behind the shop|1107 King St, Charleston, SC 29403|https://harbingercafe.com/|0|0|0
Huriyali Gardens|Charleston, SC|Cafe & Juice Bar|Garden Courtyard|Lush back garden seating|401 Huger St, Charleston, SC 29403|https://huriyali.com/|0|0|0
`;

export type Venue = {
  name: string; city: string; category: string; area: string; notes: string;
  address: string; website: string; waterfront: boolean; covered: boolean; sponsored: boolean;
};

export function fromRows(txt: string): Venue[] {
  return txt.trim().split('\n').filter(Boolean).map(line => {
    const [name, city, category, area, notes, address, website, wf, cov, spon] = line.split('|');
    return { name, city, category, area, notes, address, website,
      waterfront: wf==='1', covered: cov==='1', sponsored: spon==='1' };
  });
}

const VENUES_LOCO = fromRows(VENUE_ROWS_LOCO);
const COFFEE_LOCO = fromRows(COFFEE_ROWS_LOCO);
const VENUES_CHS  = fromRows(VENUE_ROWS_CHS);
const COFFEE_CHS  = fromRows(COFFEE_ROWS_CHS);

export function getVenues(region: Region, tab: Tab): Venue[] {
  const list =
    region === 'loco'
      ? (tab === 'coffee' ? COFFEE_LOCO : VENUES_LOCO)
      : (tab === 'coffee' ? COFFEE_CHS : VENUES_CHS);
  const isSidewalkOnly = (v: Venue) => /(sidewalk|street\s*seating|curb|parklet)/i.test(`${v.area} ${v.notes}`);
  const map = new Map<string, Venue>();
  for (const v of list) {
    const k = `${v.name}__${v.city}`;
    if (!map.has(k) && !isSidewalkOnly(v)) map.set(k, v);
  }
  return [...map.values()];
}

export function cityOptionsFor(region: Region): string[] {
  const both = getVenues(region,'bars').concat(getVenues(region,'coffee'));
  return Array.from(new Set(both.map(v=>v.city))).sort();
}
