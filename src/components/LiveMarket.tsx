"use client";

import { useEffect, useMemo, useState } from "react";

type Market = {
  symbol?: string;
  index_price?: number;
  mark_price?: number;
  open?: number;
  close?: number;
  high?: number;
  low?: number;
  volume?: number;
  amount?: number;
  change?: number;
  funding_rate?: number;
};

type MarketResponse = {
  success: boolean;
  source?: string;
  market?: Market;
  timestamp?: number;
};

const money = (value?: number) =>
  typeof value === "number"
    ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
    : "—";

const compact = (value?: number) =>
  typeof value === "number"
    ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value)
    : "—";

export default function LiveMarket() {
  const [data, setData] = useState<MarketResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/market", { cache: "no-store" });
        const json: MarketResponse = await response.json();
        if (!response.ok || !json.success) throw new Error("market data unavailable");
        if (active) {
          setData(json);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      }
    };

    load();
    const timer = window.setInterval(load, 3000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const market = data?.market;
  const change = useMemo(() => {
    if (typeof market?.change === "number") return market.change * 100;
    if (typeof market?.open === "number" && typeof market?.close === "number" && market.open !== 0) {
      return ((market.close - market.open) / market.open) * 100;
    }
    return undefined;
  }, [market]);

  return (
    <section className="marketBar">
      <div className="pair">
        <div className="coin">Ξ</div>
        <div><b>ETH-PERP</b><span>Ethereum Perpetual</span></div>
        <span className="chevron">⌄</span>
      </div>
      <div><label>Mark</label><strong>{money(market?.mark_price ?? market?.close)}</strong></div>
      <div><label>24h change</label><strong className={change !== undefined && change < 0 ? "negative" : "positive"}>{change === undefined ? "—" : `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`}</strong></div>
      <div><label>24h high</label><strong>{money(market?.high)}</strong></div>
      <div><label>24h low</label><strong>{money(market?.low)}</strong></div>
      <div><label>24h volume</label><strong>{market?.amount ? `$${compact(market.amount)}` : compact(market?.volume)}</strong></div>
      <div><label>Funding / 8h</label><strong>{typeof market?.funding_rate === "number" ? `${(market.funding_rate * 100).toFixed(4)}%` : "—"}</strong></div>
      <div className="liveSource"><label>Data</label><strong className={error ? "negative" : "positive"}>{error ? "Reconnecting" : data?.success ? "● LIVE" : "Loading…"}</strong></div>
    </section>
  );
}
