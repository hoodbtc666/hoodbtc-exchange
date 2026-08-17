"use client";

import { useOrderbookStream } from "@orderly.network/hooks";

const SYMBOL = "PERP_ETH_USDC";

function formatPrice(value?: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "—";
}

function formatQty(value?: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? value.toLocaleString(undefined, { maximumFractionDigits: 4 })
    : "—";
}

export default function LiveOrderBook() {
  const [data, meta] = useOrderbookStream(SYMBOL, undefined, { level: 7, padding: false });
  const asks = data?.asks ?? [];
  const bids = data?.bids ?? [];
  const loading = Boolean(meta?.isLoading);

  const renderRows = (rows: number[][], side: "ask" | "bid") =>
    rows.map((row, index) => {
      const [price, qty, total] = row;
      return (
        <div className="bookRow" key={`${side}-${price}-${index}`}>
          <span className={side === "ask" ? "negative" : "positive"}>{formatPrice(price)}</span>
          <span>{formatQty(qty)}</span>
          <span>{formatQty(total)}</span>
        </div>
      );
    });

  return (
    <section className="panel bookPanel">
      <div className="panelHead">
        <b>Order book</b>
        <span className="muted">{loading ? "Connecting…" : "● LIVE"}</span>
      </div>
      <div className="bookHeader"><span>Price (USDC)</span><span>Size (ETH)</span><span>Total</span></div>
      {asks.length ? renderRows(asks, "ask") : <div className="bookEmpty">Waiting for live asks…</div>}
      <div className="mid"><b>{formatPrice(data?.markPrice)}</b><span>Orderly mark price</span></div>
      {bids.length ? renderRows(bids, "bid") : <div className="bookEmpty">Waiting for live bids…</div>}
    </section>
  );
}
