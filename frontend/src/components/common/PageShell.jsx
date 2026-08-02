import Badge from "@/components/ui/Badge";

export default function PageShell({ eyebrow, title, subtitle, children }) {
  return (
    <div className="relative bg-ink-radial pt-[120px]">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="shell relative pb-16">
        {eyebrow && (
          <Badge tone="gold" className="mb-5">
            <span className="eyebrow-dot" />
            {eyebrow}
          </Badge>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-700 leading-tight text-parchment sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p>
        )}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </div>
  );
}
