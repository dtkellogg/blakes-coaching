import './globals.css'
// import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { headers } from 'next/headers';

// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const headersList = headers();
  const fullUrl = headersList.get('referer') || "",
    urlKeyValue = fullUrl.split('/')[fullUrl.split('/').length - 1]

  console.log(headersList)
    console.log('fullUrl', fullUrl)
  console.log('urlKeyValue', urlKeyValue)

  return (
    <html lang="en">
      <body className="bg-primary text-white min-h-screen flex flex-col">
        <Nav />
        <main className={`px-60 pb-4 mb-auto ${urlKeyValue === 'login' || urlKeyValue === '/login/page' || urlKeyValue === 'register' || urlKeyValue === '/register/page' ? 'mt-auto pb-16' : ''}`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}