export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // {venue,type,region,tab,ts}
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && anon) {
      await fetch(`${url}/rest/v1/click_events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': anon, 'Authorization': `Bearer ${anon}`, 'Prefer': 'return=minimal' },
        body: JSON.stringify([body])
      });
    }
    return new Response('ok');
  } catch {
    return new Response('Bad Request', { status: 400 });
  }
}
