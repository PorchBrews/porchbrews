import Script from 'next/script';
import Directory from '../../../components/Directory';
import { regionTitle, regionDescription, regionJsonLd } from '../../../lib/seo';
import { getVenues } from '../../../lib/data';

export async function generateMetadata({ params }:{ params:{ tab: 'bars'|'coffee' } }) {
  const title = regionTitle('loco', params.tab);
  const description = regionDescription('loco', params.tab);
  return { title, description, alternates: { canonical: `/loco/${params.tab}` } };
}

export default function Page({ params }:{ params:{ tab: 'bars'|'coffee' } }) {
  const url = `/loco/${params.tab}`;
  const jsonLd = regionJsonLd(url, getVenues('loco', params.tab));
  return (
    <>
      <Script id="ld-loco" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      <Directory region="loco" tab={params.tab}/>
    </>
  );
}
