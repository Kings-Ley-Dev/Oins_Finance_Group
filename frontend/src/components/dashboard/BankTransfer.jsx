import { Clock } from "lucide-react";
import CopyField from "./CopyField";
import { formatUSD } from "@/utils/formatters";

export default function BankTransfer({ deposit }) {
  const va = deposit.virtualAccount || {};
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gold-deep/20 bg-gradient-to-br from-charcoal-50 to-charcoal p-5 text-center">
        <div className="text-xs uppercase tracking-wider text-muted">Amount to transfer</div>
        <div className="mt-1 font-display text-3xl font-700 text-gold-bright">{formatUSD(deposit.amount)}</div>
      </div>
      <CopyField label="Bank" value={va.bankName} mono={false} />
      <CopyField label="Account name" value={va.accountName} mono={false} />
      <CopyField label="Account number" value={va.accountNumber} />
      <CopyField label="Reference (include in transfer)" value={deposit.reference} />
      {va.expiresAt && (
        <p className="flex items-center gap-2 text-xs text-muted">
          <Clock size={13} /> Expires {new Date(va.expiresAt).toLocaleString()}
        </p>
      )}
      <p className="text-sm text-muted">
        Transfer the exact amount to the account above. Your balance updates automatically once the
        bank confirms the payment.
      </p>
    </div>
  );
}
