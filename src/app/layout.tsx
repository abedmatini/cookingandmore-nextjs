import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cookingandmore.de"),
  title: { default: "Cooking And More | Catering Köln", template: "%s | Cooking And More" },
  description: "Maßgeschneidertes Catering, außergewöhnliche Events und besondere Locations in Köln.",
  openGraph: { siteName: "Cooking And More", locale: "de_DE", type: "website" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${sans.variable} ${display.variable}`}>
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
