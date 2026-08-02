import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import AdminTable from "@/components/admin/AdminTable";
import { useAdminData } from "@/components/admin/useAdminData";
import Badge from "@/components/ui/Badge";
import { adminService } from "@/lib/adminService";
import { formatUSD } from "@/utils/formatters";

export default function AdminInvestments() {
  const { data, status, error, reload } = useAdminData(adminService.investments);
  const columns = [
    { key: "user", header: "User", render: (i) => i.user?.fullName },
    { key: "assetName", header: "Asset" },
    { key: "principal", header: "Principal", render: (i) => formatUSD(i.principal) },
    { key: "roiLabel", header: "ROI" },
    { key: "accrued", header: "Accrued", render: (i) => <span className="text-gold-bright">+{formatUSD(i.accrued)}</span> },
    { key: "status", header: "Status", render: (i) => <Badge tone={i.status === "active" ? "success" : "gold"}>{i.status}</Badge> },
  ];
  return (
    <DashboardPage title="Investments" subtitle="Platform-wide active investment ledger.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && <AdminTable columns={columns} rows={data} keyField="id" empty="No investments yet." />}
    </DashboardPage>
  );
}
