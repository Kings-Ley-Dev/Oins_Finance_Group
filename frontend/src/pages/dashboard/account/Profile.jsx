import { useState } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { userApi } from "@/api/userApi";

export default function Profile() {
  const { user, updateUser, token } = useAuthStore();
  const isDemo = token === "demo-token";
  const pushToast = useUiStore((s) => s.pushToast);
  const [form, setForm] = useState({
    fullName: user?.fullName || "Investor",
    email: user?.email || "demo@oinsfinance.com",
    phone: user?.phone || "",
    country: user?.country || "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    updateUser(form);
    if (!isDemo) {
      try {
        await userApi.updateProfile(form);
      } catch (err) {
        return pushToast({ type: "error", title: "Save failed", message: err?.response?.data?.message || "Try again." });
      }
    }
    pushToast({ type: "success", title: "Profile saved" });
  };

  const initials = form.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <DashboardPage title="Profile" subtitle="Manage your personal details and tier.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.6fr]">
        <Card>
          <CardBody className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-gradient font-display text-2xl font-bold text-ink-900">
              {initials}
            </div>
            <div className="mt-3 font-display text-lg font-600 text-parchment">{form.fullName}</div>
            <div className="text-sm text-muted">{form.email}</div>
            <div className="mt-3 flex justify-center">
              <Badge tone="gold">Silver Tier</Badge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Personal details" />
          <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full name" value={form.fullName} onChange={set("fullName")} />
            <Input label="Email" value={form.email} onChange={set("email")} type="email" />
            <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="+1 …" />
            <Input label="Country" value={form.country} onChange={set("country")} placeholder="Country" />
            <div className="sm:col-span-2">
              <Button onClick={save} variant="primary" size="md">Save changes</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardPage>
  );
}
