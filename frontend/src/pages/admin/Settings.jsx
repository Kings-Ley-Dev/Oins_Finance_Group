import { useState, useEffect } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import Card, { CardBody } from "@/components/ui/Card";
import { useAdminData } from "@/components/admin/useAdminData";
import { adminService } from "@/lib/adminService";
import { useUiStore } from "@/store/uiStore";

const FLAGS = [
  { key: "maintenanceMode", label: "Maintenance mode", desc: "Take the platform offline for users." },
  { key: "registrationOpen", label: "Registration open", desc: "Allow new sign-ups." },
  { key: "withdrawalsEnabled", label: "Withdrawals enabled", desc: "Allow users to request payouts." },
];

function Toggle({ on, onChange }) {
  return (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-gold" : "border border-gold-deep/20 bg-charcoal-50"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-900 transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function AdminSettings() {
  const { data, status, error, reload } = useAdminData(adminService.settings);
  const pushToast = useUiStore((s) => s.pushToast);
  const [flags, setFlags] = useState({});

  useEffect(() => { if (data) setFlags({ maintenanceMode: data.maintenanceMode, registrationOpen: data.registrationOpen, withdrawalsEnabled: data.withdrawalsEnabled }); }, [data]);

  const toggle = async (key) => {
    const next = { ...flags, [key]: !flags[key] };
    setFlags(next);
    try { await adminService.updateSettings({ [key]: next[key] }); pushToast({ type: "success", title: "Settings updated" }); }
    catch (e) { pushToast({ type: "error", title: "Update failed", message: e?.response?.data?.message }); reload(); }
  };

  return (
    <DashboardPage title="System settings" subtitle="Global platform flags and maintenance.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && (
        <Card className="max-w-2xl">
          <CardBody className="divide-y divide-gold-deep/10">
            {FLAGS.map((f) => (
              <div key={f.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <div className="text-sm font-600 text-parchment">{f.label}</div>
                  <div className="text-xs text-muted">{f.desc}</div>
                </div>
                <Toggle on={!!flags[f.key]} onChange={() => toggle(f.key)} />
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </DashboardPage>
  );
}
