import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, KeyRound } from "lucide-react";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { isEmail } from "@/utils/validators";

export default function AdminRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const pushToast = useUiStore((s) => s.pushToast);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", code: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (form.fullName.trim().length < 2) er.fullName = "Enter your full name";
    if (!isEmail(form.email)) er.email = "Enter a valid email";
    if (form.password.length < 8) er.password = "At least 8 characters";
    if (!form.code) er.code = "Admin signup code is required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await authApi.adminRegister(form);
      setAuth({ token: data.token, user: data.user });
      pushToast({ type: "success", title: "Admin account created" });
      navigate("/admin");
    } catch (err) {
      pushToast({
        type: "error",
        title: "Could not create account",
        message: err?.response?.data?.message || "Check the signup code.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create admin account"
      subtitle="Staff only. A valid admin signup code is required to register."
      footer={<>Already have access? <Link to="/admin/login" className="text-gold hover:underline">Admin sign in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Input label="Full name" name="fullName" placeholder="Jane Doe" icon={<User size={16} />} value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
        <Input label="Email" name="email" type="email" placeholder="admin@oinsfinancegroup.com" icon={<Mail size={16} />} value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Password" name="password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={form.password} onChange={set("password")} error={errors.password} />
        <Input label="Admin signup code" name="code" type="password" placeholder="Provided by your administrator" icon={<KeyRound size={16} />} value={form.code} onChange={set("code")} error={errors.code} />
        <Button as="button" type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Create admin account</Button>
      </form>
    </AuthShell>
  );
}
