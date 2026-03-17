import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChamaFi — Chama Savings on MiniPay",
  description: "Save together. Grow together. ChamaFi brings traditional African Chama savings groups on-chain — powered by Celo and MiniPay.",
  keywords: ["chama", "savings", "MiniPay", "Celo", "DeFi", "Africa", "rotating savings"],
  openGraph: {
    title: "ChamaFi — Chama Savings on MiniPay",
    description: "Save together. Grow together. ChamaFi brings traditional African Chama savings groups on-chain.",
    type: "website",
    siteName: "ChamaFi",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChamaFi — Chama Savings on MiniPay",
    description: "Save together. Grow together. Chama savings on Celo.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0f0d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
