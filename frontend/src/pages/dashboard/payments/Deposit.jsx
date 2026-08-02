import { useEffect, useState, useCallback } from "react";
import { Landmark, Bitcoin, Copy, Check, RefreshCw, CheckCircle2, Clock, Send } from "lucide-react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import Card, { CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { initDeposit, listMyDeposits, markDepositPaid } from "@/lib/paymentService";
import { useUiStore } from "@/store/uiStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatUSD, formatDate } from "@/utils/formatters";

const METHODS = [
  { key: "bank", label: "Bank Transfer", icon: Landmark, note: "Request bank account details" },
  { key: "crypto", label: "Crypto Deposit", icon: Bitcoin, note: "Request a wallet address" },
];
const COINS = ["BTC", "ETH", "USDT"];

const FLOW = {
  requested:    { tone: "warning", label: "Awaiting details" },
  details_sent: { tone: "info",    label: "Details ready" },
  paid:         { tone: "gold",    label: "Awaiting confirmation" },
  confirmed:    { tone: "success", label: "Confirmed" },
  rejected:     { tone: "danger",  label: "Cancelled" },
};

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  const copy = () => { navigator.clipboard?.writeText(String(value)); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gold-deep/15 bg-charcoal-50 px-3 py-2">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted">{label}</div>
        <div className="truncate font-mono text-sm text-parchment">{value}</div>
      </div>
      <button onClick={copy} className="shrink-0 text-muted hover:text-gold" title="Copy">
        {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
      </button>
    </div>
  );
}

function DepositCard({ dep, onPaid, busy }) {
  const flow = FLOW[dep.flowStatus] || { tone: "gold", label: dep.flowStatus };
  const ad = dep.accountDetails || {};
  return (
    <div className="rounded-card border border-gold-deep/15 bg-charcoal p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="font-display font-600 text-parchment">
            {formatUSD(dep.amount)} · {dep.method === "crypto" ? `${dep.coin || "Crypto"} deposit` : "Bank transfer"}
          </div>
          <div className="font-mono text-xs text-muted">{dep.reference} · {formatDate(dep.createdAt)}</div>
        </div>
        <Badge tone={flow.tone}>{flow.label}</Badge>
      </div>

      {dep.flowStatus === "requested" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Clock size={15} className="text-amber-300" />
          We're preparing your deposit details. They'll appear here and in your email shortly.
        </p>
      )}

      {dep.flowStatus === "details_sent" && (
        <div className="mt-4 space-y-2.5">
          <p className="text-sm text-muted">Send exactly <span className="text-parchment">{formatUSD(dep.amount)}</span> to the account below, then confirm.</p>
          {dep.method === "bank" ? (
            <>
              <CopyField label="Bank" value={ad.bankName} />
              <CopyField label="Bank address" value={ad.bankAddress} />
              <CopyField label="Routing / SWIFT" value={ad.routingOrSwift} />
              <CopyField label="Account name" value={ad.accountName} />
              <CopyField label="Account number" value={ad.accountNumber} />
              <CopyField label="Account address" value={ad.accountAddress} />
            </>
          ) : (
            <>
              <CopyField label="Coin" value={ad.coin} />
              <CopyField label="Network" value={ad.network} />
              <CopyField label="Wallet address" value={ad.address} />
            </>
          )}
          {ad.instructions && <p className="rounded-lg border border-dashed border-gold-deep/25 bg-charcoal-50 p-3 text-xs text-muted">{ad.instructions}</p>}
          <Button onClick={() => onPaid(dep.reference)} loading={busy} variant="primary" size="md" className="mt-1 w-full" icon={<CheckCircle2 size={15} />}>
            I've completed the deposit
          </Button>
        </div>
      )}

      {dep.flowStatus === "paid" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Clock size={15} className="text-gold" />
          Payment marked as sent. We'll credit your wallet once an admin confirms receipt.
        </p>
      )}

      {dep.flowStatus === "confirmed" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
          <CheckCircle2 size={15} /> Deposit confirmed and credited to your wallet.
        </p>
      )}

      {dep.flowStatus === "rejected" && (
        <p className="mt-4 text-sm text-rose-300">This deposit was cancelled{dep.rejectionReason ? `: ${dep.rejectionReason}` : "."}</p>
      )}
    </div>
  );
}

export default function Deposit() {
  const [method, setMethod] = useState("bank");
  const [coin, setCoin] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [paying, setPaying] = useState(null);

  const pushToast = useUiStore((s) => s.pushToast);
  const reloadDashboard = useDashboardStore((s) => s.load);

  const load = useCallback(async () => {
    try { setDeposits(await listMyDeposits()); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 20000); // pick up admin-issued details / confirmations
    return () => clearInterval(t);
  }, [load]);

  const request = async () => {
    const v = Number(amount);
    if (!v || v <= 0) return pushToast({ type: "error", title: "Enter an amount" });
    setLoading(true);
    try {
      await initDeposit({ method, amount: v, coin });
      pushToast({ type: "success", title: "Request submitted", message: "We'll send your deposit details to your dashboard and email." });
      setAmount("");
      load();
    } catch (err) {
      pushToast({ type: "error", title: "Could not submit request", message: err?.response?.data?.message || "Start the API and try again." });
    } finally {
      setLoading(false);
    }
  };

  const onPaid = async (reference) => {
    setPaying(reference);
    try {
      await markDepositPaid(reference);
      pushToast({ type: "success", title: "Thanks!", message: "We'll confirm your deposit shortly." });
      load();
      reloadDashboard?.(true);
    } catch (err) {
      pushToast({ type: "error", title: "Could not update", message: err?.response?.data?.message || "Try again." });
    } finally {
      setPaying(null);
    }
  };

  return (
    <DashboardPage title="Deposit" subtitle="Request deposit details, send your funds, then confirm.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardBody>
            <div className="mb-4 grid grid-cols-2 gap-3">
              {METHODS.map((m) => {
                const Icon = m.icon;
                const active = method === m.key;
                return (
                  <button key={m.key} onClick={() => setMethod(m.key)}
                    className={`rounded-xl border p-4 text-left transition-colors ${active ? "border-gold/60 bg-gold/10" : "border-gold-deep/15 bg-charcoal-50 hover:border-gold-deep/40"}`}>
                    <Icon size={20} className={active ? "text-gold" : "text-muted"} />
                    <div className="mt-2 text-sm font-600 text-parchment">{m.label}</div>
                    <div className="text-xs text-muted">{m.note}</div>
                  </button>
                );
              })}
            </div>

            {method === "crypto" && (
              <div className="mb-4">
                <div className="mb-1.5 text-sm font-medium text-parchment/90">Preferred coin</div>
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

            <Input label="Amount (USD)" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button onClick={request} loading={loading} variant="primary" size="lg" className="mt-4 w-full" icon={<Send size={16} />}>
              Request deposit details
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-display font-600 text-parchment">How it works</h3>
            <ol className="mt-3 space-y-3 text-sm text-muted">
              <li>1. Choose a method, enter an amount, and request details.</li>
              <li>2. Our team sends you the bank or crypto account details - to your dashboard and email.</li>
              <li>3. Send the funds, then tap “I've completed the deposit”.</li>
              <li>4. Once we confirm receipt, your wallet is credited.</li>
            </ol>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display font-600 text-parchment">Your deposit requests</h3>
          <button onClick={load} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-gold">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
        {deposits.length === 0 ? (
          <Card><CardBody><p className="text-sm text-muted">No deposit requests yet. Request your first deposit above.</p></CardBody></Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {deposits.map((dep) => (
              <DepositCard key={dep.reference} dep={dep} onPaid={onPaid} busy={paying === dep.reference} />
            ))}
          </div>
        )}
      </div>
    </DashboardPage>
  );
}
