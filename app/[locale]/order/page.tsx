import type { Metadata } from 'next';
import { OrderView } from '@/components/order/OrderView';
import { PageHeader } from '@/components/ui/PageHeader';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return {
    ...buildMetadata(locale, '/order', t.order.title, t.order.subtitle),
    robots: { index: false, follow: true },
  };
}

export default function OrderPage({ params }: Props) {
  const t = getDict(resolveLocale(params.locale));
  return (
    <>
      <PageHeader title={t.order.title} subtitle={t.order.subtitle} />
      <div className="container-page py-10">
        <OrderView />
      </div>
    </>
  );
}
