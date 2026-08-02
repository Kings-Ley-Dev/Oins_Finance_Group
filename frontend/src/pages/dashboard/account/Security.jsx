import { useState } from "react";
import { DashboardPage } from "@/components/dashboard/StatCard";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useUiStore } from "@/store/uiStore";

export default function Security() {
  const pushToast = useUiStore((s) => s.pushToast);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <DashboardPage title="Security" subtitle="Protect your account with a strong password and 2FA.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Change password" />
          <CardBody className="space-y-4">
            <Input label="Current password" type="password" />
            <Input label="New password" type="password" hint="At least 8 characters" />
            <Input label="Confirm new password" type="password" />
            <Button variant="primary" size="md" onClick={() => pushToast({ type: "success", title: "Password updated" })}>
              Update password
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Two-factor authentication" action={<Badge tone={twoFA ? "success" : "gold"}>{twoFA ? "On" : "Off"}</Badge>} />
          <CardBody>
            <p className="text-sm text-muted">Add an authenticator app for an extra layer of protection at login.</p>
            <Button
              variant={twoFA ? "outline" : "primary"}
              size="md"
              className="mt-4"
              onClick={() => { setTwoFA((v) => !v); pushToast({ type: "info", title: twoFA ? "2FA disabled" : "2FA setup (Phase 2 wiring)" }); }}
            >
              {twoFA ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </DashboardPage>
  );
}
