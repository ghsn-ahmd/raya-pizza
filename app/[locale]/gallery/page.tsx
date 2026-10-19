import type { Metadata } from 'next';
import { Camera, Facebook } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { SITE } from '@/constants/site';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return buildMetadata(locale, '/gallery', t.gallery.title, t.gallery.subtitle);
}

export default function GalleryPage({ params }: Props) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);

  return (
    <>
      <PageHeader title={t.gallery.title} subtitle={t.gallery.subtitle} />
      <div className="container-page py-12">
        {GALLERY_IMAGES.length === 0 ? (
          <div className="mx-auto max-w-md py-12 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-muted">
              <Camera aria-hidden className="h-9 w-9" />
            </span>
            <h2 className="mt-6 text-2xl">{t.gallery.emptyTitle}</h2>
            <p className="mt-2 text-muted">{t.gallery.emptyDesc}</p>
            <ButtonLink href={SITE.facebook} className="mt-6">
              <Facebook aria-hidden className="h-5 w-5" />
              {t.gallery.cta}
            </ButtonLink>
          </div>
        ) : (
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {GALLERY_IMAGES.map((img, i) => (
              <li key={img.src} className="mb-4 break-inside-avoid">
                <Reveal delay={(i % 3) * 0.06}>
                  <Image
                    src={img.src}
                    alt={img.alt[locale]}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full rounded-lg"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
