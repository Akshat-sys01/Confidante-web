import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Navigation, Footer } from './components/layout'

export const metadata: Metadata = {
  title: 'Confidante - Empowering Youth Through Health Education',
  description: 'Bridging the gap between awareness and action in mental health, sex education, and emotional well-being.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
} 