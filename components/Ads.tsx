export const BannerAd = ({ slot }: { slot?: string }) => (
  <div className="rounded-2xl border border-dashed p-3 text-center text-xs text-slate-500">
    Advertisement {slot ? `— ${slot}` : ''}
  </div>
);

export const NativeAd = ({ slot }: { slot?: string }) => (
  <div className="rounded-2xl border border-dashed p-6 text-center text-xs text-slate-500">
    Ad Slot {slot || ''}
  </div>
);
