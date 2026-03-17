import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChamaFi — For Africa, By Africa",
  description:
    "ChamaFi brings the power of African chama savings groups on-chain. Community savings, microloans, and DeFi yields — built for Africa on Celo.",
  openGraph: {
    title: "ChamaFi — For Africa, By Africa",
    description: "Community savings groups meet blockchain. Join thousands of Africans saving together.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
