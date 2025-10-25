import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O Sole Mio Cucina - Authentic Italian Restaurant",
  description: "Experience authentic Italian flavors at O Sole Mio Cucina. Fresh pasta, wood-fired pizza, and traditional dishes made with love.",
  keywords: ["italian", "restaurant", "pasta", "pizza", "cucina", "authentic", "dining", "newberry"],
  authors: [{ name: "O Sole Mio Cucina" }],
  icons: {
    icon: "/menupro-logo.svg",
    shortcut: "/menupro-logo.svg",
    apple: "/menupro-logo.svg",
  },
  openGraph: {
    title: "O Sole Mio Cucina - Authentic Italian Restaurant",
    description: "Experience authentic Italian flavors at O Sole Mio Cucina. Fresh pasta, wood-fired pizza, and traditional dishes made with love.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/menupro-logo.svg",
        width: 198,
        height: 191,
        alt: "O Sole Mio Cucina Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O Sole Mio Cucina - Authentic Italian Restaurant",
    description: "Experience authentic Italian flavors at O Sole Mio Cucina. Fresh pasta, wood-fired pizza, and traditional dishes made with love.",
    images: ["/menupro-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
