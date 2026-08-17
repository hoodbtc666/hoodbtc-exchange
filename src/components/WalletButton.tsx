"use client";

import { useMemo } from "react";
import { useWalletConnector } from "@orderly.network/hooks";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function WalletButton() {
  const connector = useWalletConnector();
  const address = useMemo(() => {
    const accounts = connector.wallet?.accounts;
    return Array.isArray(accounts) ? accounts[0]?.address : undefined;
  }, [connector.wallet]);

  const handleClick = async () => {
    if (address) {
      await connector.disconnect({});
      return;
    }
    await connector.connect();
  };

  return (
    <button className="wallet" onClick={handleClick} disabled={connector.connecting}>
      {connector.connecting ? "Connecting…" : address ? shortAddress(address) : "Connect wallet"}
    </button>
  );
}
