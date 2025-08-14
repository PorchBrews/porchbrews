export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();
    if (!email) return new Response('Missing email', { status: 400 });

    const provider = process.env.NEWSLETTER_PROVIDER || 'supabase';

    if (provider === 'mailchimp') {
      const key = process.env.MAILCHIMP_API_KEY!;
      const listId = process.env.MAILCHIMP_LIST_ID!;
      const dc = key.split('-')[1];
      const r = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `apikey ${key}` },
        body: JSON.stringify({ email_address: email, status: 'subscribed', tags: ['PorchBrews', source||'unknown'] })
      });
      if (!r.ok) return new Response('Mailchimp error', { status: 502 });
      return new Response('ok');
    } else {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const r = await fetch(`${url}/rest/v1/newsletter_signups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anon, 'Authorization': `Bearer ${anon}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify([{ email, source }])
      });
      if (!r.ok) return new Response('Supabase error', { status: 502 });
      return new Response('ok');
    }
  } catch {
    return new Response('Bad Request', { status: 400 });
  }
}
