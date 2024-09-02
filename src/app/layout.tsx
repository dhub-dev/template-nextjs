import fs from 'fs'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/layout'
import path from 'path'
import { SearchIndexProvider } from '@/components/search-index-context'
import { portalMetadata } from '@portal-dev/core/metadata'

const searchIndex = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.next/search-index.json'), 'utf-8'),
)

export const generateMetadata = portalMetadata({
  defaultTitle: 'Portal docs',
  metadata: {
    description: 'Next.js documentation template',
  },
  searchIndex,
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-portal-background-body font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchIndexProvider value={searchIndex}>
            <Layout>{children}</Layout>
          </SearchIndexProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
