import { Link } from "react-router-dom";
import { OPPORTUNITIES } from "@/lib/site";
import Icon from "@/components/ui/Icon";

function ServiceCard({ item, onNavigate }) {
  const isExternal = Boolean(item.externalUrl);
  const commonProps = {
    onClick: onNavigate,
    className:
      "group relative block h-[68px] overflow-hidden rounded-xl border border-gold-deep/15 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50",
  };
  const inner = (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url('/images/services/${item.key}.jpg')` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${item.tint} opacity-25`} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/35 to-transparent" />
      <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur">
        <Icon name={item.icon} size={14} />
      </span>
      <span className="absolute bottom-2.5 left-3 text-sm font-600 text-white drop-shadow">
        {item.name}
      </span>
    </>
  );

  return isExternal ? (
    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" {...commonProps}>
      {inner}
    </a>
  ) : (
    <Link to={`/services/${item.key}`} {...commonProps}>
      {inner}
    </Link>
  );
}

export default function ServicesMega({ onNavigate }) {
  return (
    <div className="grid grid-cols-1 gap-7 p-7 lg:grid-cols-[260px_1fr]">
      {/* Intro column */}
      <div className="flex flex-col justify-center">
        <h3 className="font-display text-2xl font-700 leading-tight text-gold-grad">
          A 360° Investment Platform
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Oins Finance Group offers collateral-backed opportunities across eight
          specialized sectors - built for transparent, consistent and secure returns.
        </p>
      </div>

      {/* Service grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {OPPORTUNITIES.items.map((item) => (
          <ServiceCard key={item.key} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
