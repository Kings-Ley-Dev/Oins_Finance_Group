import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import AdminTable from "@/components/admin/AdminTable";
import { useAdminData } from "@/components/admin/useAdminData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { adminService } from "@/lib/adminService";
import { useUiStore } from "@/store/uiStore";
import { formatUSD, formatDate } from "@/utils/formatters";

const tone = { pending: "warning", completed: "success", approved: "success", rejected: "danger" };

export default function AdminWithdrawals() {
  const { data, status, error, reload } = useAdminData(adminService.withdrawals);
  const pushToast = useUiStore((s) => s.pushToast);

  const decide = async (w, decision) => {
    try { await adminService.decideWithdrawal(w.id || w._id, decision); pushToast({ type: decision === "approve" ? "success" : "info", title: decision === "approve" ? "Withdrawal approved" : "Withdrawal rejected" }); reload(); }
    catch (e) { pushToast({ type: "error", title: "Action failed", message: e?.response?.data?.message }); }
  };

  const columns = [
    { key: "user", header: "User", render: (w) => (<div><div className="font-600 text-parchment">{w.user?.fullName}</div><div className="text-xs text-muted">{w.user?.email}</div></div>) },
    { key: "amount", header: "Amount", render: (w) => <span className="font-700 text-gold-bright">{formatUSD(w.amount)}</span> },
    { key: "method", header: "Method", render: (w) => `${w.method}${w.coin ? ` · ${w.coin}` : ""}` },
    { key: "destination", header: "Destination", render: (w) => <span className="font-mono text-xs">{w.destination}</span> },
    { key: "status", header: "Status", render: (w) => <Badge tone={tone[w.status]}>{w.status}</Badge> },
    { key: "date", header: "Date", render: (w) => formatDate(w.createdAt) },
    { key: "actions", header: "", render: (w) => w.status === "pending" ? (
      <div className="flex gap-2">
        <Button onClick={() => decide(w, "approve")} variant="primary" size="sm">Approve</Button>
        <Button onClick={() => decide(w, "reject")} variant="secondary" size="sm">Reject</Button>
      </div>
    ) : null },
  ];

  return (
    <DashboardPage title="Withdrawals" subtitle="Approve to release funds, or reject to refund the user.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && <AdminTable columns={columns} rows={data} keyField="id" empty="No withdrawal requests." />}
    </DashboardPage>
  );
}
