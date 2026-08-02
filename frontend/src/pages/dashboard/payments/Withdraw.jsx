import { useEffect, useState } from "react";
import { Landmark, Bitcoin } from "lucide-react";
import { DashboardPage, StatCard } from "@/components/dashboard/StatCard";
import Card, { CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { requestWithdrawal } from "@/lib/paymentService";
import { useUiStore } from "@/store/uiStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatUSD } from "@/utils/formatters";

const COINS = ["BTC", "ETH", "USDT"];

export default function Withdraw() {
  const [method, setMethod] = useState("bank");
  const [coin, setCoin] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [dest, setDest] = useState("");
  const [loading, setLoading] = useState(false);

  const pushToast = useUiStore((s) => s.pushToast);
  const { balance, load } = useDashboardStore();
  useEffect(() => { load(); }, []); // eslint-disable-line

  const available = balance?.available || 0;
  const invested = balance?.invested || 0;

  const submit = async () => {
    const v = Number(amount);
    if (!v || v <= 0) return pushToast({ type: "error", title: "Enter an amount" });
    if (v > available) return pushToast({ type: "error", title: "Insufficient balance", message: `Available: ${formatUSD(available)}` });
    if (!dest || dest.length < 4) return pushToast({ type: "error", title: "Enter a destination" });
    setLoading(true);
    try {
      await requestWithdrawal({ method, amount: v, destination: dest, coin: method === "crypto" ? coin : undefined });
      pushToast({ type: "success", title: "Withdrawal requested", message: "Pending admin approval (Phase 6)." });
      setAmount(""); setDest("");
      load(true);
    } catch (err) {
      pushToast({ type: "error", title: "Withdrawal failed", message: err?.response?.data?.message || "Start the API or use demo mode." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardPage title="Withdraw" subtitle="Request a payout to your bank or wallet.">
      <div className="mb-5 grid grid-cols-2 gap-4">
        <StatCard accent icon="Wallet" label="Available" value={formatUSD(available)} />
        <StatCard icon="Briefcase" label="Locked in plans" value={formatUSD(invested)} />
      </div>
      <Card className="max-w-xl">
        <CardBody className="space-y-4">
          <div>
            <div className="mb-1.5 text-sm font-medium text-parchment/90">Method</div>
            <div className="grid grid-cols-2 gap-3">
              {[{ k: "bank", label: "Bank", icon: Landmark }, { k: "crypto", label: "Crypto", icon: Bitcoin }].map((m) => {
                const Icon = m.icon; const active = method === m.k;
                return (
                  <button key={m.k} onClick={() => setMethod(m.k)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-600 transition-colors ${active ? "border-gold/60 bg-gold/10 text-gold" : "border-gold-deep/15 bg-charcoal-50 text-muted hover:text-parchment"}`}>
                    <Icon size={16} /> {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {method === "crypto" && (
            <div>
              <div className="mb-1.5 text-sm font-medium text-parchment/90">Coin</div>
              <div className="flex gap-2">
                {COINS.map((c) => (
                  <button key={c} onClick={() => setCoin(c)}
                    className={`flex-1 rounded-xl border py-2 text-sm font-600 transition-colors ${coin === c ? "border-gold/60 bg-gold/10 text-gold" : "border-gold-deep/15 bg-charcoal-50 text-muted hover:text-parchment"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Input label="Amount (USD)" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} hint={`Max ${formatUSD(available)}`} />
          <Input label={method === "bank" ? "Bank account" : "Wallet address"} placeholder={method === "bank" ? "Account number" : "Destination address"} value={dest} onChange={(e) => setDest(e.target.value)} />
          <Button onClick={submit} loading={loading} variant="primary" size="lg" className="w-full">Request withdrawal</Button>
        </CardBody>
      </Card>
    </DashboardPage>
  );
}
