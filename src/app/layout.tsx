import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: 'DoLink - URL Shortener and Share',
  description: 'A simple URL shortener and share tools by dol.ink',
  image: "https://dol.ink/logo.png",
}

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | DoLink - URL Shortener and Share',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://dol.ink/",
    siteName: meta.title,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: "https://dol.ink/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
