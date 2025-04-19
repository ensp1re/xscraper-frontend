import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "XScraper API Documentation",
  description: "Documentation for the XScraper Twitter API endpoints",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="container flex flex-1 px-0">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
