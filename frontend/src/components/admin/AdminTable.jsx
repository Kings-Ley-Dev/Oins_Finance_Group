export default function AdminTable({ columns, rows, empty = "Nothing here yet.", keyField = "id" }) {
  if (!rows?.length) return <p className="rounded-card border border-gold-deep/15 bg-charcoal py-12 text-center text-sm text-muted">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-card border border-gold-deep/15 bg-charcoal">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-gold-deep/15 text-left text-xs uppercase tracking-wider text-muted">
            {columns.map((c) => <th key={c.key} className="px-5 py-3 font-medium">{c.header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gold-deep/10">
          {rows.map((row, i) => (
            <tr key={row[keyField] || row._id || i} className="text-parchment/90 hover:bg-charcoal-50">
              {columns.map((c) => <td key={c.key} className="px-5 py-3">{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
