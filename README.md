# HOODBTC Exchange

Custom HOODBTC perpetual trading frontend.

## Architecture
- Next.js + TypeScript frontend
- HOODBTC-owned interface and visual system
- Orderly Network SDK integration target for shared liquidity, market data, orders, positions and wallet trading flows
- Existing live HOODBTC website and current trading terminal remain untouched while this application is built and tested separately

## Current build stage
The repository now contains the first responsive HOODBTC trading-terminal shell: market header, chart workspace, order book, order-entry panel and position/order workspace.

The displayed market values in the initial shell are visual placeholders only. They must not be treated as live market data. The next integration stage replaces them with Orderly SDK data and wallet/account state.

## Safety rule
Do not point trade.hoodbtc.com at this repository until live SDK integration, order placement, position management, deposit/withdrawal and wallet flows have been tested end-to-end.
