export default function Home() {
  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold">Porch Brews</h1>
      <p className="mt-2">Choose a directory:</p>
      <ul className="list-disc pl-6 mt-3">
        <li><a className="underline" href="/loco/bars">Lowcountry — Bars & Restaurants</a></li>
        <li><a className="underline" href="/loco/coffee">Lowcountry — Coffee & Tea</a></li>
        <li><a className="underline" href="/chs/bars">Greater Charleston — Bars & Restaurants</a></li>
        <li><a className="underline" href="/chs/coffee">Greater Charleston — Coffee & Tea</a></li>
      </ul>
    </main>
  );
}
