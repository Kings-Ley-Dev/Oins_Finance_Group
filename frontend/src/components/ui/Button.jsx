import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-gold-gradient text-ink-900 font-semibold shadow-gold hover:brightness-105 hover:shadow-[0_14px_48px_-10px_rgba(230,194,90,0.55)]",
  secondary:
    "bg-charcoal/70 text-parchment border border-gold-deep/35 hover:border-gold/70 hover:bg-charcoal",
  outline:
    "bg-transparent text-gold border border-gold-deep/60 hover:bg-gold/10 hover:border-gold",
  ghost: "bg-transparent text-parchment/80 hover:text-gold",
  dark: "bg-cocoa text-cream hover:bg-cocoa/90",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

export default function Button({
  as = "button",
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  loading = false,
  icon = null,
  ...rest
}) {
  const cls =
    `group inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ` +
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ` +
    `disabled:opacity-60 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  const Tag = as;
  return (
    <Tag className={cls} disabled={loading} {...rest}>
      {content}
    </Tag>
  );
}
