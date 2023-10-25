import './globals.css'
import Providers from "./Providers";
// import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { headers } from 'next/headers';
import { Manrope } from '@next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const manrope = Manrope({
  subsets: ['latin'],
  weight: '400'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const headersList = headers();
  // const fullUrl = headersList.get('referer') || "",
  //   urlKeyValue = fullUrl.split('/')[fullUrl.split('/').length - 1]

  // console.log(headersList)
  // console.log('fullUrl', fullUrl)
  // console.log('urlKeyValue', urlKeyValue)

// const domain = headersList.get("x-forwarded-host") || "";
// const protocol = headersList.get("x-forwarded-proto") || "";
// const pathname = headersList.get("x-invoke-path") || "";


//   console.log('domain', headersList.get("x-forwarded-host"))
//   console.log('protocol', headersList.get("x-forwarded-proto"))
//   console.log('pathname', headersList.get("x-invoke-path"))


  return (
    <html lang="en">
      <body className={`bg-gray-100 dark:bg-primary text-white min-h-screen flex flex-col ${manrope.className} transition-all duration-700`}>
        <Providers>
          <Nav />
          {/* <main className={`px-60 pb-4 mb-auto ${urlKeyValue === 'login' || urlKeyValue === '/login/page' || urlKeyValue === 'register' || urlKeyValue === '/register/page' ? 'mt-auto pb-16' : ''}`}> */}
          {/* <main className="px-60 pb-4 mb-auto"> */}
            {children}
          {/* </main> */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}