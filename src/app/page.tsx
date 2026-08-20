"use client";

import { useCallback, useState } from "react";
import { TradingPage, type TradingPageProps } from "@orderly.network/trading";
import type { API } from "@orderly.network/types";

const TRADING_VIEW_CONFIG = {} as TradingPageProps["tradingViewConfig"];

export default function Home() {
  const [symbol, setSymbol] = useState("PERP_ETH_USDC");

  const onSymbolChange = useCallback((data: API.Symbol) => {
    setSymbol(data.symbol);
  }, []);

  return (
    <div className="hoodbtcTradingShell">
      <header className="hoodbtcBrandBar">
        <div className="hoodbtcBrand">
          <img className="hoodbtcBrandLogo" src="https://hoodbtc.com/hoodbtc-logo.png" alt="HOODBTC" />
          <div className="hoodbtcBrandText">
            <b>HOOD<span>BTC</span></b>
            <small>DECENTRALIZED TRADING</small>
          </div>
        </div>
        <div className="hoodbtcHeaderRight">
          <div className="hoodbtcLive"><i /> MAINNET</div>
          <a className="hoodbtcHomeLink" href="https://hoodbtc.com" target="_blank" rel="noreferrer">HOODBTC.COM ↗</a>
        </div>
      </header>

      <div className="hoodbtcTradeFrame">
        <TradingPage
          symbol={symbol}
          onSymbolChange={onSymbolChange}
          tradingViewConfig={TRADING_VIEW_CONFIG}
        />
      </div>
    </div>
  );
}
