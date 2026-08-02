import { Copy } from "lucide-react";
import { DashboardPage, StatCard } from "@/components/dashboard/StatCard";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useUiStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { formatUSD } from "@/utils/formatters";

export default function Referral() {
  const pushToast = useUiStore((s) => s.pushToast);
  const user = useAuthStore((s) => s.user);
  const code = (user?.email?.split("@")[0] || "investor").toUpperCase().slice(0, 8);
  const link = `https://oinsfinance.com/register?ref=${code}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); pushToast({ type: "success", title: "Link copied" }); }
    catch { pushToast({ type: "info", title: "Copy this link", message: link }); }
  };

  return (
    <DashboardPage title="Referral" subtitle="Invite friends and earn bonuses on their investments.">
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard accent icon="Gift" label="Referral bonus" value={formatUSD(240)} />
        <StatCard icon="UserPlus" label="Invited" value={6} />
        <StatCard icon="TrendingUp" label="Active referrals" value={4} />
      </div>
      <Card className="max-w-2xl">
        <CardBody>
          <div className="text-sm font-600 text-parchment">Your invite link</div>
          <div className="mt-2 flex gap-2">
            <input readOnly value={link} className="flex-1 rounded-xl border border-gold-deep/20 bg-charcoal-50 px-4 py-3 text-sm text-muted" />
            <Button onClick={copy} variant="primary" size="md" icon={<Copy size={15} />}>Copy</Button>
          </div>
          <p className="mt-3 text-xs text-muted">You earn a bonus when a referred investor funds their first plan.</p>
        </CardBody>
      </Card>
    </DashboardPage>
  );
}
