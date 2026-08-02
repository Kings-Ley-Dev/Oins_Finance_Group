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

export default function Login() {
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
      setAuth({ token: data.token, user: data.user });
      pushToast({ type: "success", title: "Welcome back" });
      navigate("/dashboard");
    } catch (err) {
      // DEV LOGGING: Prints detailed connection/response details in browser DevTools (F12)
      console.error("[Oins Login Error Details]:", {
        errorObject: err,
        response: err?.response,
        status: err?.response?.status,
        data: err?.response?.data,
        message: err?.message
      });

      // SMART ERRORS: Distinguishes between wrong passwords and host network blocks
      let friendlyMessage = "Check your credentials.";
      if (err?.response) {
        // Server received the request and replied with a specific error (e.g. 401 Unauthorized)
        friendlyMessage = err.response.data?.message || `Error ${err.response.status}: Unable to log in.`;
      } else if (err?.request) {
        // Connection timed out or was blocked by the browser (e.g. CORS block, bad API address)
        friendlyMessage = "Cannot connect to the API. Verify your VITE_API_URL or check if CORS is blocking your browser.";
      } else {
        friendlyMessage = err.message || "An unexpected error occurred.";
      }

      pushToast({
        type: "error",
        title: "Login failed",
        message: friendlyMessage,
      });
    } finally {
      // Small timeout to prevent loading animation flashes
      setTimeout(() => setLoading(false), 300);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your portfolio and track daily yield."
      footer={<>No account? <Link to="/register" className="text-gold hover:underline">Create one</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" name="email" type="email" placeholder="you@email.com" icon={<Mail size={16} />} value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Password" name="password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={form.password} onChange={set("password")} error={errors.password} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-gold hover:underline">Forgot password?</Link>
        </div>
        <Button as="button" type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Log In</Button>
      </form>
    </AuthShell>
  );
}
