"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";

const HOODBTC_LOGO = "https://raw.githubusercontent.com/hoodbtc666/hoodbtc-exchange/main/hoodbtc-logo.webp";

export default function OrderlyProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <WalletConnectorProvider>
      <OrderlyAppProvider
        brokerId="hoodbtc"
        brokerName="HOODBTC"
        networkId="mainnet"
        appIcons={{
          main: { component: <img className="hoodbtcSdkMark" src={HOODBTC_LOGO} alt="HOODBTC" /> },
          secondary: { component: <img className="hoodbtcSdkMark" src={HOODBTC_LOGO} alt="HOODBTC" /> },
        }}
        onRouteChange={({ href }: { href: string }) => router.push(href)}
      >
        {children}
      </OrderlyAppProvider>
    </WalletConnectorProvider>
  );
}
