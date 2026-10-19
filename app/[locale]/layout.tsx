import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import '@fontsource/noto-kufi-arabic/700.css';
import '@fontsource/noto-kufi-arabic/800.css';
import '../globals.css';

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { PageTransition } from '@/components/ui/PageTransition';
import { Providers } from '@/components/Providers';
import { SITE } from '@/constants/site';
import { THEME_INIT_SCRIPT } from '@/hooks/useTheme';
import { getDict, getDir, isLocale, locales } from '@/lib/i18n';
import { buildMetadata, restaurantJsonLd } from '@/lib/seo';

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0e' },
  ],
};

export function generateMetadata({ params }: LayoutProps): Metadata {
  if (!isLocale(params.locale)) return {};
  const t = getDict(params.locale);
  return {
    metadataBase: new URL(SITE.url),
    ...buildMetadata(params.locale, '/', t.meta.title, t.meta.description),
    title: { default: t.meta.title, template: `%s | ${t.meta.siteName}` },
    applicationName: t.meta.siteName,
    icons: { icon: '/brand/symbol-dark.svg' },
  };
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDict(locale);

  return (
    <html lang={locale} dir={getDir(locale)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-brand px-4 py-2 font-bold text-brand-fg focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t.common.skipToContent}
        </a>
        <Providers locale={locale} t={t}>
          <Header />
          <main id="main" className="min-h-[70vh]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={locale} />
          <WhatsAppFloat />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(locale)) }}
        />
      </body>
    </html>
  );
}
