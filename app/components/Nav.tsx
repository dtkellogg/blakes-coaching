'use client'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";
import NavLink from "next/link";
import DarkModeButton from './buttons/DarkModeButton';

export default function Nav() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    // console.log(`pathname: ${pathname.split('/')}`)
    return pathname?.split('/')[1] === path
  }

  const { data: session } = useSession();

  console.log('session', session)

  return (
    <div className="flex items-center justify-between margin-auto text-primary dark:text-quaternary">
      <NavLink href="/">
        <Image
          src="/action-manager.svg"
          alt="Action Manager Logo"
          className="dark:invert scale-150 ml-5"
          width={100}
          height={100}
          priority
        />
      </NavLink>
      <section className="flex items-center space-x-10 translate-x-[20%]">
        <NavLink href="/tasks" className={`hover:text-secondary transition ease-in-out ${(isActive('tasks') || isActive('createActionItem') || isActive('editActionItem')) && 'underline decoration-secondary underline-offset-4'}`}>
          Tasks
        </NavLink>
        <NavLink href="/video" className={`hover:text-secondary transition ease-in-out ${isActive('video') && 'underline decoration-secondary underline-offset-4'}`}>
          Video
        </NavLink>
      </section>
      <section className="flex items-center space-x-10 mr-10">
        <DarkModeButton />
        {session?.user
          ? <button
              onClick={() => signOut()} 
              className={`hover:text-secondary transition ease-in-out ${isActive('')}`}
            >
              Sign out
            </button>
          :  <NavLink href="/login" className={`hover:text-secondary transition ease-in-out ${isActive('')}`}>
              Sign In
            </NavLink>
      }
      </section>
    </div>
  )
}