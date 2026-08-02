import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  { img: "/images/hero-bg.jpg", title: "Grow your wealth with secured, real-world assets.", text: "Transparent, regulated and collateral-backed - built for steady returns." },
  { img: "/images/services/real-estate.jpg", title: "Invest across eight specialized sectors.", text: "Real estate, energy, agriculture, digital assets and more." },
  { img: "/images/services/agro-farming.jpg", title: "Finance real-world businesses.", text: "From farmland to fintech, every position is independently verified." },
  { img: "/images/services/digital-currency.jpg", title: "Track your daily yield in real time.", text: "Watch your portfolio grow with full transparency." },
];

function Carousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative hidden overflow-hidden bg-ink-900 lg:block">
      {/* Slides */}
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('${s.img}')`, opacity: idx === i ? 0.6 : 0 }}
        />
      ))}
      {/* Theme overlays - keep the bottom dark for text, let the photo show above */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/45 to-ink-900/25" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-12">
        <Link to="/" className="flex items-center">
          <img src="/logo-full.png" alt="Oins Finance Group" className="h-10 w-auto" />
        </Link>

        <div>
          <h2 className="max-w-sm font-display text-3xl font-700 leading-tight text-parchment [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">
            {SLIDES[i].title}
          </h2>
          <p className="mt-4 max-w-sm text-sm text-cream-200 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            {SLIDES[i].text}
          </p>

          {/* Indicators */}
          <div className="mt-8 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-3 bg-parchment/30 hover:bg-parchment/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <Carousel />

      {/* Form panel */}
      <div className="flex items-center justify-center bg-ink px-6 py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center lg:hidden">
            <img src="/logo-full.png" alt="Oins Finance Group" className="h-9 w-auto" />
          </Link>
          <h1 className="font-display text-2xl font-700 text-parchment">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
          <div className="mt-8 space-y-4">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
