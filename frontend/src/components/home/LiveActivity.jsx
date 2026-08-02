import { useEffect, useState } from "react";
import { TrendingUp, ArrowDownToLine, ArrowUpFromLine, X } from "lucide-react";

// Rotating social-proof feed shown bottom-right on the homepage.
const ACTIVITY = [
  { name: "Nasser", country: "Dubai", action: "withdrew", detail: "0.8 BTC" },
  { name: "Yildiz", country: "Turkey", action: "invested", detail: "$10,000 in Oil & Gas" },
  { name: "Sofia", country: "Italy", action: "invested", detail: "$50,000 in Real Estate" },
  { name: "Liam", country: "Ireland", action: "deposited", detail: "$33,000" },
  { name: "Mateusz", country: "Poland", action: "invested", detail: "$18,000 in AI Stock" },
  { name: "Amara", country: "Nigeria", action: "withdrew", detail: "3.2 ETH" },
  { name: "Hiroshi", country: "Japan", action: "invested", detail: "$200,000 in Digital Currency" },
  { name: "Elena", country: "Spain", action: "deposited", detail: "$12,500" },
  { name: "Lucas", country: "Brazil", action: "invested", detail: "$9,000 in Agro Farming" },
  { name: "Freya", country: "Norway", action: "invested", detail: "$75,000 in Mineral Resources" },
  { name: "Omar", country: "Qatar", action: "withdrew", detail: "48,000 USDT" },
  { name: "Anika", country: "Germany", action: "invested", detail: "$33,000 in Real Estate" },
  { name: "Chloé", country: "France", action: "deposited", detail: "$20,000" },
  { name: "Diego", country: "Mexico", action: "invested", detail: "$15,000 in Oil & Gas" },
  { name: "Priya", country: "India", action: "invested", detail: "$50,000 in AI Stock" },
  { name: "Sven", country: "Sweden", action: "withdrew", detail: "1.5 BTC" },
  { name: "Fatima", country: "Morocco", action: "invested", detail: "$10,000 in Real Estate" },
  { name: "Daniel", country: "Canada", action: "deposited", detail: "$34,000" },
  { name: "Mei", country: "Singapore", action: "invested", detail: "$120,000 in Oil & Gas" },
  { name: "Tariq", country: "Egypt", action: "invested", detail: "$8,800 in Agro Farming" },
  { name: "Isabella", country: "Portugal", action: "withdrew", detail: "17,500 USDT" },
  { name: "Viktor", country: "Austria", action: "invested", detail: "$200,000 in Mineral Resources" },
  { name: "Aaliyah", country: "Kenya", action: "deposited", detail: "$11,200" },
  { name: "Chen", country: "China", action: "invested", detail: "$65,000 in Digital Currency" },
  { name: "Marta", country: "Netherlands", action: "invested", detail: "$50,000 in AI Stock" },
  { name: "Rashid", country: "Saudi Arabia", action: "withdrew", detail: "2.6 BTC" },
  { name: "Camila", country: "Argentina", action: "invested", detail: "$14,000 in Agro Farming" },
  { name: "Noah", country: "Australia", action: "deposited", detail: "$40,000" },
  { name: "Ingrid", country: "Denmark", action: "invested", detail: "$33,000 in Real Estate" },
  { name: "Kwame", country: "Ghana", action: "invested", detail: "$10,000 in Oil & Gas" },
  { name: "Sara", country: "Finland", action: "withdrew", detail: "62,000 USDT" },
  { name: "Andrei", country: "Romania", action: "invested", detail: "$25,000 in Mineral Resources" },
  { name: "Layla", country: "Jordan", action: "deposited", detail: "$18,500" },
  { name: "Thomas", country: "Belgium", action: "invested", detail: "$90,000 in Digital Currency" },
];

const TIMES = ["just now", "1 min ago", "2 min ago", "4 min ago", "6 min ago"];

const ICONS = {
  invested: { Icon: TrendingUp, cls: "text-emerald-300" },
  withdrew: { Icon: ArrowUpFromLine, cls: "text-gold" },
  deposited: { Icon: ArrowDownToLine, cls: "text-sky-300" },
};

export default function LiveActivity() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const intro = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(intro);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || !show) return;
    const cycle = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ACTIVITY.length);
        setShow(true);
      }, 550);
    }, 6000);
    return () => clearInterval(cycle);
  }, [dismissed, show]);

  if (dismissed) return null;

  const a = ACTIVITY[idx];
  const { Icon, cls } = ICONS[a.action] || ICONS.invested;
  const time = TIMES[idx % TIMES.length];
  const initials = a.name.slice(0, 2).toUpperCase();

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-40 sm:left-auto sm:right-6 sm:w-[340px] transition-all duration-500 ease-out ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center gap-3 rounded-2xl border border-gold-deep/25 bg-ink-900/95 p-3.5 pr-9 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-ink-900/80">
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2.5 top-2.5 text-muted hover:text-gold"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient text-xs font-700 text-ink-900">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm text-parchment">
            <span className="font-600">{a.name}</span>
            <span className="text-muted"> from {a.country}</span>
          </p>
          <p className="flex items-center gap-1.5 text-xs">
            <Icon size={13} className={cls} />
            <span className="truncate text-muted">
              just {a.action} <span className="text-parchment">{a.detail}</span>
            </span>
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">{time}</p>
        </div>
      </div>
    </div>
  );
}
