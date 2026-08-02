import { useMemo, useState } from "react";
import { formatUSD, formatDate } from "@/utils/formatters";

// Lightweight, dependency-free area + line chart tuned to the gold theme.
export default function InvestmentGrowthChart({ data = [], height = 240 }) {
  const [hover, setHover] = useState(null);

  const W = 720;
  const H = height;
  const pad = { t: 16, r: 16, b: 28, l: 48 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const { points, area, min, max, ticks } = useMemo(() => {
    if (!data.length) return { points: "", area: "", min: 0, max: 0, ticks: [] };
    const vals = data.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const span = max - min || 1;
    const x = (i) => pad.l + (i / (data.length - 1)) * iw;
    const y = (v) => pad.t + ih - ((v - min) / span) * ih;

    const pts = data.map((d, i) => [x(i), y(d.value)]);
    const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    const area =
      `M${pts[0][0].toFixed(1)},${(pad.t + ih).toFixed(1)} ` +
      pts.map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") +
      ` L${pts[pts.length - 1][0].toFixed(1)},${(pad.t + ih).toFixed(1)} Z`;

    const ticks = [0, 0.5, 1].map((t) => ({
      v: min + t * span,
      y: pad.t + ih - t * ih,
    }));
    return { points: line, area, min, max, ticks };
  }, [data]); // eslint-disable-line

  if (!data.length) {
    return <div className="grid h-40 place-items-center text-sm text-muted">No earnings yet.</div>;
  }

  const x = (i) => pad.l + (i / (data.length - 1)) * iw;
  const span = (max - min) || 1;
  const y = (v) => pad.t + ih - ((v - min) / span) * ih;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Daily cumulative earnings"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="igc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6C25A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E6C25A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="igc-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A89060" />
            <stop offset="100%" stopColor="#E6C25A" />
          </linearGradient>
        </defs>

        {/* gridlines + y labels */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={t.y}
              y2={t.y}
              stroke="rgba(168,144,96,0.15)"
              strokeDasharray="3 4"
            />
            <text x={pad.l - 8} y={t.y + 4} textAnchor="end" className="fill-muted" fontSize="11">
              {formatUSD(t.v)}
            </text>
          </g>
        ))}

        <path d={area} fill="url(#igc-fill)" />
        <path d={points} fill="none" stroke="url(#igc-line)" strokeWidth="2.5" strokeLinecap="round" />

        {/* hover capture */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={x(i) - iw / data.length / 2}
            y={pad.t}
            width={iw / data.length}
            height={ih}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}

        {hover != null && (
          <g>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={pad.t}
              y2={pad.t + ih}
              stroke="rgba(230,194,90,0.5)"
            />
            <circle cx={x(hover)} cy={y(data[hover].value)} r="4.5" fill="#E6C25A" stroke="#0A0807" strokeWidth="2" />
          </g>
        )}
      </svg>

      <div className="mt-1 h-5 text-center text-xs text-muted">
        {hover != null ? (
          <span>
            <span className="text-parchment">{formatUSD(data[hover].value)}</span> ·{" "}
            {formatDate(data[hover].date)}
          </span>
        ) : (
          <span>Cumulative earnings · last {data.length} days</span>
        )}
      </div>
    </div>
  );
}
