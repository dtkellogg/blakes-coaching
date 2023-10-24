import './globals.css'
// import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import Footer from './components/Footer'
// import { usePathname } from 'next/navigation'
import { headers } from 'next/headers';

// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const pathname = usePathname()
  // const isActive = (path: string) => {
  //   // console.log(`pathname: ${pathname.split('/')}`)
  //   return pathname?.split('/')[1] === path
  // }

  // console.log('pathname', pathname)
  // console.log('isActive', isActive)

  const headersList = headers();
    const fullUrl = headersList.get('referer') || "",
      urlKeyValue = fullUrl.split('/')[fullUrl.split('/').length - 1]

    // console.log('fullUrl', fullUrl);
    console.log('fullUrl', fullUrl.split('/')[fullUrl.split('/').length - 1]);
    // console.log('fullUrlArray');
    // console.log(fullUrlArray);
    // console.log('domain', domain);

  return (
    <html lang="en">
      <body className="bg-primary text-white min-h-screen flex flex-col">
        <Nav />
        {/* <main className="px-60 pb-4 mb-auto"> */}
        <main className={`px-60 pb-4 mb-auto ${urlKeyValue === 'login' || urlKeyValue === 'register' ? 'mt-auto pb-16' : ''}`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
