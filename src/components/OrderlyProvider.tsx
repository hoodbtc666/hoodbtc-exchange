"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";

export default function OrderlyProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <WalletConnectorProvider>
      <OrderlyAppProvider
        brokerId="hoodbtc"
        brokerName="HOODBTC"
        networkId="mainnet"
        appIcons={{
          main: { component: <span className="hoodbtcSdkLogo">HOODBTC</span> },
          secondary: { component: <span className="hoodbtcSdkLogo">H</span> },
        }}
        onRouteChange={({ href }: { href: string }) => router.push(href)}
      >
        {children}
      </OrderlyAppProvider>
    </WalletConnectorProvider>
  );
}
