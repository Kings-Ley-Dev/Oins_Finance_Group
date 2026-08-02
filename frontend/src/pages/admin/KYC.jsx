import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import AdminTable from "@/components/admin/AdminTable";
import { useAdminData } from "@/components/admin/useAdminData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { adminService } from "@/lib/adminService";
import { useUiStore } from "@/store/uiStore";
import { formatDate } from "@/utils/formatters";

const tone = { pending: "warning", approved: "success", rejected: "danger" };

export default function AdminKyc() {
  const { data, status, error, reload } = useAdminData(adminService.kyc);
  const pushToast = useUiStore((s) => s.pushToast);

  const decide = async (k, decision) => {
    let note = "";
    if (decision === "reject") { note = prompt("Reason for rejection (optional):", "") || ""; }
    try { await adminService.decideKyc(k.id || k._id, decision, note); pushToast({ type: decision === "approve" ? "success" : "info", title: decision === "approve" ? "KYC approved" : "KYC rejected" }); reload(); }
    catch (e) { pushToast({ type: "error", title: "Action failed", message: e?.response?.data?.message }); }
  };

  const columns = [
    { key: "user", header: "User", render: (k) => (<div><div className="font-600 text-parchment">{k.user?.fullName}</div><div className="text-xs text-muted">{k.user?.email}</div></div>) },
    { key: "documents", header: "Documents", render: (k) => (k.documents || []).map((d) => d.label).join(", ") || "-" },
    { key: "submittedAt", header: "Submitted", render: (k) => k.submittedAt ? formatDate(k.submittedAt) : "-" },
    { key: "status", header: "Status", render: (k) => <Badge tone={tone[k.status]}>{k.status}</Badge> },
    { key: "actions", header: "", render: (k) => k.status === "pending" ? (
      <div className="flex gap-2">
        <Button onClick={() => decide(k, "approve")} variant="primary" size="sm">Approve</Button>
        <Button onClick={() => decide(k, "reject")} variant="secondary" size="sm">Reject</Button>
      </div>
    ) : null },
  ];

  return (
    <DashboardPage title="KYC review" subtitle="Verify submitted identity documents.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && <AdminTable columns={columns} rows={data} keyField="id" empty="No KYC submissions to review." />}
    </DashboardPage>
  );
}
