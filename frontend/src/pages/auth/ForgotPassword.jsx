import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/api/authApi";
import { useUiStore } from "@/store/uiStore";
import { isEmail } from "@/utils/validators";

export default function ForgotPassword() {
  const pushToast = useUiStore((s) => s.pushToast);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) return pushToast({ type: "error", title: "Enter a valid email" });
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
    } catch { /* same UX whether or not the email exists */ }
    finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send a reset link."
      footer={<><Link to="/login" className="text-gold hover:underline">Back to login</Link></>}
    >
      {sent ? (
        <div className="rounded-xl border border-gold-deep/20 bg-charcoal-50 p-5 text-sm text-muted">
          If an account exists for <span className="text-parchment">{email}</span>, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@email.com" icon={<Mail size={16} />} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button as="button" type="submit" variant="primary" size="lg" className="w-full" loading={loading}>Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
