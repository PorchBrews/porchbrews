import Script from "next/script";
import { pageJsonLd } from "../../lib/seo";
import { NewsletterForm } from "../../components/Forms";
import PlusClient from "../../components/PlusClient";

export const metadata = {
  title: "Plus | Porch Brews",
  description: "Ad-free browsing, saved lists, alerts.",
};

export default function Plus() {
  const jsonLd = pageJsonLd(
    "/plus",
    "Plus | Porch Brews",
    "Ad-free and member perks"
  );
  const link = process.env.NEXT_PUBLIC_PLUS_PAYMENT_LINK || "#";

  return (
    <>
      <Script
        id="ld-plus"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl font-bold">Porch Brews Plus</div>
        <p className="mt-2 text-slate-600 text-sm">
          Ad-free browsing, saved lists, trip builder, and “perfect porch hour”
          alerts.
        </p>
        <ul className="mt-3 list-disc pl-6 text-sm text-slate-700 space-y-1">
          <li>Ad-free across all regions</li>
          <li>Save & share lists; export to Google Maps</li>
          <li>Sunset & weather alerts</li>
          <li>Early access to seasonal guides</li>
        </ul>

        {/* Client-only buttons & status */}
        <PlusClient paymentLink={link} />

        <div className="mt-6 rounded-2xl border p-4">
          <div className="font-semibold">Subscribe to the newsletter</div>
          <div className="text-sm text-slate-600">
            Guides, itineraries, and member-only alerts.
          </div>
          <NewsletterForm source="plus" />
        </div>
      </div>
    </>
  );
}
