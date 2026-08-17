import { NextResponse } from "next/server";

const ORDERLY_API = "https://api.orderly.org";
const SYMBOL = "PERP_ETH_USDC";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [marketResponse, tradesResponse] = await Promise.all([
      fetch(`${ORDERLY_API}/v1/public/futures_market?symbol=${SYMBOL}`, {
        cache: "no-store",
      }),
      fetch(`${ORDERLY_API}/v1/public/market_trades?symbol=${SYMBOL}&limit=10`, {
        cache: "no-store",
      }),
    ]);

    if (!marketResponse.ok || !tradesResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Orderly market data request failed" },
        { status: 502 },
      );
    }

    const marketJson = await marketResponse.json();
    const tradesJson = await tradesResponse.json();
    const market = marketJson?.data?.rows?.find(
      (row: { symbol?: string }) => row.symbol === SYMBOL,
    );

    if (!market) {
      return NextResponse.json(
        { success: false, message: "ETH perpetual market was not returned by Orderly" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        source: "Orderly Network",
        symbol: SYMBOL,
        market,
        trades: tradesJson?.data?.rows ?? [],
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to reach Orderly market data" },
      { status: 502 },
    );
  }
}
