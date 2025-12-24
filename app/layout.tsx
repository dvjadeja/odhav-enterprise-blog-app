import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/provider/TransitionProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Odhav Enterprise - Renewable Energy Construction & Infrastructure Solutions",
    template: "%s | Odhav Enterprise",
  },
  description:
    "Leading provider of renewable energy construction and infrastructure solutions across India. Specializing in WTG foundations, solar installations, transmission lines, and wind farm development.",
  keywords: [
    "renewable energy",
    "wind turbine",
    "solar power",
    "construction",
    "infrastructure",
    "WTG foundation",
    "transmission lines",
    "Odhav Enterprise",
    "India",
    "green energy",
    "sustainable construction",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${dmSans.variable} antialiased`}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
