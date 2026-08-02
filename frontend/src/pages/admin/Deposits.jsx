import { useState } from "react";
import { X } from "lucide-react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import AdminTable from "@/components/admin/AdminTable";
import { useAdminData } from "@/components/admin/useAdminData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { adminService } from "@/lib/adminService";
import { useUiStore } from "@/store/uiStore";
import { formatUSD, formatDate } from "@/utils/formatters";

const FLOW = {
  requested:    { tone: "warning", label: "Requested" },
  details_sent: { tone: "info",    label: "Details sent" },
  paid:         { tone: "gold",    label: "Paid · confirm" },
  confirmed:    { tone: "success", label: "Confirmed" },
  rejected:     { tone: "danger",  label: "Cancelled" },
  completed:    { tone: "success", label: "Confirmed" },
  pending:      { tone: "warning", label: "Pending" },
};

function DetailsModal({ deposit, onClose, onSaved }) {
  const pushToast = useUiStore((s) => s.pushToast);
  const isBank = deposit.method === "bank";
  const [form, setForm] = useState(
    isBank
      ? { bankName: "", bankAddress: "", routingOrSwift: "", accountName: "", accountNumber: "", accountAddress: "", instructions: "", ...(deposit.accountDetails || {}) }
      : { coin: deposit.coin || "BTC", network: "", address: "", instructions: "", ...(deposit.accountDetails || {}) }
  );
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    if (isBank && (!form.bankName || !form.accountNumber)) return pushToast({ type: "error", title: "Bank name and account number are required" });
    if (!isBank && !form.address) return pushToast({ type: "error", title: "Wallet address is required" });
    setSaving(true);
    try {
      await adminService.provideDepositDetails(deposit.reference, form);
      pushToast({ type: "success", title: "Details sent", message: "The user has been notified on their dashboard and email." });
      onSaved();
      onClose();
    } catch (e) {
      pushToast({ type: "error", title: "Could not send details", message: e?.response?.data?.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-card border border-gold-deep/25 bg-ink-900 shadow-2xl">
        {/* Header (pinned) */}
        <div className="shrink-0 border-b border-gold-deep/15 px-6 pb-4 pt-5">
          <button onClick={onClose} className="absolute right-4 top-4 text-muted hover:text-gold"><X size={18} /></button>
          <h3 className="font-display text-lg font-700 text-parchment">{isBank ? "Bank" : "Crypto"} deposit details</h3>
          <p className="mt-1 text-xs text-muted">{deposit.user?.fullName} · {formatUSD(deposit.amount)} · {deposit.reference}</p>
        </div>

        {/* Fields (scrolls if tall) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {isBank ? (
              <>
                <Input label="Bank name" value={form.bankName} onChange={set("bankName")} />
                <Input label="Bank address (optional)" value={form.bankAddress} onChange={set("bankAddress")} />
                <Input label="Routing / SWIFT (optional)" value={form.routingOrSwift} onChange={set("routingOrSwift")} />
                <Input label="Account name" value={form.accountName} onChange={set("accountName")} />
                <Input label="Account number" value={form.accountNumber} onChange={set("accountNumber")} />
                <Input label="Account address (optional)" value={form.accountAddress} onChange={set("accountAddress")} />
              </>
            ) : (
              <>
                <Input label="Coin" value={form.coin} onChange={set("coin")} />
                <Input label="Network" placeholder="e.g. Bitcoin, ERC-20, TRC-20" value={form.network} onChange={set("network")} />
                <Input label="Wallet address" value={form.address} onChange={set("address")} />
              </>
            )}
            <Input label="Instructions (optional)" value={form.instructions} onChange={set("instructions")} />
          </div>
        </div>

        {/* Actions (pinned) */}
        <div className="shrink-0 border-t border-gold-deep/15 px-6 py-4">
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" size="md" className="flex-1">Cancel</Button>
            <Button onClick={save} loading={saving} variant="primary" size="md" className="flex-1">Send to user</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDeposits() {
  const { data, status, error, reload } = useAdminData(adminService.deposits);
  const pushToast = useUiStore((s) => s.pushToast);
  const [editing, setEditing] = useState(null);

  const confirm = async (d) => {
    try { await adminService.confirmDeposit(d.reference); pushToast({ type: "success", title: "Deposit confirmed", message: "Wallet credited." }); reload(); }
    catch (e) { pushToast({ type: "error", title: "Confirm failed", message: e?.response?.data?.message }); }
  };

  const reject = async (d) => {
    const reason = window.prompt("Reason for cancelling this deposit? (optional)") ?? null;
    if (reason === null) return; // cancelled the prompt
    try { await adminService.rejectDeposit(d.reference, reason); pushToast({ type: "info", title: "Deposit cancelled" }); reload(); }
    catch (e) { pushToast({ type: "error", title: "Action failed", message: e?.response?.data?.message }); }
  };

  const columns = [
    { key: "reference", header: "Reference", render: (d) => <span className="font-mono text-xs">{d.reference}</span> },
    { key: "user", header: "User", render: (d) => d.user?.fullName },
    { key: "method", header: "Method", render: (d) => `${d.method}${d.coin ? ` · ${d.coin}` : ""}` },
    { key: "amount", header: "Amount", render: (d) => formatUSD(d.amount) },
    { key: "status", header: "Status", render: (d) => { const f = FLOW[d.flowStatus] || FLOW[d.status] || { tone: "gold", label: d.flowStatus || d.status }; return <Badge tone={f.tone}>{f.label}</Badge>; } },
    { key: "date", header: "Date", render: (d) => formatDate(d.createdAt) },
    {
      key: "actions", header: "", render: (d) => {
        if (d.status === "completed" || d.flowStatus === "confirmed" || d.flowStatus === "rejected") return null;
        return (
          <div className="flex flex-wrap justify-end gap-2">
            {(d.flowStatus === "requested" || d.flowStatus === "details_sent" || !d.flowStatus) && (
              <Button onClick={() => setEditing(d)} variant={d.flowStatus === "details_sent" ? "outline" : "primary"} size="sm">
                {d.flowStatus === "details_sent" ? "Edit details" : "Provide details"}
              </Button>
            )}
            {d.flowStatus === "paid" && (
              <Button onClick={() => confirm(d)} variant="primary" size="sm">Confirm received</Button>
            )}
            <button onClick={() => reject(d)} className="text-xs text-rose-300 hover:text-rose-200">Cancel</button>
          </div>
        );
      }
    },
  ];

  return (
    <DashboardPage title="Deposits" subtitle="Issue account details, then confirm payments once received.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && <AdminTable columns={columns} rows={data} keyField="reference" empty="No deposits yet." />}
      {editing && <DetailsModal deposit={editing} onClose={() => setEditing(null)} onSaved={reload} />}
    </DashboardPage>
  );
}
