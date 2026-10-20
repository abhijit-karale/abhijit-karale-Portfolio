import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = {
  themeColor: "#0A0D14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abhijit-karale.github.io/abhijit-karale-Portfolio"),
  title: {
    default: "Abhijit Karale | RTL Design & Verification Engineer",
    template: "%s | Abhijit Karale",
  },
  description:
    "Portfolio of Abhijit Karale — RTL Design (RV32I RISC-V, APB, CDC FIFOs), UVM & Formal Verification (JasperGold), bridged with 2+ years of embedded firmware & hardware bring-up.",
  keywords: [
    "Abhijit Karale",
    "RTL Design Engineer",
    "Design Verification Engineer",
    "SystemVerilog",
    "UVM",
    "Universal Verification Methodology",
    "Formal Verification",
    "JasperGold",
    "Cadence Xcelium",
    "RISC-V",
    "RV32I",
    "CDC FIFO",
    "AMBA APB",
    "Embedded Systems",
    "STM32",
    "FreeRTOS",
    "Firmware Engineer",
    "Low Power Design UPF",
    "Bangalore",
    "Ahmedabad",
    "India",
  ],
  authors: [{ name: "Abhijit Karale", url: "https://linkedin.com/in/abhijitkarale" }],
  creator: "Abhijit Karale",
  publisher: "Abhijit Karale",
  icons: {
    icon: "https://abhijit-karale.github.io/abhijit-karale-Portfolio/icon.svg",
    shortcut: "https://abhijit-karale.github.io/abhijit-karale-Portfolio/icon.svg",
    apple: "https://abhijit-karale.github.io/abhijit-karale-Portfolio/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhijit-karale.github.io/abhijit-karale-Portfolio/",
    title: "Abhijit Karale | RTL Design & Verification Engineer",
    description:
      "RTL microarchitecture, UVM and JasperGold formal verification, backed by 2+ years of physical board bring-up and embedded firmware.",
    siteName: "Abhijit Karale — Silicon Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 1067,
        alt: "Abhijit Karale - RTL Design & Verification Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijit Karale | RTL Design & Verification Engineer",
    description:
      "RTL microarchitecture, UVM and formal verification, backed by 2+ years of physical hardware bring-up.",
    images: ["/profile.jpg"],
    creator: "@abhijitkarale",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-die font-sans text-slate-300 antialiased selection:bg-trace/20 selection:text-trace">
        {children}
      </body>
    </html>
  );
}

