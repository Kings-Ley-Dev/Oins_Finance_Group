import { useState, useEffect, useCallback } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

const initials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2);

export default function Testimonial() {
  const [i, setI] = useState(0);
  const count = TESTIMONIALS.length;

  const go = useCallback((dir) => setI((v) => (v + dir + count) % count), [count]);

  // auto-advance, pauses are simple (resets on manual nav via dependency)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count, i]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_20%_0%,rgba(201,169,97,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      <div className="shell relative">
        <span className="eyebrow mx-auto block w-fit">
          <span className="eyebrow-dot" />
          What our investors say
        </span>

        <div className="relative mx-auto mt-8 max-w-3xl">
          <figure className="rounded-card border border-gold-deep/20 bg-charcoal/70 p-8 backdrop-blur sm:p-12">
            <Quote className="text-gold/40" size={40} />
            <blockquote className="mt-4 min-h-[120px] font-display text-xl font-500 leading-relaxed text-parchment sm:text-2xl">
              {t.quote}
            </blockquote>

            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold-deep/15 pt-6">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-gradient font-display text-lg font-bold text-ink-900">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="font-display font-600 text-parchment">{t.name}</div>
                  <div className="text-sm text-muted">{t.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-gold-bright text-gold-bright" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gold-bright">{t.rating}</span>
              </div>
            </figcaption>
          </figure>

          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute -left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-gold-deep/30 bg-ink-900 text-gold shadow-lift transition-colors hover:border-gold hover:bg-charcoal lg:-left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute -right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-gold-deep/30 bg-ink-900 text-gold shadow-lift transition-colors hover:border-gold hover:bg-charcoal lg:-right-6"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-7 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-7 bg-gold" : "w-2.5 bg-parchment/25 hover:bg-parchment/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
