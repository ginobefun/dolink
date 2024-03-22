import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { domain } from "@/lib/constant";

const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: 'DoLink - URL Shortener and Share Tools',
  description: 'A simple URL shortener and share tools.',
  image: domain + "logo.png",
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
    url: domain,
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
    canonical: domain,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
