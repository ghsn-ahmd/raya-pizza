import type { Metadata } from 'next';
import { MenuBrowser } from '@/components/menu/MenuBrowser';
import { PageHeader } from '@/components/ui/PageHeader';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return buildMetadata(locale, '/menu', t.menu.title, t.menu.subtitle);
}

export default function MenuPage({ params }: Props) {
  const t = getDict(resolveLocale(params.locale));
  return (
    <>
      <PageHeader title={t.menu.title} subtitle={t.menu.subtitle} />
      <div className="container-page pb-10 pt-6">
        <MenuBrowser />
      </div>
    </>
  );
}
