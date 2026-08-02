import { useEffect } from "react";
import { DashboardPage, StatCard } from "@/components/dashboard/StatCard";
import { Loading, ErrorState, Empty } from "@/components/dashboard/DataState";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import InvestmentGrowthChart from "@/components/dashboard/InvestmentGrowthChart";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatUSD } from "@/utils/formatters";

export default function Performance() {
  const { status, error, earnings, portfolio, load } = useDashboardStore();
  useEffect(() => { load(); }, []); // eslint-disable-line

  const latest = earnings.length ? earnings[earnings.length - 1].value : 0;
  const first = earnings.length ? earnings[0].value : 0;
  const gain = latest - first;
  const pct = first ? ((gain / first) * 100).toFixed(1) : "0.0";

  return (
    <DashboardPage title="Performance" subtitle="Daily yield increments from your earnings ledger.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={() => load(true)} />}
      {status === "ready" && (
        earnings.every((e) => e.value === 0) && portfolio.length === 0 ? (
          <Empty title="No performance data yet" hint="Once you invest, your daily yield will appear here."
            action={<Button to="/dashboard/plans" variant="primary" size="md">Explore plans</Button>} />
        ) : (
          <>
            <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
              <StatCard accent icon="TrendingUp" label="Cumulative earnings" value={formatUSD(latest)} />
              <StatCard icon="LineChart" label="30-day gain" value={`+${formatUSD(gain)}`} sub={`+${pct}%`} />
              <StatCard icon="Briefcase" label="Contributing plans" value={portfolio.length} />
            </div>
            <Card>
              <CardHeader title="Earnings growth" subtitle="Cumulative · last 30 days" />
              <CardBody><InvestmentGrowthChart data={earnings} height={300} /></CardBody>
            </Card>
            <Card className="mt-5">
              <CardHeader title="By asset" />
              <CardBody className="space-y-3">
                {portfolio.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-charcoal-50 text-gold">
                      <Icon name={p.icon} size={16} />
                    </span>
                    <span className="flex-1 text-sm text-parchment">{p.asset}</span>
                    <span className="text-sm font-700 text-gold-bright">+{formatUSD(p.accrued)}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </>
        )
      )}
    </DashboardPage>
  );
}
