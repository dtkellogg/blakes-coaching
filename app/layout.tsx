import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import Nav from './components/Nav'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blake Kami Coaching',
  description: 'Take control of your life with Blake\'s expertise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-white">
        <Nav />
        <main className="px-60 pb-4">
          {children}
        </main>
      </body>
    </html>
  )
}
