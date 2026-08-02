import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { DashboardPage, StatCard } from "@/components/dashboard/StatCard";
import InvestmentGrowthChart from "@/components/dashboard/InvestmentGrowthChart";
import { Loading, ErrorState, Empty } from "@/components/dashboard/DataState";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatUSD, formatDate } from "@/utils/formatters";

const statusTone = { completed: "success", pending: "warning", failed: "danger" };

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const firstName = (user?.fullName || "Investor").split(" ")[0];
  const { status, error, balance, portfolio, earnings, transactions, load } = useDashboardStore();

  useEffect(() => { load(); }, []); // eslint-disable-line

  return (
    <DashboardPage
      title={`Welcome back, ${firstName}`}
      subtitle="Here's how your portfolio is performing today."
      action={
        <Button to="/dashboard/plans" variant="primary" size="md" icon={<Plus size={16} />}>
          New Investment
        </Button>
      }
    >
      {status === "loading" && <Loading label="Loading your dashboard…" />}
      {status === "error" && <ErrorState message={error} onRetry={() => load(true)} />}

      {status === "ready" && balance && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard accent icon="Wallet" label="Total balance" value={formatUSD(balance.total)} sub="Across all assets" />
            <StatCard icon="TrendingUp" label="Total earnings" value={formatUSD(balance.earnings)} sub="Accrued to date" />
            <StatCard icon="Briefcase" label="Invested" value={formatUSD(balance.invested)} sub={`${portfolio.length} active plans`} />
            <StatCard icon="HandCoins" label="Available" value={formatUSD(balance.available)} sub="Ready to invest" />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader
                title="Earnings growth"
                subtitle="Cumulative daily yield"
                action={
                  <Link to="/dashboard/performance" className="inline-flex items-center gap-1 text-sm text-gold hover:underline">
                    Details <ArrowUpRight size={14} />
                  </Link>
                }
              />
              <CardBody><InvestmentGrowthChart data={earnings} /></CardBody>
            </Card>

            <Card>
              <CardHeader title="Active plans" action={<Link to="/dashboard/portfolio" className="text-sm text-gold hover:underline">All</Link>} />
              <CardBody className="space-y-3">
                {portfolio.length === 0 && <p className="py-6 text-center text-sm text-muted">No active plans yet.</p>}
                {portfolio.slice(0, 4).map((p) => (
                  <div key={p.id} className="rounded-xl border border-gold-deep/12 bg-charcoal-50 p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-gradient text-ink-900">
                        <Icon name={p.icon} size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-600 text-parchment">{p.asset}</div>
                        <div className="text-xs text-muted">{formatUSD(p.principal)} · {p.daysLeft}d left</div>
                      </div>
                      <div className="text-sm font-700 text-gold-bright">+{formatUSD(p.accrued)}</div>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink-900">
                      <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${p.progress * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          <Card className="mt-5">
            <CardHeader title="Recent transactions" action={<span className="text-sm text-muted">Latest activity</span>} />
            <CardBody className="overflow-x-auto">
              {transactions.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted">No transactions yet.</p>
              ) : (
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-muted">
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Source</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-deep/10">
                    {transactions.map((t) => (
                      <tr key={t.id} className="text-parchment/90">
                        <td className="py-3 font-medium">{t.type}</td>
                        <td className="py-3 text-muted">{t.asset}</td>
                        <td className="py-3 font-600">{formatUSD(t.amount)}</td>
                        <td className="py-3"><Badge tone={statusTone[t.status]}>{t.status}</Badge></td>
                        <td className="py-3 text-muted">{formatDate(t.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </DashboardPage>
  );
}
