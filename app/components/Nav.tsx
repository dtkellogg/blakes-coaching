'use client'
import { usePathname } from 'next/navigation'

import Image from "next/image";
import NavLink from "next/link";

export default function Nav() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    // console.log(`pathname: ${pathname.split('/')}`)
    return pathname?.split('/')[1] === path
  }

  // console.log(isActive('tasks'))

  return (
    <div className="flex items-center justify-between pr-10 margin-auto">
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
      <section className="space-x-10">
        <NavLink href="/tasks" className={`hover:text-secondary transition ease-in-out ${(isActive('tasks') || isActive('createActionItem') || isActive('editActionItem')) && 'underline decoration-secondary underline-offset-4'}`}>
          Tasks
        </NavLink>
        <NavLink href="/video" className={`hover:text-secondary transition ease-in-out ${isActive('video') && 'underline decoration-secondary underline-offset-4'}`}>
          Video
        </NavLink>
        <NavLink href="/" className={`hover:text-secondary transition ease-in-out ${isActive('')}`}>
          Sign In
        </NavLink>
      </section>
    </div>
  )
}