import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChamaFi — Chamas That Grow On-Chain",
  description: "Save together with your Chama using cUSD on Celo. Transparent, automatic, and trustless — right in MiniPay.",
  openGraph: {
    title: "ChamaFi — Chamas That Grow",
    description: "Digitize Africa's most powerful financial tradition with DeFi yield.",
    url: "https://chamafi.vercel.app",
    siteName: "ChamaFi",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChamaFi — Chamas That Grow",
    description: "Save together. Grow together. Powered by Celo.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
