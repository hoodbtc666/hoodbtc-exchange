import type { Metadata } from "next";
import OrderlyProvider from "@/components/OrderlyProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOODBTC | Decentralized Trading",
  description: "Professional non-custodial perpetual trading interface.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><OrderlyProvider>{children}</OrderlyProvider></body>
    </html>
  );
}
