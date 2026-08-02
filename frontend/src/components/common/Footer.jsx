import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { FOOTER } from "@/lib/site";

function Column({ title, links }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l, i) => {
          const cls =
            "group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-parchment";
          const inner = (
            <>
              <ChevronRight
                size={13}
                className="text-gold-deep/60 transition-transform group-hover:translate-x-0.5"
              />
              {l.label}
            </>
          );
          return (
            <li key={`${l.to || l.href}-${i}`}>
              {l.href ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link to={l.to} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { blurb, quickLinks, investing, contact, legal } = FOOTER;
  return (
    <footer className="border-t border-gold-deep/15 bg-ink-900">
      <div className="shell grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-4">
            <img src="/logo-full.png" alt="Oins Finance Group" className="h-11 w-auto" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">{blurb}</p>
        </div>

        <Column title="Quick Links" links={quickLinks} />
        <Column title="Investing" links={investing} />

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-deep" />
              {contact.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold-deep" />
              <a href={`tel:${contact.phone}`} className="hover:text-parchment">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold-deep" />
              <a href={`mailto:${contact.email}`} className="hover:text-parchment">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold-deep/10">
        <div className="shell flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <div className="flex flex-wrap items-center gap-5">
            {legal.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs text-muted transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Oins Finance Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
