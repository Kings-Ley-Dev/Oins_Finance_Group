import { ArrowRight, ShieldCheck, Eye, Layers, Sparkles, Target, Compass } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { STATS } from "@/lib/site";

const VALUES = [
  { icon: Eye, title: "Transparency", body: "Real-time tracking and clear documentation on every position - you always know where your capital is." },
  { icon: ShieldCheck, title: "Security", body: "Collateral-backed assets, encrypted data and institutional-grade custody protect your investment." },
  { icon: Layers, title: "Accessibility", body: "Start from just $100 and diversify across eight specialized sectors from a single dashboard." },
  { icon: Sparkles, title: "Innovation", body: "Technology and data-driven strategies bring institutional opportunities to everyday investors." },
];

export default function About() {
  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 pt-[120px]">
        <div className="pointer-events-none absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about/hero.jpg')" }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/72 via-ink-900/66 to-ink-900/93" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_8%,rgba(230,194,90,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
        <div className="shell relative pb-16">
          <Badge tone="gold" className="mb-5"><span className="eyebrow-dot" />About Oins Finance Group</Badge>
          <h1 className="max-w-3xl font-display text-4xl font-700 leading-tight text-parchment sm:text-5xl [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            Financing real-world assets, transparently.
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-parchment/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]">
            We connect investors with collateral-backed opportunities across agriculture, energy, real
            estate, technology and more - under a fully regulated, transparent framework built for
            consistent, secure returns.
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="bg-ink">
        <div className="shell py-16 sm:py-20">
          {/* Lead statement */}
          <section className="mb-16 border-l-2 border-gold/50 pl-5 sm:pl-7">
            <p className="max-w-3xl text-lg leading-relaxed text-parchment/90 sm:text-xl">
              Oins Finance Group is a top-tier fiscal management platform, fully regulated in the EU and
              delivering tailored financial services to clienteles. We create suitable investment
              opportunities with the goal of meeting the financial objectives of clients - irrespective of
              their current financial position. Our focus is to provide high-value financial assets that
              ensure a stable return on our clients' investments.
            </p>
          </section>

          {/* Intro + image collage */}
          <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-700 text-parchment sm:text-3xl">
                A 360° investment platform built on trust.
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">
                <p>
                  Oins Finance Group was founded on a simple belief: that secure, asset-backed
                  investing shouldn't be reserved for institutions. We bridge the gap between
                  everyday investors and real-world opportunities that generate genuine value.
                </p>
                <p>
                  By combining capital, technology, trade and regulation, we enable individuals
                  and businesses to invest in the sectors that power the global economy - with
                  full visibility and collateral protection on every position.
                </p>
              </div>
              <Button to="/register" variant="primary" size="lg" className="mt-7" icon={<ArrowRight size={16} />}>
                Start Investing
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/images/about/realestate.jpg" alt="Markets and real estate" className="h-48 w-full rounded-card border border-gold-deep/15 object-cover sm:h-56" />
              <img src="/images/about/agriculture.jpg" alt="Agriculture" className="mt-8 h-48 w-full rounded-card border border-gold-deep/15 object-cover sm:h-56" />
              <img src="/images/about/digital.jpg" alt="Digital assets" className="h-48 w-full rounded-card border border-gold-deep/15 object-cover sm:h-56" />
              <img src="/images/about/energy.jpg" alt="Energy" className="mt-8 h-48 w-full rounded-card border border-gold-deep/15 object-cover sm:h-56" />
            </div>
          </section>

          {/* Stats band */}
          <section className="mt-20">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-gold-deep/25 bg-gold-deep/10 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-charcoal/80 px-5 py-7 text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-black text-gold">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <div className="font-display text-2xl font-700 text-gold-bright sm:text-3xl">{s.value}</div>
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-card border border-gold-deep/15 bg-charcoal p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-ink-900"><Target size={22} /></span>
              <h3 className="mt-5 font-display text-xl font-700 text-parchment">Our Mission</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                To democratize access to secure, real-world investments - empowering people
                everywhere to grow their wealth through transparent, collateral-backed assets.
              </p>
            </div>
            <div className="rounded-card border border-gold-deep/15 bg-charcoal p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-ink-900"><Compass size={22} /></span>
              <h3 className="mt-5 font-display text-xl font-700 text-parchment">Our Vision</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                To become the world's most trusted platform for asset-backed investing, connecting
                global capital with the sectors that build a more sustainable, prosperous future.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="mt-20">
            <h2 className="text-center font-display text-2xl font-700 text-parchment sm:text-3xl">What we stand for</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => {
                const I = v.icon;
                return (
                  <div key={v.title} className="rounded-card border border-gold-deep/15 bg-charcoal p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-deep/30 bg-black text-gold"><I size={20} /></span>
                    <h3 className="mt-4 font-display font-600 text-parchment">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-[28px] border border-gold-deep/25 px-6 py-14 text-center sm:px-12">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-ink-900/90 via-ink-900/82 to-ink-900/95" />
              <div className="relative">
                <h2 className="mx-auto max-w-xl font-display text-3xl font-700 text-parchment">
                  Invest with a platform built on <span className="text-gold-grad">transparency</span>.
                </h2>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button to="/register" variant="primary" size="lg" icon={<ArrowRight size={16} />}>Create an account</Button>
                  <Button to="/contact" variant="outline" size="lg">Talk to our team</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
