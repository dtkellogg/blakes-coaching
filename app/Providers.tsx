"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"

// export const AuthProvider = ({ children }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };


function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers