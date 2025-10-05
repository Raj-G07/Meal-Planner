import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { CopilotKit } from "@copilotkit/react-core"
import "@copilotkit/react-ui/styles.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Meal Planner App",
  description: "Created with Copilot Kit Ui with Direct LLM",
  icons: {
    icon: "/MealPlanner2.0.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <CopilotKit publicApiKey={process.env.COPILOT_CLOUD_PUBLIC_API_KEY}>
            {children}
          </CopilotKit>
        </Suspense>
      </body>
    </html>
  )
}
