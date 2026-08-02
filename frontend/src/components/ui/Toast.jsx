import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useUiStore } from "@/store/uiStore";

const TONES = {
  success: { icon: CheckCircle2, cls: "border-emerald-500/30 text-emerald-300" },
  error: { icon: AlertCircle, cls: "border-rose-500/30 text-rose-300" },
  info: { icon: Info, cls: "border-gold-deep/40 text-gold" },
};

function ToastItem({ toast }) {
  const dismiss = useUiStore((s) => s.dismissToast);
  const { icon: Icon, cls } = TONES[toast.type] || TONES.info;

  useEffect(() => {
    const t = setTimeout(() => dismiss(toast.id), toast.duration || 4000);
    return () => clearTimeout(t);
  }, [toast.id]); // eslint-disable-line

  return (
    <div
      className={`animate-fade-up flex items-start gap-3 rounded-xl border bg-charcoal/95 px-4 py-3 shadow-lift backdrop-blur ${cls}`}
      role="status"
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="flex-1 text-sm text-parchment">
        {toast.title && <div className="font-600">{toast.title}</div>}
        {toast.message && <div className="text-muted">{toast.message}</div>}
      </div>
      <button onClick={() => dismiss(toast.id)} className="text-muted hover:text-parchment">
        <X size={15} />
      </button>
    </div>
  );
}

export default function ToastHost() {
  const toasts = useUiStore((s) => s.toasts);
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-2.5rem))] flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
