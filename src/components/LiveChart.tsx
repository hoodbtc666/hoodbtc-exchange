"use client";

import { useEffect, useMemo, useState } from "react";

type Trade = { price?: number; executed_price?: number; timestamp?: number; executed_timestamp?: number };
type Payload = { success?: boolean; trades?: Trade[] };

export default function LiveChart() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/market", { cache: "no-store" });
        const json = (await response.json()) as Payload;
        if (active && json.success && Array.isArray(json.trades)) setTrades(json.trades);
      } catch {}
    };
    load();
    const timer = window.setInterval(load, 5000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const points = useMemo(() => {
    const rows = trades
      .map((t, i) => ({ price: Number(t.executed_price ?? t.price), time: Number(t.executed_timestamp ?? t.timestamp ?? i) }))
      .filter((t) => Number.isFinite(t.price) && t.price > 0)
      .sort((a, b) => a.time - b.time)
      .slice(-120);
    if (rows.length < 2) return "";
    const prices = rows.map((r) => r.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const span = Math.max(max - min, max * 0.0005);
    return rows.map((r, i) => {
      const x = (i / (rows.length - 1)) * 900;
      const y = 350 - ((r.price - min) / span) * 300;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }, [trades]);

  return (
    <section className="panel chartPanel">
      <div className="panelHead"><div><button className="tab active">Chart</button><button className="tab">Info</button></div><div className="tools"><b>LIVE</b></div></div>
      <div className="chartMeta"><span>ETH-PERP</span><span className="positive">Real Orderly trades · refresh 5s</span></div>
      <div className="chart">
        {points ? <svg viewBox="0 0 900 390" preserveAspectRatio="none" aria-label="live ETH perpetual trade chart"><polyline className="line" points={points}/></svg> : <div className="bookEmpty">Loading live Orderly trades…</div>}
      </div>
    </section>
  );
}
