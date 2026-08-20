"use client";

import { useCallback, useMemo, useState } from "react";
import { TradingPage, type TradingPageProps } from "@orderly.network/trading";
import { useWalletConnector } from "@orderly.network/hooks";
import type { API } from "@orderly.network/types";

const TRADING_VIEW_CONFIG = {} as TradingPageProps["tradingViewConfig"];
const HOODBTC_LOGO = "https://raw.githubusercontent.com/hoodbtc666/hoodbtc-exchange/main/hoodbtc-logo.webp";

const ORDERLY_SUPPORTED_CHAINS = [
  "Arbitrum",
  "Optimism",
  "Polygon",
  "Base",
  "Mantle",
  "Ethereum",
  "Sei",
  "Avalanche",
  "Solana",
  "Sonic",
  "Berachain",
  "Mode",
  "Abstract",
  "BNB",
  "ADI Chain",
];

export default function Home() {
  const [symbol, setSymbol] = useState("PERP_BTC_USDC");
  const [networkOpen, setNetworkOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onSymbolChange = useCallback((data: API.Symbol) => setSymbol(data.symbol), []);

  const { connect, connecting, chains = [], connectedChain, switchChain, settingChain } = useWalletConnector();

  const chainLabel = useMemo(() => {
    const current = chains.find((chain: any) => String(chain?.id) === String(connectedChain?.id));
    return current?.name || current?.label || current?.shortName || (connectedChain?.id ? `Chain ${connectedChain.id}` : "Networks");
  }, [chains, connectedChain]);

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Wallet connect failed", error);
    }
  }, [connect]);

  const handleChainSwitch = useCallback(async (chainId: string) => {
    try {
      await switchChain({ chainId });
      setNetworkOpen(false);
    } catch (error) {
      console.error("Chain switch failed", error);
    }
  }, [switchChain]);

  return (
    <main className="hoodbtcTradingShell">
      <header className="proTopbar">
        <a className="proBrand" href="https://hoodbtc.com" aria-label="HOODBTC home">
          <img src={HOODBTC_LOGO} alt="HOODBTC" />
          <strong>HOODBTC</strong>
        </a>

        <nav className="proNav" aria-label="Trading navigation">
          <span className="active">Futures</span>
        </nav>

        <div className="proRight">
          <div className="networkControl">
            <button className="networkButton" type="button" onClick={() => setNetworkOpen((v) => !v)}>
              <span className="networkIcon">◎</span>
              <span>{settingChain ? "Switching…" : chainLabel}</span>
              <span className="chevron">⌄</span>
            </button>
            {networkOpen && (
              <div className="networkMenu">
                <div className="menuTitle">Supported Networks</div>
                {chains.length > 0 ? chains.map((chain: any) => {
                  const id = String(chain?.id ?? "");
                  const label = chain?.name || chain?.label || chain?.shortName || id;
                  const active = id === String(connectedChain?.id ?? "");
                  return (
                    <button key={id || label} type="button" className={active ? "chainItem active" : "chainItem"} onClick={() => id && handleChainSwitch(id)}>
                      <span>{label}</span><span>{active ? "●" : ""}</span>
                    </button>
                  );
                }) : ORDERLY_SUPPORTED_CHAINS.map((name) => (
                  <div className="chainItem static" key={name}><span>{name}</span></div>
                ))}
                <div className="menuFoot">Unified Orderly liquidity</div>
              </div>
            )}
          </div>

          <button className="connectButton" type="button" onClick={handleConnect} disabled={connecting}>
            {connecting ? "Connecting…" : connectedChain ? "Wallet" : "Connect"}
          </button>

          <button className="terminalMode" type="button" title="Professional trading mode">Pro ⇄</button>

          <div className="moreControl">
            <button className="menuButton" type="button" aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>☰</button>
            {menuOpen && (
              <div className="terminalMenu">
                <a href="https://hoodbtc.com" target="_blank" rel="noreferrer">HOODBTC Home ↗</a>
                <span>Perpetual Futures</span>
                <span>Shared Liquidity</span>
                <span>Non-Custodial</span>
                <span>Orderly Mainnet</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="hoodbtcTradeFrame">
        <TradingPage symbol={symbol} onSymbolChange={onSymbolChange} tradingViewConfig={TRADING_VIEW_CONFIG} />
      </section>
    </main>
  );
}
