import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FOOTER } from "@/lib/site";
import { useUiStore } from "@/store/uiStore";
import { isEmail, required } from "@/utils/validators";

const CHANNELS = [
  { icon: Mail, label: "Email us", value: FOOTER.contact.email, href: `mailto:${FOOTER.contact.email}` },
  { icon: Phone, label: "Call us", value: FOOTER.contact.phone, href: `tel:${FOOTER.contact.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Visit us", value: FOOTER.contact.address },
  { icon: Clock, label: "Working hours", value: "Mon - Fri · 9:00 - 18:00 EST" },
];

export default function Contact() {
  const pushToast = useUiStore((s) => s.pushToast);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!required(form.name)) er.name = "Your name is required";
    if (!isEmail(form.email)) er.email = "Enter a valid email";
    if (!required(form.message)) er.message = "Please write a message";
    setErrors(er);
    if (Object.keys(er).length) return;
    pushToast({ type: "success", title: "Message sent", message: "Our team will respond within one business day." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to our investment team."
      subtitle="Whether you're exploring your first investment or scaling a portfolio, our team is here to help. Reach out and we'll respond within one business day."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Channels */}
        <div className="space-y-4">
          {CHANNELS.map((c) => {
            const I = c.icon;
            const inner = (
              <div className="flex items-start gap-4 rounded-card border border-gold-deep/15 bg-charcoal p-5 transition-colors hover:border-gold/40">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-gradient text-ink-900"><I size={20} /></span>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted">{c.label}</div>
                  <div className="mt-1 font-display font-600 text-parchment">{c.value}</div>
                </div>
              </div>
            );
            return c.href ? <a key={c.label} href={c.href} className="block">{inner}</a> : <div key={c.label}>{inner}</div>;
          })}

          <div className="rounded-card border border-gold-deep/20 bg-gold/5 p-5">
            <div className="flex items-center gap-3 text-gold">
              <MessageSquare size={18} />
              <span className="font-display font-600">Prefer the dashboard?</span>
            </div>
            <p className="mt-2 text-sm text-muted">Existing investors can reach support directly from in-app notifications.</p>
            <Button to="/login" variant="secondary" size="sm" className="mt-4" icon={<ArrowRight size={14} />}>Go to login</Button>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-card border border-gold-deep/15 bg-charcoal p-6 sm:p-8">
          <h2 className="font-display text-xl font-700 text-parchment">Send us a message</h2>
          <p className="mt-1 text-sm text-muted">Fill in the form and we'll get back to you shortly.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full name" placeholder="Jane Investor" value={form.name} onChange={set("name")} error={errors.name} />
              <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} error={errors.email} />
            </div>
            <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={set("subject")} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-parchment/80">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Tell us a little about what you're looking for…"
                className={`w-full rounded-xl border bg-charcoal-50 px-4 py-3 text-sm text-parchment placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-gold/40 ${errors.message ? "border-rose-500/60" : "border-gold-deep/25"}`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>}
            </div>
            <Button as="button" type="submit" variant="primary" size="lg" className="w-full" icon={<Send size={16} />}>Send message</Button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
