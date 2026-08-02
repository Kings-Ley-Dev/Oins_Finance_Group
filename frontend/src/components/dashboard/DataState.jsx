import { Loader2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export function Loading({ label = "Loading…" }) {
  return (
    <div className="grid place-items-center py-20 text-muted">
      <Loader2 className="animate-spin text-gold" size={26} />
      <p className="mt-3 text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="grid place-items-center rounded-card border border-rose-500/20 bg-rose-500/5 py-16 text-center">
      <AlertCircle className="text-rose-400" size={26} />
      <p className="mt-3 max-w-sm text-sm text-muted">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-4">
          Retry
        </Button>
      )}
      <p className="mt-3 text-xs text-muted/70">
        Tip: start the API (<code>npm run dev</code>) and seed it (<code>npm run seed</code>), or use demo mode.
      </p>
    </div>
  );
}

export function Empty({ title, hint, action }) {
  return (
    <div className="grid place-items-center rounded-card border border-gold-deep/15 bg-charcoal py-16 text-center">
      <p className="font-display text-base font-600 text-parchment">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-sm text-muted">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
