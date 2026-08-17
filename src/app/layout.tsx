import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOODBTC | Decentralized Trading",
  description: "Professional non-custodial perpetual trading interface.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
