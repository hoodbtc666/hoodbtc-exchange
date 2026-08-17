"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";

export default function OrderlyProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <WalletConnectorProvider
      solanaInitial={{ network: WalletAdapterNetwork.Mainnet }}
    >
      <OrderlyAppProvider
        brokerId="hoodbtc"
        brokerName="HOODBTC"
        networkId="mainnet"
        onRouteChange={({ href }: { href: string }) => router.push(href)}
      >
        {children}
      </OrderlyAppProvider>
    </WalletConnectorProvider>
  );
}
