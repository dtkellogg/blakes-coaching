import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import Footer from './components/Footer'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Action Manager - Blake Kami Coaching',
  description: 'Take control of your life with Blake\'s expertise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-white min-h-screen flex flex-col">
        <Nav />
        <main className="px-60 pb-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
