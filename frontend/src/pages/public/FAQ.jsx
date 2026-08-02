import { useState } from "react";
import { Plus, Minus, ArrowRight, MessagesSquare } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const FAQS = [
  { q: "How are my investments secured?", a: "Every asset on the platform is backed by physical or legal collateral, independently verified before it is listed. Your principal is tied to real-world assets rather than speculation." },
  { q: "What is the minimum investment?", a: "You can start from as little as $100 and scale up at your own pace across any of our eight sectors." },
  { q: "How often are returns paid?", a: "Yields are calculated daily and posted to your earnings log. Payout frequency depends on the asset's term, and your accrued earnings are always visible in real time." },
  { q: "Is Oins Finance Group regulated?", a: "Yes - the platform operates under a fully compliant investment framework with strict transparency and reporting standards." },
  { q: "How do I create an account?", a: "Click Sign Up, enter your details including your country and phone number, verify your email, and complete a short KYC step. The whole process takes only a few minutes." },
  { q: "What is KYC and why is it required?", a: "KYC (Know Your Customer) is an identity-verification step required by financial regulations. It protects you and the platform against fraud, and unlocks withdrawals once approved." },
  { q: "How do I make a deposit?", a: "From your dashboard, choose Deposit and select either a bank transfer or a crypto payment. Each method generates secure payment details, and your wallet is credited once the payment is confirmed." },
  { q: "Which payment methods do you support?", a: "We support bank transfers and major cryptocurrencies such as BTC, ETH and USDT. More local payment options are added regularly." },
  { q: "How long do withdrawals take?", a: "Withdrawal requests are reviewed by our team and, once approved, are typically processed within 24-72 hours depending on your chosen method." },
  { q: "Can I withdraw before my investment matures?", a: "Your invested principal is locked for the asset's term to deliver the projected returns. Available wallet balance, however, can be withdrawn at any time." },
  { q: "How is my return on investment calculated?", a: "Each sector has a defined ROI range and term. Returns accrue daily based on your principal and the asset's configured rate, and are reflected in your portfolio." },
  { q: "Are there any hidden fees?", a: "No. Any applicable fees are shown clearly before you confirm a transaction. We are committed to full transparency on costs." },
  { q: "Is my personal data safe?", a: "Yes. Sensitive documents are stored securely, payment data is encrypted, and we never share your information with unauthorized third parties." },
  { q: "What happens if an investment underperforms?", a: "Because positions are collateral-backed, downside is mitigated by the underlying assets. Our diligence process is designed to minimise the risk of underperformance." },
  { q: "How can I contact support?", a: "You can reach our team any time through the Contact page, by email, or via the in-app notifications. We aim to respond within one business day." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 pt-[120px]">
        <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/68 to-ink-900/92" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(230,194,90,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="shell relative pb-16 text-center">
          <Badge tone="gold" className="mb-5"><span className="eyebrow-dot" />FAQs</Badge>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-700 leading-tight text-parchment sm:text-5xl [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            Questions? <span className="text-gold-grad">We've got answers.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-parchment/85">
            Everything you need to know about investing with Oins Finance Group - from getting started
            to deposits, returns, security and withdrawals.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <div className="bg-ink">
        <div className="shell max-w-3xl py-16">
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`overflow-hidden rounded-card border bg-charcoal transition-colors ${isOpen ? "border-gold/40" : "border-gold-deep/15 hover:border-gold-deep/30"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-display font-600 ${isOpen ? "text-gold" : "text-parchment"}`}>{f.q}</span>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${isOpen ? "border-gold/40 bg-gold/10 text-gold" : "border-gold-deep/25 text-muted"}`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div className="mt-10 overflow-hidden rounded-[24px] border border-gold-deep/25 bg-charcoal/70 p-8 text-center sm:p-10">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-ink-900"><MessagesSquare size={22} /></span>
            <h2 className="mt-4 font-display text-xl font-700 text-parchment sm:text-2xl">Still have questions?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">Our team is here to help. Reach out and we'll get back to you within one business day.</p>
            <Button to="/contact" variant="primary" size="lg" className="mt-6" icon={<ArrowRight size={16} />}>Contact support</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
