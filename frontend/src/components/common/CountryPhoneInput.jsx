import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";

export default function CountryPhoneInput({ country, phone, onCountry, onPhone, error }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const selected = COUNTRIES.find((c) => c.code === country) || null;

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(s) || c.dial.includes(s)) : COUNTRIES;
  }, [q]);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-parchment/80">Phone number</label>
      <div className="flex gap-2" ref={ref}>
        {/* Country selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-[46px] items-center gap-1.5 rounded-xl border bg-charcoal-50 px-3 text-sm text-parchment transition-colors hover:border-gold/50 ${error ? "border-rose-500/60" : "border-gold-deep/25"}`}
          >
            {selected ? (
              <><span className="text-base leading-none">{selected.flag}</span><span className="text-muted">{selected.dial}</span></>
            ) : (
              <span className="text-muted">🌍 Country</span>
            )}
            <ChevronDown size={14} className={`text-muted transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute z-20 mt-2 w-72 overflow-hidden rounded-xl border border-gold-deep/25 bg-ink-900 shadow-lift">
              <div className="flex items-center gap-2 border-b border-gold-deep/15 px-3 py-2">
                <Search size={14} className="text-muted" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search country"
                  className="w-full bg-transparent text-sm text-parchment placeholder:text-muted focus:outline-none"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto py-1">
                {filtered.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => { onCountry(c.code); setOpen(false); setQ(""); }}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-parchment/90 hover:bg-charcoal-50"
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-muted">{c.dial}</span>
                      {c.code === country && <Check size={14} className="text-gold" />}
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && <li className="px-3 py-3 text-center text-sm text-muted">No match</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Phone number - enabled only after a country is chosen */}
        <input
          type="tel"
          inputMode="tel"
          disabled={!selected}
          value={phone}
          onChange={(e) => onPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
          placeholder={selected ? "6 12 34 56 78" : "Select a country first"}
          className={`h-[46px] w-full rounded-xl border bg-charcoal-50 px-4 text-sm text-parchment placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-gold/40 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-rose-500/60" : "border-gold-deep/25"}`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
