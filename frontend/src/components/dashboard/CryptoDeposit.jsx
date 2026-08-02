import { QRCodeSVG } from "qrcode.react";
import CopyField from "./CopyField";
import { formatUSD } from "@/utils/formatters";

export default function CryptoDeposit({ deposit }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gold-deep/20 bg-charcoal-50 p-5">
        <div className="rounded-xl bg-white p-3">
          <QRCodeSVG value={deposit.address} size={148} bgColor="#ffffff" fgColor="#0A0807" level="M" />
        </div>
        <div className="text-center">
          <div className="text-xs uppercase tracking-wider text-muted">Send</div>
          <div className="font-display text-xl font-700 text-gold-bright">
            {formatUSD(deposit.amount)} <span className="text-sm text-muted">in {deposit.coin}</span>
          </div>
          <div className="text-xs text-muted">Network: {deposit.network}</div>
        </div>
      </div>
      <CopyField label={`${deposit.coin} deposit address`} value={deposit.address} />
      <CopyField label="Reference" value={deposit.reference} />
      <p className="text-sm text-muted">
        Send only {deposit.coin} on {deposit.network} to this address. Funds are credited after
        on-chain confirmation.
      </p>
    </div>
  );
}
