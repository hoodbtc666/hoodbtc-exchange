"use client";

import { useCallback, useState } from "react";
import { TradingPage, type TradingPageProps } from "@orderly.network/trading";
import type { API } from "@orderly.network/types";

const TRADING_VIEW_CONFIG = {} as TradingPageProps["tradingViewConfig"];

export default function Home() {
  const [symbol, setSymbol] = useState("PERP_BTC_USDC");
  const onSymbolChange = useCallback((data: API.Symbol) => setSymbol(data.symbol), []);

  return (
    <main className="hoodbtcTradingShell">
      <header className="proTopbar">
        <a className="proBrand" href="https://hoodbtc.com" aria-label="HOODBTC home">
          <img src="https://hoodbtc.com/hoodbtc-logo.png" alt="HOODBTC" />
          <strong>HOODBTC</strong>
        </a>
        <nav className="proNav" aria-label="Trading navigation">
          <span className="active">Trade</span>
          <span>Markets</span>
          <span>Portfolio</span>
        </nav>
        <div className="proRight">
          <span className="networkDot"><i /> Mainnet</span>
          <a href="https://hoodbtc.com" target="_blank" rel="noreferrer">Home ↗</a>
        </div>
      </header>
      <section className="hoodbtcTradeFrame">
        <TradingPage symbol={symbol} onSymbolChange={onSymbolChange} tradingViewConfig={TRADING_VIEW_CONFIG} />
      </section>
    </main>
  );
}
