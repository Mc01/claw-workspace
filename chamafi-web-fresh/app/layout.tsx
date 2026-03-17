import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChamaFi — Savings Circles On-Chain",
  description:
    "ChamaFi brings traditional rotating savings groups (Chamas) to the blockchain — transparent, trustless, and accessible to everyone. Built on Celo.",
  keywords: ["chama", "savings", "blockchain", "celo", "DeFi", "ROSCA", "community"],
  openGraph: {
    title: "ChamaFi — Savings Circles On-Chain",
    description: "Pool funds with friends and family. Earn yield. Build wealth together. No banks required.",
    type: "website",
    url: "https://chamafi.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChamaFi — Savings Circles On-Chain",
    description: "Pool funds with friends and family. Earn yield. Build wealth together. No banks required.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-white antialiased">{children}</body>
    </html>
  );
}
