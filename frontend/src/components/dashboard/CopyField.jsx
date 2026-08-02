import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyField({ label, value, mono = true }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 flex items-center justify-between gap-3 rounded-xl border border-gold-deep/20 bg-charcoal-50 px-4 py-2.5">
        <span className={`truncate text-sm text-parchment ${mono ? "font-mono" : ""}`}>{value}</span>
        <button onClick={copy} className="shrink-0 text-muted hover:text-gold" aria-label="Copy">
          {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        </button>
      </div>
    </div>
  );
}
