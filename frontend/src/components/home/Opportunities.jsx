import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OPPORTUNITIES } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Reveal from "@/components/common/Reveal";

function OpportunityCard({ o }) {
  const isExternal = Boolean(o.externalUrl);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-gold-deep/15 bg-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-gold-deep/40 hover:shadow-lift">
      {/* Sector photo header */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('/images/services/${o.key}.jpg')` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${o.tint} opacity-25`} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/40 text-white backdrop-blur">
          <Icon name={o.icon} size={20} strokeWidth={2} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {o.externalOnly ? (
          <a
            href={o.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xl font-600 text-parchment transition-colors hover:text-gold"
          >
            {o.name}
          </a>
        ) : (
          <Link
            to={`/services/${o.key}`}
            className="font-display text-xl font-600 text-parchment transition-colors hover:text-gold"
          >
            {o.name}
          </Link>
        )}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{o.body}</p>

        {!isExternal && (
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gold-deep/15 pt-5">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Return on investment</div>
              <div className="mt-1 font-display text-lg font-700 text-gold-bright">{o.roi}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">Investment term</div>
              <div className="mt-1 font-display text-lg font-700 text-parchment">{o.term}</div>
            </div>
          </div>
        )}

        {isExternal ? (
          <Button
            href={o.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="mt-5 w-full"
            icon={<ArrowRight size={15} />}
          >
            Learn More
          </Button>
        ) : (
          <Button
            to="/register"
            variant="primary"
            size="md"
            className="mt-5 w-full"
            icon={<ArrowRight size={15} />}
          >
            Invest Now
          </Button>
        )}
      </div>
    </article>
  );
}

export default function Opportunities() {
  return (
    <section className="relative bg-ink-900 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="shell relative">
        <div className="text-center">
          <span className="eyebrow mx-auto">
            <span className="eyebrow-dot animate-pulse" />
            {OPPORTUNITIES.eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-700 leading-[48px] text-parchment sm:text-[2.5rem]">
            {OPPORTUNITIES.heading}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {OPPORTUNITIES.items.map((o, idx) => (
            <Reveal key={o.key} delay={(idx % 2) * 130}>
              <OpportunityCard o={o} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
