import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/api/authApi";
import { useUiStore } from "@/store/uiStore";
import { minLen } from "@/utils/validators";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const navigate = useNavigate();
  const pushToast = useUiStore((s) => s.pushToast);
  const [pw, setPw] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!minLen(pw.password, 8)) return pushToast({ type: "error", title: "At least 8 characters" });
    if (pw.password !== pw.confirm) return pushToast({ type: "error", title: "Passwords don't match" });
    setLoading(true);
    try {
      await authApi.resetPassword({ token, password: pw.password });
      pushToast({ type: "success", title: "Password reset" });
      navigate("/login");
    } catch (err) {
      pushToast({ type: "error", title: "Reset failed", message: err?.response?.data?.message || "Link may have expired." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password for your account." footer={<Link to="/login" className="text-gold hover:underline">Back to login</Link>}>
      <form onSubmit={submit} className="space-y-4">
        <Input label="New password" type="password" icon={<Lock size={16} />} value={pw.password} onChange={(e) => setPw((p) => ({ ...p, password: e.target.value }))} hint="At least 8 characters" />
        <Input label="Confirm password" type="password" icon={<Lock size={16} />} value={pw.confirm} onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))} />
        <Button as="button" type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Reset password</Button>
      </form>
    </AuthShell>
  );
}
