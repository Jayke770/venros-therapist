import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import type { Viewport } from 'next'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Analytics } from '@vercel/analytics/react';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "Company",
  description: "The best company",
};
export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background  font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
