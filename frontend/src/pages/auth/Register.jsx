import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import AuthShell from "@/components/common/AuthShell";
import GoogleButton from "@/components/common/GoogleButton";
import CountryPhoneInput from "@/components/common/CountryPhoneInput";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { COUNTRIES } from "@/lib/countries";
import { isEmail, minLen, required } from "@/utils/validators";

export default function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const pushToast = useUiStore((s) => s.pushToast);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", country: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!required(form.fullName)) er.fullName = "Full name is required";
    if (!isEmail(form.email)) er.email = "Enter a valid email";
    if (!form.country) er.phone = "Choose your country";
    else if (!required(form.phone)) er.phone = "Phone number is required";
    if (!minLen(form.password, 8)) er.password = "At least 8 characters";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const dial = COUNTRIES.find((c) => c.code === form.country)?.dial || "";
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        country: form.country,
        phone: `${dial} ${form.phone}`.trim(),
      };
      
      const { data } = await authApi.register(payload);
      setAuth({ token: data.token, user: data.user });
      pushToast({ type: "success", title: "Account created" });
      navigate("/dashboard");
    } catch (err) {
      // 🚨 DEV LOGGING: Prints full raw error object in the browser DevTools (F12)
      console.error("[Oins Register Error Details]:", {
        errorObject: err,
        response: err?.response,
        status: err?.response?.status,
        data: err?.response?.data,
        message: err?.message
      });

      // 🧠 SMART ERRORS: Determines the exact root cause of the crash
      let friendlyMessage = "Try Again.";
      if (err?.response) {
        // The server received the request and responded with an error (e.g. 400, 422, 500)
        friendlyMessage = err.response.data?.message || `Error ${err.response.status}: Server returned an error.`;
      } else if (err?.request) {
        // The request was sent but no response came back (CORS block, invalid URL, or Server is offline)
        friendlyMessage = "Cannot connect to the API. Check if your VITE_API_URL is correct or if CORS is blocking the request.";
      } else {
        friendlyMessage = err.message || "An unexpected error occurred.";
      }

      pushToast({
        type: "error",
        title: "Registration failed",
        message: friendlyMessage,
      });
    } finally {
      // Small delay to prevent loading state flashes
      setTimeout(() => setLoading(false), 300);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start investing in secured, collateral-backed assets in minutes."
      footer={<>Already registered? <Link to="/login" className="text-gold hover:underline">Log in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Input label="Full name" name="fullName" placeholder="Jane Investor" icon={<User size={16} />} value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
        <Input label="Email" name="email" type="email" placeholder="you@email.com" icon={<Mail size={16} />} value={form.email} onChange={set("email")} error={errors.email} />
        <CountryPhoneInput
          country={form.country}
          phone={form.phone}
          onCountry={(code) => setForm((f) => ({ ...f, country: code }))}
          onPhone={(val) => setForm((f) => ({ ...f, phone: val }))}
          error={errors.phone}
        />
        <Input label="Password" name="password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={form.password} onChange={set("password")} error={errors.password} />
        <Button as="button" type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Create Account</Button>
      </form>
      <p className="mt-4 text-center text-xs text-muted">
        By signing up you agree to our{" "}
        <Link to="/terms" className="text-gold hover:underline">Terms of Use</Link> and{" "}
        <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
      </p>
    </AuthShell>
  );
}
