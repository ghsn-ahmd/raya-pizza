import type { Metadata } from 'next';
import { PolicyPage } from '@/components/ui/PolicyPage';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return buildMetadata(locale, '/privacy', t.privacy.title, t.privacy.sections[0]?.items[0] ?? t.meta.description);
}

export default function PrivacyPage({ params }: Props) {
  const t = getDict(resolveLocale(params.locale));
  return <PolicyPage title={t.privacy.title} sections={t.privacy.sections} />;
}
