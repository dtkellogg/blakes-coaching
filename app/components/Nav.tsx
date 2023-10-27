'use client'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import NavLink from "next/link";
import DarkModeButton from './buttons/DarkModeButton';
import Tooltip from './Tooltip';
import { useState } from 'react';

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()
  const isActive = (path: string) => {
    // console.log(`pathname: ${pathname.split('/')}`)
    return pathname?.split('/')[1] === path
  }

  const { data: session } = useSession();

  console.log('session', session)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="grid grid-cols-3 w-full text-primary dark:text-quaternary">
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
      <section className="flex items-center justify-center space-x-10">
        <NavLink href="/tasks" className={`hover:text-secondary transition ease-in-out ${(isActive('tasks') || isActive('createActionItem') || isActive('editActionItem')) && 'underline decoration-secondary text-secondary underline-offset-4'}`}>
          Tasks
        </NavLink>
        <NavLink href="/video" className={`hover:text-secondary transition ease-in-out ${isActive('video') && 'underline decoration-secondary text-secondary underline-offset-4'}`}>
          Video
        </NavLink>
      </section>
      <section className="flex items-center justify-end space-x-5 mr-10 relative">
        <span>{session?.user && session?.user.name}</span>
        <Tooltip message={"Settings"}>
          <Cog6ToothIcon
            className="h-8 w-8 cursor-pointer text-gray-900"
            onClick={() => (toggleMenu())}
          />
        </Tooltip>
        <ul className={`${showMenu ? 'block' : 'hidden'} absolute top-20 flex flex-col justify-end border border-black rounded-lg p-4 space-y-3 z-[99]`}>
          <li><DarkModeButton /></li>
          <li>
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
          </li>
        </ul>
      </section>
      
      {/* <section className="flex items-center justify-end space-x-10 mr-10">
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
      </section> */}
    </div>
  )
}