import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MailCheck, Loader2 } from "lucide-react";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import { authApi } from "@/api/authApi";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState(token ? "verifying" : "idle");

  useEffect(() => {
    if (!token) return;
    authApi.verifyEmail({ token }).then(() => setStatus("done")).catch(() => setStatus("error"));
  }, [token]);

  return (
    <AuthShell title="Verify your email" footer={<Link to="/login" className="text-gold hover:underline">Back to login</Link>}>
      <div className="rounded-xl border border-gold-deep/20 bg-charcoal-50 p-6 text-center">
        {status === "verifying" && <><Loader2 className="mx-auto animate-spin text-gold" /><p className="mt-3 text-sm text-muted">Verifying…</p></>}
        {status === "done" && <><MailCheck className="mx-auto text-emerald-400" size={28} /><p className="mt-3 text-sm text-parchment">Email verified. You can log in now.</p></>}
        {status === "error" && <p className="text-sm text-rose-400">This verification link is invalid or expired.</p>}
        {status === "idle" && <p className="text-sm text-muted">Check your inbox for a verification link to activate your account.</p>}
      </div>
      <Button to="/login" variant="primary" size="lg" className="mt-4 w-full">Continue</Button>
    </AuthShell>
  );
}
