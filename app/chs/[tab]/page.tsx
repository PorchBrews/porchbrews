import Script from 'next/script';
import Directory from '../../../components/Directory';
import { regionTitle, regionDescription, regionJsonLd } from '../../../lib/seo';
import { getVenues } from '../../../lib/data';

export async function generateMetadata({ params }:{ params:{ tab: 'bars'|'coffee' } }) {
  const title = regionTitle('chs', params.tab);
  const description = regionDescription('chs', params.tab);
  return { title, description, alternates: { canonical: `/chs/${params.tab}` } };
}

export default function Page({ params }:{ params:{ tab: 'bars'|'coffee' } }) {
  const url = `/chs/${params.tab}`;
  const jsonLd = regionJsonLd(url, getVenues('chs', params.tab));
  return (
    <>
      <Script id="ld-chs" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      <Directory region="chs" tab={params.tab}/>
    </>
  );
}
