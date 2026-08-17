"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";

export default function OrderlyProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const brokerId = process.env.NEXT_PUBLIC_ORDERLY_BROKER_ID || "orderly";

  return (
    <WalletConnectorProvider>
      <OrderlyAppProvider
        brokerId={brokerId}
        brokerName="HOODBTC"
        networkId="mainnet"
        onRouteChange={({ href }: { href: string }) => router.push(href)}
      >
        {children}
      </OrderlyAppProvider>
    </WalletConnectorProvider>
  );
}
