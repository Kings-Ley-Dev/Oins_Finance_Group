import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import { OPPORTUNITIES } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

export default function Investments() {
  return (
    <PageShell
      eyebrow="Services"
      title="Browse verified investment opportunities."
      subtitle="A public catalogue of active, collateral-backed investment tiers. Open any opportunity to learn more, then subscribe from your dashboard."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OPPORTUNITIES.items.map((o) => (
          <div key={o.key} className="flex flex-col rounded-card border border-gold-deep/15 bg-charcoal p-6">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-ink-900">
              <Icon name={o.icon} size={20} />
            </div>
            <Link to={`/services/${o.key}`} className="font-display text-lg font-600 text-parchment hover:text-gold">
              {o.name}
            </Link>
            <p className="mt-2 flex-1 text-sm text-muted">{o.body}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-display font-700 text-gold-bright">{o.roi}</span>
              <span className="text-muted">{o.term}</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button to={`/services/${o.key}`} variant="secondary" size="sm" className="flex-1">
                Learn more
              </Button>
              <Button to="/register" variant="primary" size="sm" className="flex-1" icon={<ArrowRight size={14} />}>
                Invest
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
