import { ArrowRight } from "lucide-react";
import { FINAL_CTA } from "@/lib/site";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function FinalCTA() {
  const c = FINAL_CTA;
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] border border-gold-deep/25 bg-gradient-to-br from-charcoal-50 via-charcoal to-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-bright/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

          <div className="relative">
            <Badge tone="gold" className="mx-auto">
              <span className="eyebrow-dot" />
              {c.badge}
            </Badge>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-700 leading-tight text-parchment sm:text-[2.75rem]">
              {c.heading[0]}
              <br />
              <span className="text-gold-grad">{c.heading[1]}</span>
            </h2>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to={c.primaryCta.to} variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                {c.primaryCta.label}
              </Button>
              <Button to={c.secondaryCta.to} variant="outline" size="lg">
                {c.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
