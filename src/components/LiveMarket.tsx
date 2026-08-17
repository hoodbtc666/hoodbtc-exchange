"use client";

import { useEffect, useMemo, useState } from "react";

type Market = {
  symbol?: string;
  indexPrice?: number;
  markPrice?: number;
  open24h?: number;
  close24h?: number;
  high24h?: number;
  low24h?: number;
  volume24h?: number;
  amount24h?: number;
  fundingRate?: number;
};

type MarketResponse = { success: boolean; source?: string; market?: Market; timestamp?: number };

const money = (value?: number) => typeof value === "number" ? `$${value.toLocaleString(undefined,{maximumFractionDigits:2,minimumFractionDigits:2})}` : "—";
const compact = (value?: number) => typeof value === "number" ? new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:2}).format(value) : "—";

export default function LiveMarket(){
  const [data,setData]=useState<MarketResponse|null>(null);
  const [error,setError]=useState(false);

  useEffect(()=>{
    let active=true;
    const load=async()=>{
      try{
        const response=await fetch("/api/market",{cache:"no-store"});
        const json:MarketResponse=await response.json();
        if(!response.ok||!json.success) throw new Error("market data unavailable");
        if(active){setData(json);setError(false)}
      }catch{if(active)setError(true)}
    };
    load();
    const timer=window.setInterval(load,3000);
    return()=>{active=false;window.clearInterval(timer)};
  },[]);

  const market=data?.market;
  const change=useMemo(()=>{
    if(typeof market?.open24h==="number"&&typeof market?.close24h==="number"&&market.open24h!==0){
      return ((market.close24h-market.open24h)/market.open24h)*100;
    }
    return undefined;
  },[market]);

  return <section className="marketBar">
    <div className="pair"><div className="coin">Ξ</div><div><b>ETH-PERP</b><span>Ethereum Perpetual</span></div><span className="chevron">⌄</span></div>
    <div><label>Mark</label><strong>{money(market?.markPrice??market?.close24h)}</strong></div>
    <div><label>24h change</label><strong className={change!==undefined&&change<0?"negative":"positive"}>{change===undefined?"—":`${change>=0?"+":""}${change.toFixed(2)}%`}</strong></div>
    <div><label>24h high</label><strong>{money(market?.high24h)}</strong></div>
    <div><label>24h low</label><strong>{money(market?.low24h)}</strong></div>
    <div><label>24h volume</label><strong>{market?.amount24h?`$${compact(market.amount24h)}`:compact(market?.volume24h)}</strong></div>
    <div><label>Funding</label><strong>{typeof market?.fundingRate==="number"?`${(market.fundingRate*100).toFixed(4)}%`:"—"}</strong></div>
    <div className="liveSource"><label>Orderly data</label><strong className={error?"negative":"positive"}>{error?"Reconnecting":data?.success?"● LIVE":"Loading…"}</strong></div>
  </section>;
}
