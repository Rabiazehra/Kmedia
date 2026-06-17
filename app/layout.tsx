import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Outfit, Press_Start_2P, VT323 } from "next/font/google";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroOverlay from "@/components/RetroOverlay";
import PageTransition from "@/components/PageTransition";
import ClientAnimatedLogoIntro from "@/components/AnimatedLogoIntro";
import JsonLd from "@/components/JsonLd";
import { AccessibilityProvider } from "@/components/AccessibilityContext";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KRELIMEDIA — Where Strategy Meets Creativity | Digital Marketing Agency",
    template: "%s | KRELIMEDIA",
  },
  description:
    "Krelimedia is a full-service digital marketing agency. We deliver ROI-driven Meta Ads, Google Ads, social media management, video production, and growth strategies that get results.",
  keywords: [
    "digital marketing agency",
    "social media management",
    "Meta Ads",
    "Google Ads",
    "video production",
    "growth strategy",
    "branding",
    "KRELIMEDIA",
    "marketing agency Pakistan",
  ],
  authors: [{ name: "KRELIMEDIA" }],
  creator: "KRELIMEDIA",
  publisher: "KRELIMEDIA",
  metadataBase: new URL("https://krelimedia.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KRELIMEDIA",
    title: "KRELIMEDIA — Where Strategy Meets Creativity",
    description:
      "Full-service digital marketing agency delivering ROI-driven campaigns, social media management, and creative content that grows brands.",
    url: "https://krelimedia.com",
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "KRELIMEDIA — Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KRELIMEDIA — Where Strategy Meets Creativity",
    description:
      "Full-service digital marketing agency delivering ROI-driven campaigns, social media management, and creative content.",
    images: ["/avatar.png"],
    creator: "@krelimedia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://krelimedia.com",
  },
  icons: {
    icon: "/favicon-krelimedia.png",
    apple: "/favicon-krelimedia.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${bebas.variable} ${outfit.variable} ${pressStart.variable} ${vt323.variable} ${outfit.className} antialiased bg-brand-green`}
        suppressHydrationWarning
      >
        <Script
          id="remove-bis-attr"
          strategy="beforeInteractive"
        >{`(function(){var n="bis_skin_checked";try{new MutationObserver(function(){document.querySelectorAll("["+n+"]").forEach(function(e){e.removeAttribute(n)})}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:[n]});document.querySelectorAll("["+n+"]").forEach(function(e){e.removeAttribute(n)})}catch(e){}})();`}</Script>
        <AccessibilityProvider>
          <ClientAnimatedLogoIntro />
          <JsonLd />
          <RetroOverlay />
          <PageTransition />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}