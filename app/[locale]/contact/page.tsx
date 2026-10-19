import type { Metadata } from 'next';
import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { SITE } from '@/constants/site';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return buildMetadata(locale, '/contact', t.contact.title, t.contact.subtitle);
}

export default function ContactPage({ params }: Props) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  const mapSrc = `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=17&output=embed`;

  return (
    <>
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />
      <div className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <div className="space-y-4">
          <ul className="space-y-3">
            <li className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5">
              <Phone aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-sm font-bold text-muted">{t.contact.phone}</p>
                <a href={`tel:${SITE.phoneTel}`} dir="ltr" className="text-xl font-extrabold hover:text-brand">
                  {SITE.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5">
              <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-sm font-bold text-muted">{t.contact.address}</p>
                <p className="font-bold">{SITE.address[locale]}</p>
              </div>
            </li>
            {SITE.hours && (
              <li className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5">
                <Clock aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-bold text-muted">{t.contact.hours}</p>
                  <p className="font-bold">{SITE.hours[locale]}</p>
                </div>
              </li>
            )}
          </ul>

          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title={t.contact.mapTitle}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
            />
          </div>
          <ButtonLink href={SITE.mapsUrl} variant="secondary" className="w-full">
            <ExternalLink aria-hidden className="h-4 w-4" />
            {t.contact.openMap}
          </ButtonLink>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
