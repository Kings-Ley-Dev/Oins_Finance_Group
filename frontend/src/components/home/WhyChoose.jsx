import { WHY } from "@/lib/site";
import Icon from "@/components/ui/Icon";

function FeatureCard({ f, large }) {
  return (
    <div
      className={`group relative rounded-card border border-cocoa/10 bg-cream-200 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-cream ${
        large ? "lg:p-9" : ""
      }`}
    >
      <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-ink-900 shadow-gold">
        <Icon name={f.icon} size={large ? 26 : 24} strokeWidth={2} />
      </div>
      <h3 className="font-display text-lg font-600 text-cocoa">{f.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cocoa/70">{f.body}</p>
    </div>
  );
}

export default function WhyChoose() {
  const [featured, rest] = [
    WHY.features.filter((f) => f.featured),
    WHY.features.filter((f) => !f.featured),
  ];

  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="shell">
        <span className="eyebrow border-cocoa/15 bg-cream-200 text-cocoa">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
          {WHY.eyebrow}
        </span>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-700 leading-tight text-cocoa sm:text-[2.5rem]">
          {WHY.heading[0]}
          <br className="hidden sm:block" /> {WHY.heading[1]}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((f) => (
            <FeatureCard key={f.title} f={f} large />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
