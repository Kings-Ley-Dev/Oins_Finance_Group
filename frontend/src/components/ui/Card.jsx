export default function Card({ className = "", children, as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`rounded-card border border-gold-deep/15 bg-charcoal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ title, subtitle, action, className = "" }) {
  return (
    <div className={`flex items-start justify-between gap-4 p-6 pb-0 ${className}`}>
      <div>
        <h3 className="font-display text-base font-600 text-parchment">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
