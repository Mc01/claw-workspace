import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChamaFi — Decentralized Savings Circles on Celo",
  description: "ChamaFi brings the power of community savings circles (Chamas) on-chain. Trustless, transparent, and built for Africa on Celo.",
  keywords: ["ChamaFi", "Chama", "Celo", "DeFi", "savings", "Africa", "MiniPay"],
  openGraph: {
    title: "ChamaFi — Decentralized Savings Circles",
    description: "Community savings circles on the Celo blockchain. Transparent, trustless, accessible.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChamaFi",
    description: "Decentralized savings circles on Celo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
