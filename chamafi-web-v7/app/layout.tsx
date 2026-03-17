import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChamaFi — Group Finance on Celo",
  description: "Trustless chama savings. No bank. No middleman. Just code.",
  openGraph: {
    title: "ChamaFi",
    description: "Trustless chama savings. No bank. No middleman. Just code.",
    type: "website",
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
