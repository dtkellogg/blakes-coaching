import './globals.css'
// import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import Footer from './components/Footer'

// const inter = Inter({ subsets: ['latin'] })

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
