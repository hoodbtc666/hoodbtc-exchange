"use client";

import { useMemo, useState } from "react";
import { useWalletConnector } from "@orderly.network/hooks";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function WalletButton() {
  const connector = useWalletConnector();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const address = useMemo(() => {
    const accounts = connector.wallet?.accounts;
    return Array.isArray(accounts) ? accounts[0]?.address : undefined;
  }, [connector.wallet]);

  const tryOrderlyConnect = async () => {
    setError("");
    try {
      await connector.connect();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wallet connection failed. Try opening HOODBTC inside your wallet browser.");
    }
  };

  const openPhantom = () => {
    const target = window.location.href;
    const ref = window.location.origin;
    window.location.href = `https://phantom.app/ul/browse/${encodeURIComponent(target)}?ref=${encodeURIComponent(ref)}`;
  };

  const handleMainClick = async () => {
    if (address) {
      await connector.disconnect({});
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button className="wallet" onClick={handleMainClick} disabled={connector.connecting}>
        {connector.connecting ? "Connecting…" : address ? shortAddress(address) : "Connect wallet"}
      </button>

      {open && !address && (
        <div className="walletOverlay" role="dialog" aria-modal="true" aria-label="Connect wallet">
          <button className="walletBackdrop" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="walletModal">
            <div className="walletModalHead">
              <div>
                <b>Connect wallet</b>
                <span>Choose how you want to connect to HOODBTC.</span>
              </div>
              <button className="walletClose" onClick={() => setOpen(false)}>×</button>
            </div>

            <button className="walletOption primary" onClick={tryOrderlyConnect} disabled={connector.connecting}>
              <span className="walletIcon">◎</span>
              <span><b>{connector.connecting ? "Opening wallets…" : "Wallet selector"}</b><small>Phantom, MetaMask and supported wallets</small></span>
              <em>›</em>
            </button>

            <button className="walletOption" onClick={openPhantom}>
              <span className="walletIcon phantom">P</span>
              <span><b>Open in Phantom</b><small>Best option when using Safari on iPhone</small></span>
              <em>›</em>
            </button>

            {error && <p className="walletError">{error}</p>}
            <p className="walletNote">HOODBTC never asks for your seed phrase or private key.</p>
          </div>
        </div>
      )}
    </>
  );
}
