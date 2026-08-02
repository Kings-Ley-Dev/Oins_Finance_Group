import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, hint, className = "", id, icon = null, ...rest },
  ref
) {
  const inputId = id || rest.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-parchment/90">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border bg-charcoal-50 px-4 py-3 text-sm text-parchment placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 ${
            icon ? "pl-11" : ""
          } ${
            error
              ? "border-rose-500/60 focus:border-rose-500"
              : "border-gold-deep/20 focus:border-gold/60"
          }`}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-rose-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
