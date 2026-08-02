import { Link } from "react-router-dom";

export function LegalShell({ title, updated, intro, children }) {
  return (
    <article>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink-radial pt-[120px]">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
        <div className="shell relative pb-12">
          <span className="eyebrow"><span className="eyebrow-dot" />Legal</span>
          <h1 className="mt-4 font-display text-4xl font-700 leading-tight text-parchment sm:text-5xl">{title}</h1>
          {updated && <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>}
          {intro && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">{intro}</p>}
        </div>
      </section>

      {/* Body */}
      <div className="bg-ink">
        <div className="shell max-w-3xl py-16">
          {children}
          <div className="mt-14 border-t border-gold-deep/15 pt-6 text-sm text-muted">
            Related:{" "}
            <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link> ·{" "}
            <Link to="/terms" className="text-gold hover:underline">Terms of Use</Link> ·{" "}
            <Link to="/cookies" className="text-gold hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Section({ title, children }) {
  return (
    <section className="mt-10 first:mt-0">
      {title && <h2 className="font-display text-xl font-700 text-parchment sm:text-2xl">{title}</h2>}
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function SubHeading({ children }) {
  return <h3 className="mt-6 font-display text-base font-600 text-parchment">{children}</h3>;
}

export function Bullets({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Mail({ children = "support@oinsfinancegroup.com" }) {
  return <a href={`mailto:${children}`} className="text-gold hover:underline">{children}</a>;
}
