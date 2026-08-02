import { useState } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import { Loading, ErrorState } from "@/components/dashboard/DataState";
import AdminTable from "@/components/admin/AdminTable";
import { useAdminData } from "@/components/admin/useAdminData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { adminService } from "@/lib/adminService";
import { useUiStore } from "@/store/uiStore";
import { formatUSD } from "@/utils/formatters";

export default function AdminUsers() {
  const { data, status, error, reload } = useAdminData(adminService.users);
  const pushToast = useUiStore((s) => s.pushToast);

  const toggleBan = async (u) => {
    try { await adminService.banUser(u.id, !u.banned); pushToast({ type: "success", title: u.banned ? "User reinstated" : "User banned" }); reload(); }
    catch (e) { pushToast({ type: "error", title: "Action failed", message: e?.response?.data?.message }); }
  };

  const adjust = async (u) => {
    const v = prompt(`Adjust balance for ${u.fullName} (use negative to deduct):`, "0");
    if (v == null) return;
    const delta = Number(v);
    if (!delta) return;
    try { await adminService.adjustBalance(u.id, delta, "manual"); pushToast({ type: "success", title: "Balance adjusted" }); reload(); }
    catch (e) { pushToast({ type: "error", title: "Adjustment failed", message: e?.response?.data?.message }); }
  };

  const columns = [
    { key: "fullName", header: "User", render: (u) => (<div><div className="font-600 text-parchment">{u.fullName}</div><div className="text-xs text-muted">{u.email}</div></div>) },
    { key: "role", header: "Role", render: (u) => <Badge tone={u.role === "admin" ? "gold" : "cream"}>{u.role}</Badge> },
    { key: "available", header: "Available", render: (u) => formatUSD(u.available) },
    { key: "invested", header: "Invested", render: (u) => formatUSD(u.invested) },
    { key: "status", header: "Status", render: (u) => <Badge tone={u.banned ? "danger" : "success"}>{u.banned ? "banned" : "active"}</Badge> },
    { key: "actions", header: "", render: (u) => u.role === "admin" ? null : (
      <div className="flex gap-2">
        <Button onClick={() => adjust(u)} variant="secondary" size="sm">Adjust</Button>
        <Button onClick={() => toggleBan(u)} variant={u.banned ? "outline" : "secondary"} size="sm">{u.banned ? "Unban" : "Ban"}</Button>
      </div>
    )},
  ];

  return (
    <DashboardPage title="Users" subtitle="Manage accounts, balances and access.">
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorState message={error} onRetry={reload} />}
      {status === "ready" && <AdminTable columns={columns} rows={data} keyField="id" />}
    </DashboardPage>
  );
}
