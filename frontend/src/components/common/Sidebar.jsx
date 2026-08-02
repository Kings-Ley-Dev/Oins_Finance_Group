import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard, Layers, Briefcase, LineChart, ArrowDownToLine, ArrowUpFromLine,
  UserCircle, ShieldCheck, FileCheck2, Bell, Gift, X,
} from "lucide-react";
import { useUiStore } from "@/store/uiStore";

export const USER_NAV = [
  { group: "Overview", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true }] },
  { group: "Investments", items: [
    { to: "/dashboard/plans", label: "Plans", icon: Layers },
    { to: "/dashboard/portfolio", label: "Portfolio", icon: Briefcase },
    { to: "/dashboard/performance", label: "Performance", icon: LineChart },
  ]},
  { group: "Payments", items: [
    { to: "/dashboard/deposit", label: "Deposit", icon: ArrowDownToLine },
    { to: "/dashboard/withdraw", label: "Withdraw", icon: ArrowUpFromLine },
  ]},
  { group: "Account", items: [
    { to: "/dashboard/profile", label: "Profile", icon: UserCircle },
    { to: "/dashboard/kyc", label: "KYC", icon: FileCheck2 },
    { to: "/dashboard/security", label: "Security", icon: ShieldCheck },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  ]},
  { group: "Earn", items: [{ to: "/dashboard/referral", label: "Referral", icon: Gift }] },
];

function NavItem({ item, onNavigate }) {
  const Icon = item.icon;
  return (
    <NavLink to={item.to} end={item.end} onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? "bg-gold/12 text-gold" : "text-parchment/70 hover:bg-charcoal-50 hover:text-parchment"
        }`}>
      {({ isActive }) => (<><Icon size={18} className={isActive ? "text-gold" : "text-muted"} />{item.label}</>)}
    </NavLink>
  );
}

export default function Sidebar({ groups = USER_NAV, subtitle = "Finance Group", footer }) {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const close = () => sidebarOpen && toggleSidebar();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-[72px] items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <img src="/logo-full.png" alt="Oins Finance Group" className="h-8 w-auto" />
          {subtitle && subtitle !== "Finance Group" && (
            <span className="rounded-md border border-gold-deep/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold">
              {subtitle}
            </span>
          )}
        </Link>
        <button onClick={toggleSidebar} className="text-muted lg:hidden"><X size={20} /></button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((g) => (
          <div key={g.group}>
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/70">{g.group}</div>
            <div className="space-y-1">{g.items.map((item) => <NavItem key={item.to} item={item} onNavigate={close} />)}</div>
          </div>
        ))}
      </nav>

      {footer && <div className="border-t border-gold-deep/15 p-4">{footer}</div>}
    </div>
  );

  return (
    <>
      <aside className="hidden w-[260px] shrink-0 border-r border-gold-deep/15 bg-ink-900 lg:block">{content}</aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={toggleSidebar} />
          <aside className="absolute left-0 top-0 h-full w-[260px] border-r border-gold-deep/15 bg-ink-900">{content}</aside>
        </div>
      )}
    </>
  );
}
