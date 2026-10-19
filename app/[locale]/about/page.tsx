import type { Metadata } from 'next';
import { ChefHat, Flame, Bike, type LucideIcon } from 'lucide-react';
import { FinalCta } from '@/components/home/FinalCta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { getDict, resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

type Props = { params: { locale: string } };

const TEAM_ICONS: LucideIcon[] = [Flame, ChefHat, Bike];

export function generateMetadata({ params }: Props): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return buildMetadata(locale, '/about', t.about.title, t.about.intro);
}

export default function AboutPage({ params }: Props) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);

  return (
    <>
      <PageHeader title={t.about.title} subtitle={t.about.intro} />
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">{t.about.storyTitle}</h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              {t.about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div>
            <h2 className="sr-only">{t.about.teamTitle}</h2>
            <ul className="grid gap-4">
              {t.about.team.map((member, i) => {
                const Icon = TEAM_ICONS[i] ?? Flame;
                return (
                  <li key={member.title}>
                    <Reveal delay={i * 0.08}>
                      <div className="flex gap-4 rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-lift">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-brand/10 text-brand">
                          <Icon aria-hidden className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg">{member.title}</h3>
                          <p className="mt-1 text-muted">{member.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <FinalCta t={t} locale={locale} />
    </>
  );
}
