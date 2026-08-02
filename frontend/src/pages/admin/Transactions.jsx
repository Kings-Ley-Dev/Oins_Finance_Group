import { useState } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import AdminTable from "@/components/admin/AdminTable";
import { useAdminData } from "@/components/admin/useAdminData";
import Badge from "@/components/ui/Badge";
import { adminService } from "@/lib/adminService";
import { formatUSD, formatDate } from "@/utils/formatters";

const tone = { completed: "success", pending: "warning", failed: "danger", cancelled: "danger" };

export default function AdminTransactions() {
  const [tab, setTab] = useState("transactions");
  const tx = useAdminData(adminService.transactions);
  const audit = useAdminData(adminService.audit);

  const txCols = [
    { key: "user", header: "User", render: (t) => t.user?.fullName },
    { key: "type", header: "Type", render: (t) => <span className="capitalize">{t.type}</span> },
    { key: "source", header: "Source" },
    { key: "amount", header: "Amount", render: (t) => formatUSD(t.amount) },
    { key: "status", header: "Status", render: (t) => <Badge tone={tone[t.status]}>{t.status}</Badge> },
    { key: "date", header: "Date", render: (t) => formatDate(t.createdAt) },
  ];
  const auditCols = [
    { key: "actor", header: "Actor", render: (a) => a.actor?.fullName },
    { key: "action", header: "Action", render: (a) => <span className="font-mono text-xs text-gold">{a.action}</span> },
    { key: "target", header: "Target", render: (a) => <span className="font-mono text-xs">{a.target}</span> },
    { key: "date", header: "When", render: (a) => formatDate(a.createdAt) },
  ];

  const active = tab === "transactions" ? tx : audit;

  return (
    <DashboardPage title="Audit trail" subtitle="Append-only record of platform activity.">
      <div className="mb-5 inline-flex rounded-full border border-gold-deep/20 bg-charcoal p-1">
        {[["transactions", "Transactions"], ["audit", "Admin actions"]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${tab === k ? "bg-gold/15 text-gold" : "text-muted hover:text-parchment"}`}>
            {label}
          </button>
        ))}
      </div>
      {active.status === "loading" && <Loading />}
      {active.status === "error" && <ErrorState message={active.error} onRetry={active.reload} />}
      {active.status === "ready" && (
        tab === "transactions"
          ? <AdminTable columns={txCols} rows={active.data} keyField="id" empty="No transactions." />
          : <AdminTable columns={auditCols} rows={active.data} keyField="id" empty="No admin actions logged." />
      )}
    </DashboardPage>
  );
}
