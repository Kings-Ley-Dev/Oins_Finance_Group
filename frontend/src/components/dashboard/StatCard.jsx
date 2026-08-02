import Icon from "@/components/ui/Icon";

export function StatCard({ icon, label, value, sub, accent = false }) {
  return (
    <div
      className={`rounded-card border p-5 ${
        accent
          ? "border-gold-deep/40 bg-gradient-to-br from-charcoal-50 to-charcoal"
          : "border-gold-deep/15 bg-charcoal"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted">{label}</span>
        {icon && (
          <span
            className={`grid h-9 w-9 place-items-center rounded-lg ${
              accent ? "bg-gold-gradient text-ink-900" : "bg-charcoal-50 text-gold"
            }`}
          >
            <Icon name={icon} size={17} />
          </span>
        )}
      </div>
      <div
        className={`mt-3 font-display text-2xl font-700 ${accent ? "text-gold-bright" : "text-parchment"}`}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}

export function DashboardPage({ title, subtitle, action, children }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-700 text-parchment">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
