import type { Metadata } from 'next';
import { Accordion } from '@/components/ui/Accordion';
import { PageHeader } from '@/components/ui/PageHeader';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return buildMetadata(locale, '/faq', t.faq.eyebrow, t.faq.subtitle);
}

export default function FaqPage({ params }: Props) {
  const t = getDict(resolveLocale(params.locale));
  return (
    <>
      <PageHeader title={t.faq.title} subtitle={t.faq.subtitle} />
      <div className="container-page max-w-3xl py-12">
        <Accordion items={t.faq.items} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(t.faq.items)) }}
      />
    </>
  );
}
