import { ArrowRight } from "lucide-react";
import { HERO, STATS } from "@/lib/site";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-16 pt-[120px] sm:pb-20">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Black + gold theme overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/78 to-ink-900/95" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_15%,rgba(230,194,90,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-ink-900/40 mix-blend-multiply" />

      {/* Ambient texture + accents */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,97,.5),transparent)" }}
      />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up">
            <Badge tone="gold" className="mx-auto">
              <span className="eyebrow-dot" />
              {HERO.badge}
            </Badge>
          </div>

          <h1 className="mt-7 font-display text-[2.6rem] font-700 leading-[1.05] tracking-tight text-parchment sm:text-6xl">
            {HERO.titleLead}{" "}
            <span className="text-gold-grad">{HERO.titleAccent}</span> {HERO.titleTail}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            {HERO.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={HERO.primaryCta.to} variant="primary" size="lg" icon={<ArrowRight size={16} />}>
              {HERO.primaryCta.label}
            </Button>
            <Button to={HERO.secondaryCta.to} variant="secondary" size="lg">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Stats card */}
        <div className="mx-auto mt-14 max-w-4xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold/80">
            {HERO.statsHeading}
          </p>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-gold-deep/25 bg-gold-deep/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-charcoal/80 px-5 py-6 text-center backdrop-blur"
              >
                <div className="flex items-center justify-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-black text-gold">
                    <Icon name={s.icon} size={18} strokeWidth={2} />
                  </span>
                  <div className="font-display text-2xl font-700 text-gold-bright sm:text-3xl">
                    {s.value}
                  </div>
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
