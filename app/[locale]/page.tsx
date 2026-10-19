import { FaqSection } from '@/components/home/FaqSection';
import { FacebookCta } from '@/components/home/FacebookCta';
import { Facts } from '@/components/home/Facts';
import { Features } from '@/components/home/Features';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Popular } from '@/components/home/Popular';
import { getDict, resolveLocale } from '@/lib/i18n';
import { faqJsonLd } from '@/lib/seo';

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);

  return (
    <>
      <Hero />
      <Facts t={t} />
      <Features t={t} />
      <HowItWorks t={t} />
      <Popular t={t} locale={locale} />
      <FacebookCta t={t} />
      <FaqSection t={t} locale={locale} />
      <FinalCta t={t} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(t.faq.items)) }}
      />
    </>
  );
}
