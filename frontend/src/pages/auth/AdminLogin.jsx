import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { isEmail } from "@/utils/validators";

export default function AdminLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const pushToast = useUiStore((s) => s.pushToast);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!isEmail(form.email)) er.email = "Enter a valid email";
    if (!form.password) er.password = "Password is required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      if (data.user?.role !== "admin") {
        pushToast({ type: "error", title: "Not an admin account", message: "Use the client login to access your dashboard." });
        return;
      }
      setAuth({ token: data.token, user: data.user });
      pushToast({ type: "success", title: "Welcome, admin" });
      navigate("/admin");
    } catch (err) {
      pushToast({
        type: "error",
        title: "Login failed",
        message: err?.response?.data?.message || "Invalid credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Admin sign in"
      subtitle="Restricted access - control panel for Oins Finance Group staff."
      footer={<>Need an admin account? <Link to="/admin/register" className="text-gold hover:underline">Create one</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" name="email" type="email" placeholder="admin@oinsfinancegroup.com" icon={<Mail size={16} />} value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Password" name="password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={form.password} onChange={set("password")} error={errors.password} />
        <Button as="button" type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Sign in to control panel</Button>
      </form>
    </AuthShell>
  );
}
