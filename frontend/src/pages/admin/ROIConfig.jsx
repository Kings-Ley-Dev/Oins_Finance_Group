import { useState, useEffect } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import Card, { CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useAdminData } from "@/components/admin/useAdminData";
import { adminService } from "@/lib/adminService";
import { OPPORTUNITIES } from "@/lib/site";
import { useUiStore } from "@/store/uiStore";

// Parse "8.5% - 15.6%" -> { min, max }
function parseRange(label) {
  const m = label.match(/([\d.]+)%\s*-\s*([\d.]+)%/);
  return m ? { roiMin: m[1], roiMax: m[2] } : { roiMin: "", roiMax: "" };
}

export default function ROIConfig() {
  const { data: settings, status, error, reload } = useAdminData(adminService.settings);
  const pushToast = useUiStore((s) => s.pushToast);
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!settings) return;
    const ov = settings.roiOverrides || {};
    const next = {};
    OPPORTUNITIES.items.forEach((p) => {
      next[p.key] = ov[p.key] ? { roiMin: String(ov[p.key].roiMin), roiMax: String(ov[p.key].roiMax) } : parseRange(p.roi);
    });
    setDraft(next);
  }, [settings]);

  const setField = (key, f) => (e) => setDraft((d) => ({ ...d, [key]: { ...d[key], [f]: e.target.value } }));

  const save = async () => {
    setSaving(true);
    try {
      const roiOverrides = {};
      Object.entries(draft).forEach(([k, v]) => { roiOverrides[k] = { roiMin: Number(v.roiMin), roiMax: Number(v.roiMax) }; });
      await adminService.updateSettings({ roiOverrides });
      pushToast({ type: "success", title: "ROI configuration saved", message: "Applies to new investments." });
      reload();
    } catch (e) {
      pushToast({ type: "error", title: "Save failed", message: e?.response?.data?.message });
    } finally { setSaving(false); }
  };

  return (
    <DashboardPage title="ROI configuration" subtitle="Set return ranges per asset. Applies to new investments."
      action={<Button onClick={save} loading={saving} variant="primary" size="md">Save changes</Button>}>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.items.map((p) => (
            <Card key={p.key}>
              <CardBody>
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-gradient text-ink-900"><Icon name={p.icon} size={16} /></span>
                  <span className="font-display font-600 text-parchment">{p.name}</span>
                </div>
                <div className="flex items-end gap-2">
                  <label className="flex-1 text-xs text-muted">Min %
                    <input type="number" step="0.1" value={draft[p.key]?.roiMin ?? ""} onChange={setField(p.key, "roiMin")}
                      className="mt-1 w-full rounded-lg border border-gold-deep/20 bg-charcoal-50 px-3 py-2 text-sm text-parchment focus:border-gold/60 focus:outline-none" />
                  </label>
                  <label className="flex-1 text-xs text-muted">Max %
                    <input type="number" step="0.1" value={draft[p.key]?.roiMax ?? ""} onChange={setField(p.key, "roiMax")}
                      className="mt-1 w-full rounded-lg border border-gold-deep/20 bg-charcoal-50 px-3 py-2 text-sm text-parchment focus:border-gold/60 focus:outline-none" />
                  </label>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
