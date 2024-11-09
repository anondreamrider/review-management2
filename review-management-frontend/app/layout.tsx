import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI-Powered Review Management',
  description: 'Manage and analyze your customer reviews with ease',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if the current route is the home page
  const isHomePage = typeof window !== 'undefined' && window.location.pathname === '/'

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            {/* Render sidebar for all pages except the home page */}
            {!isHomePage && <Sidebar />}
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="border-b">
                <div className="flex h-16 items-center px-4">
                  <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserNav />
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}