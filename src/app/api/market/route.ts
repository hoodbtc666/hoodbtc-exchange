import { NextResponse } from "next/server";

const ORDERLY_API = "https://api.orderly.org";
const SYMBOL = "PERP_ETH_USDC";

export const dynamic = "force-dynamic";

type OrderlyMarketRow = {
  symbol: string;
  index_price?: number;
  mark_price?: number;
  est_funding_rate?: number;
  last_funding_rate?: number;
  next_funding_time?: number;
  open_interest?: number;
  "24h_open"?: number;
  "24h_close"?: number;
  "24h_high"?: number;
  "24h_low"?: number;
  "24h_amount"?: number;
  "24h_volume"?: number;
};

export async function GET() {
  try {
    const [marketResponse, tradesResponse] = await Promise.all([
      fetch(`${ORDERLY_API}/v1/public/futures_market?symbol=${SYMBOL}`, { cache: "no-store" }),
      fetch(`${ORDERLY_API}/v1/public/market_trades?symbol=${SYMBOL}&limit=500`, { cache: "no-store" }),
    ]);

    if (!marketResponse.ok || !tradesResponse.ok) {
      return NextResponse.json({ success: false, message: "Orderly market data request failed" }, { status: 502 });
    }

    const marketJson = await marketResponse.json();
    const tradesJson = await tradesResponse.json();
    const raw = marketJson?.data?.rows?.find((row: OrderlyMarketRow) => row.symbol === SYMBOL) as OrderlyMarketRow | undefined;

    if (!raw) {
      return NextResponse.json({ success: false, message: "ETH perpetual market was not returned by Orderly" }, { status: 502 });
    }

    const market = {
      symbol: raw.symbol,
      indexPrice: raw.index_price,
      markPrice: raw.mark_price,
      open24h: raw["24h_open"],
      close24h: raw["24h_close"],
      high24h: raw["24h_high"],
      low24h: raw["24h_low"],
      amount24h: raw["24h_amount"],
      volume24h: raw["24h_volume"],
      fundingRate: raw.est_funding_rate ?? raw.last_funding_rate,
      nextFundingTime: raw.next_funding_time,
      openInterest: raw.open_interest,
    };

    return NextResponse.json({
      success: true,
      source: "Orderly Network",
      symbol: SYMBOL,
      market,
      trades: tradesJson?.data?.rows ?? [],
      timestamp: Date.now(),
    }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to reach Orderly market data" }, { status: 502 });
  }
}
