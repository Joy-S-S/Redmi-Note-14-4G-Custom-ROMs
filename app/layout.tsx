import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  BASE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Redmi Note 14 4G",
    "tanzanite",
    "custom ROM",
    "HyperOS",
    "stock ROM",
    "Magisk modules",
    "Android",
  ],
  authors: [{ name: "Yousef Sayed", url: "https://github.com/Joy-S-S" }],
  creator: "Yousef Sayed",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl("/assets/cover.jpg"),
        width: 1200,
        height: 630,
        alt: "Tanzanite ROMs for Redmi Note 14 4G",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/assets/cover.jpg")],
  },
  icons: {
    icon: `${BASE_PATH}/assets/icon.ico`,
    shortcut: `${BASE_PATH}/assets/icon.ico`,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#151619",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip antialiased">
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 w-full max-w-full min-w-0">
          {children}
        </main>
        <SiteFooter />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
