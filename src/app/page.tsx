"use client";

import { TradingPage } from "@orderly.network/trading";

export default function Home() {
  return (
    <div className="hoodbtcTradingShell">
      <div className="hoodbtcBrandBar">
        <div className="hoodbtcBrand"><span>H</span><b>HOODBTC</b></div>
        <div className="hoodbtcLive">● MAINNET</div>
      </div>
      <TradingPage symbol="PERP_ETH_USDC" />
    </div>
  );
}
