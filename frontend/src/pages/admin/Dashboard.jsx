import { Link } from "react-router-dom";
import { DashboardPage, StatCard } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAdminData } from "@/components/admin/useAdminData";
import { adminService } from "@/lib/adminService";
import { formatUSD } from "@/utils/formatters";

export default function AdminDashboard() {
  const { data: o, status, error, reload } = useAdminData(adminService.overview);

  return (
    <DashboardPage title="Platform overview" subtitle="Global vitals across the platform.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && o && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard accent icon="Wallet" label="Total deposits" value={formatUSD(o.totalDeposits)} />
            <StatCard icon="Briefcase" label="Total invested" value={formatUSD(o.totalInvested)} />
            <StatCard icon="UserPlus" label="Users" value={o.users.toLocaleString()} />
            <StatCard icon="Layers" label="Active plans" value={o.activeInvestments.toLocaleString()} />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Card>
              <CardHeader title="Pending withdrawals" subtitle="Awaiting your approval"
                action={<Button to="/admin/withdrawals" variant="secondary" size="sm">Review</Button>} />
              <CardBody><div className="font-display text-4xl font-700 text-gold-bright">{o.withdrawalsPending}</div></CardBody>
            </Card>
            <Card>
              <CardHeader title="KYC to review" subtitle="Pending verification"
                action={<Button to="/admin/kyc" variant="secondary" size="sm">Review</Button>} />
              <CardBody><div className="font-display text-4xl font-700 text-gold-bright">{o.kycPending}</div></CardBody>
            </Card>
          </div>
        </>
      )}
    </DashboardPage>
  );
}
