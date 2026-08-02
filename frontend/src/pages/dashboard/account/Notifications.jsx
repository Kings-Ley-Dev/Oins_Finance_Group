import { useEffect, useState } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useNotificationStore } from "@/store/notificationStore";

const PREFS = [
  { key: "earnings", label: "Daily earnings posted", desc: "When yield is added to a plan." },
  { key: "deposits", label: "Deposits & withdrawals", desc: "Status changes on your transactions." },
  { key: "maturity", label: "Plan maturity", desc: "When an investment completes its term." },
  { key: "product", label: "Product updates", desc: "New assets and platform news." },
];

const dot = { payment: "bg-emerald-400", earning: "bg-gold-bright", success: "bg-emerald-400", kyc: "bg-sky-400", warning: "bg-amber-400", info: "bg-gold" };

function timeAgo(d) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-gold" : "border border-gold-deep/20 bg-charcoal-50"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-900 transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Notifications() {
  const { items, unread, load, markRead, markAllRead } = useNotificationStore();
  const [prefs, setPrefs] = useState({ earnings: true, deposits: true, maturity: true, product: false });

  useEffect(() => { load(); }, []); // eslint-disable-line

  return (
    <DashboardPage title="Notifications" subtitle="Your activity log and alert preferences.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader title="Activity" subtitle={unread ? `${unread} unread` : "All caught up"}
            action={unread ? <button onClick={markAllRead} className="text-sm text-gold hover:underline">Mark all read</button> : null} />
          <CardBody className="divide-y divide-gold-deep/10 p-0">
            {items.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-muted">No notifications yet.</p>
            ) : (
              items.map((n) => {
                const id = n.id || n._id;
                return (
                  <button key={id} onClick={() => markRead(id)} className={`flex w-full gap-3 px-6 py-4 text-left hover:bg-charcoal-50 ${n.read ? "opacity-60" : ""}`}>
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[n.type] || "bg-gold"}`} />
                    <span className="flex-1">
                      <span className="block text-sm font-600 text-parchment">{n.title}</span>
                      {n.body && <span className="block text-xs text-muted">{n.body}</span>}
                      <span className="mt-0.5 block text-[11px] text-muted/70">{timeAgo(n.createdAt)}</span>
                    </span>
                  </button>
                );
              })
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Preferences" />
          <CardBody className="divide-y divide-gold-deep/10">
            {PREFS.map((p) => (
              <div key={p.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <div className="text-sm font-600 text-parchment">{p.label}</div>
                  <div className="text-xs text-muted">{p.desc}</div>
                </div>
                <Toggle on={prefs[p.key]} onChange={() => setPrefs((s) => ({ ...s, [p.key]: !s[p.key] }))} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </DashboardPage>
  );
}
