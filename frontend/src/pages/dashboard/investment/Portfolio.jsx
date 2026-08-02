import { useEffect } from "react";
import { DashboardPage, StatCard } from "@/components/dashboard/StatCard";
import { Loading, ErrorState, Empty } from "@/components/dashboard/DataState";
import Card, { CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatUSD } from "@/utils/formatters";

export default function Portfolio() {
  const { status, error, balance, portfolio, load } = useDashboardStore();
  useEffect(() => { load(); }, []); // eslint-disable-line

  const totalAccrued = portfolio.reduce((s, p) => s + p.accrued, 0);

  return (
    <DashboardPage title="Portfolio" subtitle="Your active plans and cumulative gains.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={() => load(true)} />}
      {status === "ready" && (
        portfolio.length === 0 ? (
          <Empty
            title="No investments yet"
            hint="Browse verified, collateral-backed plans and make your first investment."
            action={<Button to="/dashboard/plans" variant="primary" size="md">Explore plans</Button>}
          />
        ) : (
          <>
            <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
              <StatCard accent icon="Briefcase" label="Total invested" value={formatUSD(balance?.invested || 0)} />
              <StatCard icon="TrendingUp" label="Total accrued" value={formatUSD(totalAccrued)} />
              <StatCard icon="Layers" label="Active plans" value={portfolio.length} />
            </div>
            <div className="space-y-4">
              {portfolio.map((p) => (
                <Card key={p.id}>
                  <CardBody>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-ink-900">
                        <Icon name={p.icon} size={20} />
                      </span>
                      <div className="min-w-[140px] flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-base font-600 text-parchment">{p.asset}</h3>
                          <Badge tone="success">{p.status}</Badge>
                        </div>
                        <div className="text-xs text-muted">{p.roi} · {p.term}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[11px] uppercase tracking-wider text-muted">Principal</div>
                        <div className="font-600 text-parchment">{formatUSD(p.principal)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[11px] uppercase tracking-wider text-muted">Accrued</div>
                        <div className="font-700 text-gold-bright">+{formatUSD(p.accrued)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[11px] uppercase tracking-wider text-muted">Days left</div>
                        <div className="font-600 text-parchment">{p.daysLeft}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-xs text-muted">
                        <span>Term progress</span>
                        <span>{Math.round(p.progress * 100)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-ink-900">
                        <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${p.progress * 100}%` }} />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )
      )}
    </DashboardPage>
  );
}
