
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "nextLeap - Career Forecasting & Cultural Match",
  description: "AI-powered career forecasting and cultural matching platform",
  generator: 'v0.dev',
  robots: 'index, follow',
  // Preload critical resources
  other: {
    'next-head-count': '0',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <div id="portal-toaster"></div>
        </ThemeProvider>
      </body>
    </html>
  )
}
