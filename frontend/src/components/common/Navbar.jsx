import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, OPPORTUNITIES } from "@/lib/site";
import Button from "@/components/ui/Button";
import ServicesMega from "@/components/common/ServicesMega";

function Brand() {
  return (
    <Link to="/" className="flex items-center" aria-label="Oins Finance Group - home">
      <img src="/logo-full.png" alt="Oins Finance Group" className="h-9 w-auto sm:h-10" />
    </Link>
  );
}

const SERVICES_LABEL = "Services";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile drawer
  const [mobileServices, setMobileServices] = useState(false);
  const [mega, setMega] = useState(false); // desktop mega menu
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const forceSolid = location.pathname.startsWith("/services/") || location.pathname === "/about" || location.pathname === "/faq";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setMega(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMega(false);
    setOpen(false);
    setMobileServices(false);
  }, [location.pathname]);

  return (
    <header
      onMouseLeave={() => setMega(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mega || forceSolid
          ? "border-b border-gold-deep/15 bg-ink-900/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="shell flex h-[72px] items-center justify-between">
        <Brand />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const isServices = l.label === SERVICES_LABEL;
            if (isServices) {
              return (
                <li key={l.label} onMouseEnter={() => setMega(true)}>
                  <button
                    type="button"
                    onClick={() => setMega((v) => !v)}
                    aria-expanded={mega}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      mega ? "text-gold" : "text-parchment/75 hover:text-parchment"
                    }`}
                  >
                    {l.label}
                    <ChevronDown size={14} className={`transition-transform ${mega ? "rotate-180" : ""}`} />
                  </button>
                </li>
              );
            }
            return (
              <li key={l.to} onMouseEnter={() => setMega(false)}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-gold" : "text-parchment/75 hover:text-parchment"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/login" variant="outline" size="sm">Log In</Button>
          <Button to="/register" variant="primary" size="sm">Sign Up</Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold-deep/30 text-gold lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Desktop mega menu */}
      <div
        className={`absolute inset-x-0 top-full hidden origin-top lg:block ${
          mega ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`shell transition-all duration-200 ${
            mega ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="mt-2 overflow-hidden rounded-2xl border border-gold-deep/20 bg-ink-900/95 shadow-lift backdrop-blur-xl">
            <ServicesMega onNavigate={() => setMega(false)} />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-gold-deep/15 bg-ink-900/95 backdrop-blur-xl lg:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => {
              if (l.label === SERVICES_LABEL) {
                return (
                  <div key={l.to}>
                    <button
                      onClick={() => setMobileServices((v) => !v)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-parchment/80"
                    >
                      {l.label}
                      <ChevronDown size={16} className={`transition-transform ${mobileServices ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServices && (
                      <div className="mb-1 grid grid-cols-2 gap-1 px-2 pb-2">
                        {OPPORTUNITIES.items.map((o) => {
                          const cls = "rounded-lg bg-charcoal-50 px-3 py-2 text-xs font-medium text-parchment/80 hover:text-gold";
                          return o.externalUrl ? (
                            <a
                              key={o.key}
                              href={o.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpen(false)}
                              className={cls}
                            >
                              {o.name}
                            </a>
                          ) : (
                            <Link
                              key={o.key}
                              to={`/services/${o.key}`}
                              onClick={() => setOpen(false)}
                              className={cls}
                            >
                              {o.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive ? "bg-charcoal text-gold" : "text-parchment/80"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              );
            })}
            <div className="mt-2 flex gap-3">
              <Button to="/login" variant="outline" size="sm" className="flex-1">Log In</Button>
              <Button to="/register" variant="primary" size="sm" className="flex-1">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
