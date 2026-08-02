import { Outlet } from "react-router-dom";
import {
  LayoutDashboard, Users, Briefcase, ArrowDownToLine, ArrowUpFromLine,
  FileCheck2, ScrollText, SlidersHorizontal, Settings as Cog,
} from "lucide-react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

const ADMIN_NAV = [
  { group: "Control", items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }] },
  { group: "Management", items: [
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/investments", label: "Investments", icon: Briefcase },
  ]},
  { group: "Payments", items: [
    { to: "/admin/deposits", label: "Deposits", icon: ArrowDownToLine },
    { to: "/admin/withdrawals", label: "Withdrawals", icon: ArrowUpFromLine },
  ]},
  { group: "Compliance", items: [
    { to: "/admin/kyc", label: "KYC review", icon: FileCheck2 },
    { to: "/admin/transactions", label: "Audit trail", icon: ScrollText },
  ]},
  { group: "Config", items: [
    { to: "/admin/roi", label: "ROI config", icon: SlidersHorizontal },
    { to: "/admin/settings", label: "Settings", icon: Cog },
  ]},
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar groups={ADMIN_NAV} subtitle="Admin Panel" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-5 py-6 sm:px-7">
          <div className="mx-auto max-w-6xl"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
