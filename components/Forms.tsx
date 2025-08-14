"use client";
import { useState } from 'react';

export function NewsletterForm({ source }: { source: string }) {
  const [email, setEmail] = useState(''); const [state, setState] = useState<'idle'|'sending'|'ok'|'err'>('idle');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('sending');
    try {
      const res = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, source }) });
      setState(res.ok ? 'ok' : 'err');
    } catch { setState('err'); }
  };
  return (
    <form onSubmit={submit} className="mt-4 flex gap-2">
      <input required type="email" value={email} onChange={e=>setEmail(e.currentTarget.value)}
             placeholder="you@example.com" className="w-full rounded-xl border px-3 py-2 text-sm"/>
      <button disabled={state==='sending' || !email} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-50">
        {state==='sending'? 'Submitting…' : 'Subscribe'}
      </button>
      {state==='ok'  && <span className="text-xs text-green-600 self-center">Thanks! Check your inbox.</span>}
      {state==='err' && <span className="text-xs text-red-600 self-center">Error. Try again.</span>}
    </form>
  );
}
