import { useParams, Navigate } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, ShieldCheck, BadgeCheck, Lightbulb,
  HeartHandshake, Leaf, Star, Trophy, MapPin, Sparkles, Headphones,
  HandCoins, TrendingUp,
} from "lucide-react";
import { getService } from "@/lib/site";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

const CARD_ICONS = {
  ShieldCheck, BadgeCheck, Lightbulb, HeartHandshake, Leaf,
  Star, Trophy, MapPin, Sparkles, Headphones, HandCoins, TrendingUp,
};

function GalleryBlock({ service }) {
  if (!service.gallery?.length) return null;
  return (
    <div className={service.galleryTitle ? "border-t border-gold-deep/15 pt-12" : ""}>
      {service.galleryTitle && (
        <h2 className="mb-6 font-display text-2xl font-700 text-parchment">{service.galleryTitle}</h2>
      )}
      <div className={`grid grid-cols-1 gap-4 ${service.gallery.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {service.gallery.map((src) => (
          <img
            key={src}
            src={src}
            alt={`${service.name} operations`}
            className="h-56 w-full rounded-card border border-gold-deep/15 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

function ValueCard({ c, big }) {
  const I = CARD_ICONS[c.icon] || CheckCircle2;
  return (
    <div className={`rounded-card border border-gold-deep/15 bg-charcoal ${big ? "p-8" : "p-6"}`}>
      <span className={`grid place-items-center rounded-xl border border-gold-deep/30 bg-black text-gold ${big ? "h-14 w-14" : "h-11 w-11"}`}>
        <I size={big ? 26 : 20} />
      </span>
      <div className={`mt-4 font-display font-600 text-parchment ${big ? "text-lg" : ""}`}>{c.title}</div>
      <p className={`mt-2 leading-relaxed text-muted ${big ? "text-[15px]" : "text-sm"}`}>{c.body}</p>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-gold-deep/20 bg-charcoal/70 px-5 py-4 backdrop-blur">
      <div className="text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className={`mt-1 font-display text-xl font-700 ${accent ? "text-gold-bright" : "text-parchment"}`}>
        {value}
      </div>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <Navigate to="/" replace />;
  // Lending has no internal page - direct visits go straight to the external site.
  if (service.externalOnly && service.externalUrl) {
    window.location.replace(service.externalUrl);
    return null;
  }

  const heroImg = `/images/services/${slug}.jpg`;

  return (
    <article>
      {/* Hero with sector photo + black/gold overlay */}
      <section className="relative overflow-hidden bg-ink-900 pt-[120px]">
        <div className="pointer-events-none absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImg}')` }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/82 via-ink-900/78 to-ink-900/96" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,rgba(230,194,90,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

        <div className="shell relative pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${service.tint} text-white shadow-lift`}>
                <Icon name={service.icon} size={30} />
              </span>
              <h1 className="font-display text-4xl font-700 leading-tight text-parchment sm:text-5xl">
                {service.name}
              </h1>
            </div>
            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-parchment [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
              {service.tagline}
            </p>
          </div>

          {!service.externalUrl && (
            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <Stat label="Return on investment" value={service.roi} accent />
              <Stat label="Investment term" value={service.term} />
              <Stat label="Minimum" value={service.min || "$100"} />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {service.externalUrl ? (
              <Button href={service.externalUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                {service.name}
              </Button>
            ) : (
              <Button to="/register" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                Invest in {service.name}
              </Button>
            )}
            <Button to="/contact" variant="secondary" size="lg">Talk to our team</Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-ink py-16">
        <div className="shell space-y-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-700 text-parchment">About {service.name}</h2>
              <div className="mt-4 space-y-4">
                {(service.overview || [service.body]).map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-muted">{p}</p>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {(service.highlights || []).map((h) => (
                <div key={h.title} className="rounded-card border border-gold-deep/15 bg-charcoal p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-gold-bright" size={20} />
                    <div>
                      <div className="font-display font-600 text-parchment">{h.title}</div>
                      <p className="mt-1 text-sm text-muted">{h.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {service.galleryPosition === "afterAbout" && <GalleryBlock service={service} />}

          {/* Rich content sections (e.g. Mineral Resources) */}
          {service.sections?.map((sec, si) => (
            <div key={sec.title || si} className="border-t border-gold-deep/15 pt-12">
              {sec.title && <h2 className="font-display text-2xl font-700 text-parchment">{sec.title}</h2>}
              {sec.body?.map((p, i) => (
                <p key={i} className={`${sec.title ? "mt-3" : ""} max-w-3xl text-[15px] leading-relaxed text-muted`}>{p}</p>
              ))}

              {sec.bullets && (
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[15px] text-parchment/90">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-bright" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.items && (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {sec.items.map((it) => (
                    <div key={it.title} className="rounded-card border border-gold-deep/15 bg-charcoal p-6">
                      <div className="font-display font-600 text-gold">{it.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{it.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {sec.cards && (
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {sec.cards.map((c) => <ValueCard key={c.title} c={c} />)}
                </div>
              )}

              {sec.cardRows && (
                <div className="mt-5 space-y-5">
                  {sec.cardRows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`grid grid-cols-1 gap-5 ${row.cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
                    >
                      {row.cards.map((c) => <ValueCard key={c.title} c={c} big={row.big} />)}
                    </div>
                  ))}
                </div>
              )}

              {sec.listCards && (
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {sec.listCards.map((card) => (
                    <div key={card.title} className="rounded-card border border-gold-deep/15 bg-charcoal p-7">
                      <div className="font-display text-lg font-700 text-gold">{card.title}</div>
                      <ul className="mt-4 space-y-2.5">
                        {card.items.map((it) => (
                          <li key={it} className="flex items-start gap-2.5 text-[15px] text-parchment/90">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {service.closing && (
            <p className="border-t border-gold-deep/15 pt-10 font-display text-xl font-500 leading-relaxed text-parchment">
              {service.closing}
            </p>
          )}

          {service.galleryPosition !== "afterAbout" && <GalleryBlock service={service} />}
        </div>
      </section>

      {/* Videos (when provided for this sector) */}
      {service.videos?.length > 0 && (
        <section className="bg-ink pb-16">
          <div className="shell">
            <div className={`grid grid-cols-1 gap-5 ${service.videos.length > 1 ? "md:grid-cols-2" : ""}`}>
              {service.videos.map((src) => (
                <div key={src} className="overflow-hidden rounded-card border border-gold-deep/15 bg-charcoal">
                  <video
                    className="h-full w-full object-cover"
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Extended content below videos (e.g. Oil & Gas) */}
      {service.afterVideos?.length > 0 && (
        <section className="bg-ink pb-16">
          <div className="shell space-y-12">
            {service.afterVideos.map((sec) => (
              <div key={sec.title} className="border-t border-gold-deep/15 pt-12">
                <h2 className="font-display text-2xl font-700 text-parchment">{sec.title}</h2>
                {sec.body?.map((p, i) => (
                  <p key={i} className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{p}</p>
                ))}
                {sec.bulletsLabel && (
                  <p className="mt-4 font-display font-600 text-parchment">{sec.bulletsLabel}</p>
                )}
                {sec.bullets && (
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] text-parchment/90">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-bright" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.note?.map((p, i) => (
                  <p key={i} className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">{p}</p>
                ))}

                {sec.cards && (
                  <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sec.cards.map((c) => <ValueCard key={c.title} c={c} />)}
                  </div>
                )}

                {sec.cardRows && (
                  <div className="mt-7 space-y-5">
                    {sec.cardRows.map((row, ri) => (
                      <div
                        key={ri}
                        className={`grid grid-cols-1 gap-5 ${row.cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
                      >
                        {row.cards.map((c) => <ValueCard key={c.title} c={c} big={row.big} />)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Impact (e.g. Agro Farming) */}
      {service.impact && (
        <section className="bg-ink-900 py-16">
          <div className="shell">
            <div className="text-center">
              <h2 className="font-display text-3xl font-700 text-parchment">{service.impact.heading}</h2>
              {service.impact.subheading && (
                <p className="mx-auto mt-3 max-w-xl text-[15px] text-muted">{service.impact.subheading}</p>
              )}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.impact.stats.map((s) => (
                <div key={s.label} className="rounded-card border border-gold-deep/20 bg-charcoal p-7 text-center">
                  <div className="font-display text-3xl font-700 text-gold-bright sm:text-[2rem]">{s.value}</div>
                  <div className="mt-2 text-sm uppercase tracking-wider text-muted">{s.label}</div>
                </div>
              ))}
            </div>

            {service.impact.extra && (
              <div className="mx-auto mt-14 max-w-3xl border-t border-gold-deep/15 pt-10 text-center">
                <h3 className="font-display text-2xl font-700 text-parchment">{service.impact.extra.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{service.impact.extra.body}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink-900 py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[28px] border border-gold-deep/25 bg-gradient-to-br from-charcoal-50 via-charcoal to-ink-900 px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
            <div className="relative">
              <h2 className="mx-auto max-w-xl font-display text-3xl font-700 text-parchment">
                Ready to invest in <span className="text-gold-grad">{service.name}</span>?
              </h2>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {service.externalUrl ? (
                  <Button href={service.externalUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" icon={<ArrowRight size={16} />}>Start Investing</Button>
                ) : (
                  <Button to="/register" variant="primary" size="lg" icon={<ArrowRight size={16} />}>Start Investing</Button>
                )}
                <Button to="/contact" variant="outline" size="lg">Talk to our team</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
