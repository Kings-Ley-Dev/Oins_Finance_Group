import { ArrowRight } from "lucide-react";
import { STEPS } from "@/lib/site";
import Icon from "@/components/ui/Icon";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-200 to-sand/70 py-20 sm:py-24">
      <div className="shell">
        <div className="text-center">
          <span className="eyebrow mx-auto border-cocoa/15 bg-cream/70 text-cocoa">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
            {STEPS.eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-700 leading-tight text-cocoa sm:text-[2.4rem]">
            {STEPS.heading[0]}
            <br className="hidden sm:block" /> {STEPS.heading[1]}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.items.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="h-full rounded-card border border-cocoa/10 bg-cream-50 p-6 text-center shadow-cream">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                  {s.step}
                </span>
                <div className="mx-auto mt-4 mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-ink-900 shadow-gold">
                  <Icon name={s.icon} size={26} strokeWidth={2} />
                </div>
                <h3 className="font-display text-base font-600 text-cocoa">{s.title}</h3>
                <p className="mt-2 inline-block rounded-full bg-cocoa/5 px-3 py-1 text-xs text-cocoa/70">
                  {s.note}
                </p>
              </div>

              {i < STEPS.items.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-cocoa text-cream">
                    <ArrowRight size={14} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
