import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, ChevronDown, LogOut, UserCircle, Search, CheckCheck } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useNotificationStore } from "@/store/notificationStore";
import { disconnectSocket } from "@/lib/socket";

function timeAgo(d) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const dot = { payment: "bg-emerald-400", earning: "bg-gold-bright", success: "bg-emerald-400", kyc: "bg-sky-400", warning: "bg-amber-400", info: "bg-gold" };

export default function Header() {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const { user, logout } = useAuthStore();
  const resetDashboard = useDashboardStore((s) => s.reset);
  const { items, unread, markRead, markAllRead, reset: resetNotifs } = useNotificationStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const menuRef = useRef(null);
  const bellRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials = (user?.fullName || "Investor").split(" ").map((n) => n[0]).slice(0, 2).join("");

  const handleLogout = () => {
    disconnectSocket();
    logout();
    resetDashboard();
    resetNotifs();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-gold-deep/15 bg-ink-900/85 px-5 backdrop-blur-xl">
      <button onClick={toggleSidebar} className="grid h-10 w-10 place-items-center rounded-lg border border-gold-deep/20 text-gold lg:hidden" aria-label="Open menu">
        <Menu size={18} />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input placeholder="Search investments, transactions…" className="w-full rounded-full border border-gold-deep/15 bg-charcoal px-4 py-2 pl-10 text-sm text-parchment placeholder:text-muted focus:border-gold/50 focus:outline-none" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={bellRef}>
          <button onClick={() => setBellOpen((v) => !v)} className="relative grid h-10 w-10 place-items-center rounded-full border border-gold-deep/20 text-parchment/80 hover:text-gold" aria-label="Notifications">
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-bright px-1 text-[10px] font-bold text-ink-900">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </button>

          {bellOpen && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-gold-deep/20 bg-charcoal shadow-lift">
              <div className="flex items-center justify-between border-b border-gold-deep/15 px-4 py-3">
                <span className="text-sm font-600 text-parchment">Notifications</span>
                {unread > 0 && (
                  <button onClick={markAllRead} className="inline-flex items-center gap-1 text-xs text-gold hover:underline">
                    <CheckCheck size={13} /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-muted">No notifications yet.</p>
                ) : (
                  items.map((n) => {
                    const id = n.id || n._id;
                    return (
                      <button key={id} onClick={() => markRead(id)} className={`flex w-full gap-3 border-b border-gold-deep/10 px-4 py-3 text-left last:border-0 hover:bg-charcoal-50 ${n.read ? "opacity-60" : ""}`}>
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[n.type] || "bg-gold"}`} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-600 text-parchment">{n.title}</span>
                          {n.body && <span className="block truncate text-xs text-muted">{n.body}</span>}
                          <span className="mt-0.5 block text-[11px] text-muted/70">{timeAgo(n.createdAt)}</span>
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-gold-deep/20 py-1 pl-1 pr-3 hover:border-gold/40">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-gradient text-xs font-bold text-ink-900">{initials}</span>
            <span className="hidden text-sm font-medium text-parchment sm:block">{user?.fullName || "Investor"}</span>
            <ChevronDown size={15} className="text-muted" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gold-deep/20 bg-charcoal shadow-lift">
              <div className="border-b border-gold-deep/15 px-4 py-3">
                <div className="text-sm font-600 text-parchment">{user?.fullName || "Investor"}</div>
                <div className="truncate text-xs text-muted">{user?.email || "demo@oinsfinance.com"}</div>
              </div>
              <button onClick={() => { setMenuOpen(false); navigate("/dashboard/profile"); }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-parchment/80 hover:bg-charcoal-50">
                <UserCircle size={16} /> Profile
              </button>
              <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-300 hover:bg-charcoal-50">
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
