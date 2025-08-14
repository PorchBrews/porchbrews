"use client";

import { usePlusFlag } from "./PlusFlag";

export default function PlusClient({ paymentLink }: { paymentLink: string }) {
  const { isPlus, activate, deactivate } = usePlusFlag();

  return (
    <div className="mt-4">
      <div className="mb-2">
        {isPlus ? (
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
            Plus Active
          </span>
        ) : (
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-slate-100">
            Not a Plus member
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={paymentLink}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-slate-50"
        >
          Join Plus
        </a>

        {!isPlus && (
          <button
            onClick={activate}
            className="rounded-2xl border px-4 py-2 hover:bg-slate-50"
          >
            I already joined — Activate ad-free
          </button>
        )}

        {isPlus && (
          <button
            onClick={deactivate}
            className="rounded-2xl border px-4 py-2 hover:bg-slate-50"
          >
            Disable ad-free
          </button>
        )}
      </div>
    </div>
  );
}
