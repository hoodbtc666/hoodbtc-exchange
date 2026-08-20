"use client";

import { useCallback, useMemo, useState } from "react";
import { TradingPage, type TradingPageProps } from "@orderly.network/trading";
import { useChains, useWalletConnector } from "@orderly.network/hooks";
import type { API } from "@orderly.network/types";

const TRADING_VIEW_CONFIG = {} as TradingPageProps["tradingViewConfig"];
const HOODBTC_LOGO = "https://raw.githubusercontent.com/hoodbtc666/hoodbtc-exchange/main/hoodbtc-logo.webp";

const shortAddress = (address?: string) => {
  if (!address) return "Connect";
  if (address.length < 12) return address;
  return `${address.slice(0, 5)}…${address.slice(-4)}`;
};

export default function Home() {
  const [symbol, setSymbol] = useState("PERP_BTC_USDC");
  const [networkOpen, setNetworkOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dense, setDense] = useState(true);
  const onSymbolChange = useCallback((data: API.Symbol) => setSymbol(data.symbol), []);
  const { connect, connecting, chains = [], connectedChain, switchChain, settingChain, wallet } = useWalletConnector();
  const [orderlyChains = []] = useChains("mainnet");
  const walletAddress = wallet?.accounts?.[0]?.address as string | undefined;

  const chainLabel = useMemo(() => {
    const current = chains.find((chain: any) => String(chain?.id) === String(connectedChain?.id));
    return current?.name || current?.label || current?.shortName || (connectedChain?.id ? `Chain ${connectedChain.id}` : "Networks");
  }, [chains, connectedChain]);

  const handleConnect = useCallback(async () => { try { await connect(); } catch (error) { console.error("Wallet connect failed", error); } }, [connect]);
  const handleChainSwitch = useCallback(async (chainId: string) => { try { await switchChain({ chainId }); setNetworkOpen(false); } catch (error) { console.error("Chain switch failed", error); } }, [switchChain]);
  const sdkChains = useMemo(() => (Array.isArray(orderlyChains) ? orderlyChains : []).filter((chain: any) => chain?.network === "mainnet" || !chain?.network), [orderlyChains]);

  return (
    <main className={dense ? "hoodbtcTradingShell denseMode" : "hoodbtcTradingShell"}>
      <header className="proTopbar">
        <a className="proBrand" href="https://hoodbtc.com" aria-label="HOODBTC home"><img src={HOODBTC_LOGO} alt="HOODBTC" /><strong>HOODBTC</strong></a>
        <nav className="proNav" aria-label="Trading navigation"><span className="active">Perpetuals</span><span className="liquidityText">Shared Liquidity</span></nav>
        <div className="proRight">
          <div className="networkControl">
            <button className="networkButton" type="button" onClick={() => { setNetworkOpen((v) => !v); setMenuOpen(false); }} aria-expanded={networkOpen}><span className="networkIcon">◎</span><span>{settingChain ? "Switching…" : chainLabel}</span><span className="chevron">⌄</span></button>
            {networkOpen && <div className="networkMenu">
              <div className="menuTitle">Wallet Networks</div>
              {chains.length > 0 ? chains.map((chain: any) => { const id=String(chain?.id??""); const label=chain?.name||chain?.label||chain?.shortName||id; const active=id===String(connectedChain?.id??""); return <button key={id||label} type="button" className={active?"chainItem active":"chainItem"} onClick={() => id&&handleChainSwitch(id)}><span>{label}</span><span>{active?"●":""}</span></button>; }) : <div className="menuEmpty">Connect a wallet to switch network</div>}
              <div className="menuTitle supportedTitle">Orderly Mainnet Support</div>
              <div className="supportedGrid">{sdkChains.map((chain:any)=><div className="supportedChain" key={String(chain?.id??chain?.chainId??chain?.label)}>{chain?.icon?<img src={chain.icon} alt=""/>:<i/>}<span>{chain?.label||chain?.name||chain?.id}</span></div>)}</div>
              <div className="menuFoot">All markets share Orderly&apos;s unified liquidity layer.</div>
            </div>}
          </div>
          <button className="connectButton" type="button" onClick={handleConnect} disabled={connecting} title={walletAddress||"Connect wallet"}>{connecting?"Connecting…":shortAddress(walletAddress)}</button>
          <button className="terminalMode" type="button" onClick={()=>setDense((v)=>!v)} title="Toggle terminal density">{dense?"Pro":"Comfort"} ⇄</button>
          <div className="moreControl">
            <button className="menuButton" type="button" aria-label="Open HOODBTC navigation" aria-expanded={menuOpen} onClick={()=>{setMenuOpen((v)=>!v);setNetworkOpen(false);}}>☰</button>
            {menuOpen && <div className="terminalMenu mainNavMenu">
              <div className="menuBrand"><img src={HOODBTC_LOGO} alt=""/><div><b>HOODBTC</b><small>Professional Trading</small></div></div>
              <div className="navGroupLabel">TRADE</div>
              <a className="navMenuItem active" href="/"><span className="navIcon">▥</span><div><b>Trade</b><small>Perpetual futures terminal</small></div><em>›</em></a>
              <a className="navMenuItem" href="/portfolio"><span className="navIcon">◫</span><div><b>Portfolio</b><small>Overview, assets & PnL</small></div><em>›</em></a>
              <a className="navMenuItem" href="/portfolio/positions"><span className="navIcon">↕</span><div><b>Positions</b><small>Open positions & risk</small></div><em>›</em></a>
              <a className="navMenuItem" href="/portfolio/orders"><span className="navIcon">≡</span><div><b>Orders</b><small>Open & pending orders</small></div><em>›</em></a>
              <div className="navGroupLabel">ACCOUNT</div>
              <a className="navMenuItem" href="/portfolio/history"><span className="navIcon">↺</span><div><b>History</b><small>Trading & funding history</small></div><em>›</em></a>
              <a className="navMenuItem" href="/portfolio/setting"><span className="navIcon">⚙</span><div><b>Settings</b><small>Account preferences</small></div><em>›</em></a>
              <div className="navGroupLabel">HOODBTC</div>
              <a className="navMenuItem" href="https://hoodbtc.com" target="_blank" rel="noreferrer"><span className="navIcon">H</span><div><b>HOODBTC Home</b><small>Official website</small></div><em>↗</em></a>
              <div className="menuStatus"><span><i/> Mainnet</span><span>Self-custody</span><span>Shared liquidity</span></div>
            </div>}
          </div>
        </div>
      </header>
      <section className="hoodbtcTradeFrame"><TradingPage symbol={symbol} onSymbolChange={onSymbolChange} tradingViewConfig={TRADING_VIEW_CONFIG}/></section>
    </main>
  );
}
