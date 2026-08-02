import { useState } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";
import { OPPORTUNITIES } from "@/lib/site";
import { subscribePlan } from "@/lib/dashboardService";
import { useUiStore } from "@/store/uiStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatUSD } from "@/utils/formatters";

function PlanCard({ plan }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const pushToast = useUiStore((s) => s.pushToast);
  const reload = useDashboardStore((s) => s.load);

  const subscribe = async () => {
    const v = Number(amount);
    if (!v || v < 100) {
      pushToast({ type: "error", title: "Minimum is $100", message: "Enter a valid amount to invest." });
      return;
    }
    setLoading(true);
    try {
      await subscribePlan({ assetKey: plan.key, principal: v });
      pushToast({ type: "success", title: "Investment created", message: `${formatUSD(v)} into ${plan.name}.` });
      setAmount("");
      reload(true); // refresh portfolio + balances
    } catch (err) {
      pushToast({
        type: "error",
        title: "Could not invest",
        message: err?.response?.data?.message || "Check your available balance or start the API.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <div className={`relative h-28 overflow-hidden rounded-t-card bg-gradient-to-br ${plan.tint}`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-black/30 text-white">
          <Icon name={plan.icon} size={18} />
        </span>
      </div>
      <CardBody className="flex flex-1 flex-col">
        <h3 className="font-display text-lg font-600 text-parchment">{plan.name}</h3>
        <div className="mt-2 flex items-center justify-between text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted">Return</div>
            <div className="font-700 text-gold-bright">{plan.roi}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-muted">Term</div>
            <div className="font-600 text-parchment">{plan.term}</div>
          </div>
        </div>
        <div className="mt-4 flex items-end gap-2">
          <Input className="flex-1" type="number" placeholder="Amount (min $100)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button onClick={subscribe} variant="primary" size="md" loading={loading}>Invest</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default function Plans() {
  return (
    <DashboardPage title="Investment plans" subtitle="Browse verified, collateral-backed assets and subscribe.">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {OPPORTUNITIES.items.map((p) => (
          <PlanCard key={p.key} plan={p} />
        ))}
      </div>
    </DashboardPage>
  );
}
