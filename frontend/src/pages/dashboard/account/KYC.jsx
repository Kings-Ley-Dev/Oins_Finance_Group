import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileCheck2, CheckCircle2 } from "lucide-react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import Card, { CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { userApi } from "@/api/userApi";
import { useUiStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";

const SLOTS = [
  { key: "id_front", label: "Government ID (front)" },
  { key: "id_back", label: "Government ID (back)" },
  { key: "proof", label: "Proof of address" },
];

const STATUS_TONE = { unverified: "gold", pending: "warning", approved: "success", rejected: "danger" };

export default function KYC() {
  const pushToast = useUiStore((s) => s.pushToast);
  const isDemo = useAuthStore((s) => s.token) === "demo-token";
  const [status, setStatus] = useState("unverified");
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const inputs = useRef({});

  useEffect(() => {
    if (isDemo) { setStatus("pending"); return; }
    userApi.getKyc().then(({ data }) => setStatus(data.kyc?.status || "unverified")).catch(() => {});
  }, [isDemo]);

  const pick = (key) => (e) => {
    const f = e.target.files?.[0];
    if (f) setFiles((s) => ({ ...s, [key]: f }));
  };

  const submit = async () => {
    const chosen = SLOTS.filter((s) => files[s.key]);
    if (!chosen.length) return pushToast({ type: "error", title: "Upload at least one document" });
    setLoading(true);
    try {
      if (isDemo) {
        await new Promise((r) => setTimeout(r, 400));
      } else {
        const fd = new FormData();
        chosen.forEach((s) => { fd.append("documents", files[s.key]); fd.append("labels", s.label); });
        await userApi.submitKyc(fd);
      }
      setStatus("pending");
      setFiles({});
      pushToast({ type: "success", title: "KYC submitted", message: "Your documents are under review." });
    } catch (err) {
      pushToast({ type: "error", title: "Submission failed", message: err?.response?.data?.message || "Try again." });
    } finally {
      setLoading(false);
    }
  };

  const verified = status === "approved";

  return (
    <DashboardPage title="KYC verification" subtitle="Verify your identity to unlock withdrawals."
      action={<Badge tone={STATUS_TONE[status]}>{status}</Badge>}>
      {verified ? (
        <Card><CardBody className="flex items-center gap-3 py-8">
          <CheckCircle2 className="text-emerald-400" size={28} />
          <div><div className="font-600 text-parchment">You're verified</div><div className="text-sm text-muted">All features are unlocked.</div></div>
        </CardBody></Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SLOTS.map((slot) => {
              const f = files[slot.key];
              return (
                <Card key={slot.key}>
                  <CardBody>
                    <button onClick={() => inputs.current[slot.key]?.click()}
                      className="grid h-32 w-full place-items-center rounded-xl border border-dashed border-gold-deep/30 bg-charcoal-50 text-center transition-colors hover:border-gold/50">
                      {f ? (
                        <div><FileCheck2 className="mx-auto text-emerald-400" size={24} /><p className="mt-2 max-w-[12rem] truncate px-2 text-xs text-parchment">{f.name}</p></div>
                      ) : (
                        <div><UploadCloud className="mx-auto text-gold" size={24} /><p className="mt-2 text-xs text-muted">Click to upload</p></div>
                      )}
                    </button>
                    <input ref={(el) => (inputs.current[slot.key] = el)} type="file" accept="image/*,application/pdf" className="hidden" onChange={pick(slot.key)} />
                    <p className="mt-3 text-sm font-600 text-parchment">{slot.label}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-4">
            <Button onClick={submit} loading={loading} variant="primary" size="lg" disabled={status === "pending"}>
              {status === "pending" ? "Under review" : "Submit for review"}
            </Button>
            <p className="text-sm text-muted">Accepted: JPG, PNG, WEBP, PDF · max 5MB each.</p>
          </div>
        </>
      )}
    </DashboardPage>
  );
}
