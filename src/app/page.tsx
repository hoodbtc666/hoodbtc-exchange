"use client";

import { useCallback, useState } from "react";
import { TradingPage } from "@orderly.network/trading";
import type { API } from "@orderly.network/types";

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
      />
    </div>
  );
}
