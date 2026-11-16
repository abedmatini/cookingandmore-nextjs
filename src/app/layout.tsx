import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Kristi, Lato } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const script = Kristi({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cookingandmore.de"),
  title: { default: "Cooking And More | Catering Köln", template: "%s | Cooking And More" },
  description: "Maßgeschneidertes Catering, außergewöhnliche Events und besondere Locations in Köln.",
  robots: { index: false, follow: false },
  openGraph: { siteName: "Cooking And More", locale: "de_DE", type: "website" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${sans.variable} ${script.variable}`}>
      <body><SiteHeader />{children}<SiteFooter /><CookieBanner /></body>
    </html>
  );
}
