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
      <div className="hoodbtcBrandBar">
        <div className="hoodbtcBrand"><span>H</span><b>HOODBTC</b></div>
        <div className="hoodbtcLive">● MAINNET</div>
      </div>
      <TradingPage
        symbol={symbol}
        onSymbolChange={onSymbolChange}
        tradingViewConfig={TRADING_VIEW_CONFIG}
      />
    </div>
  );
}
