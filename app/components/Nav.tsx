'use client'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import NavLink from "next/link";
import DarkModeButton from './buttons/DarkModeButton';
import Tooltip from './Tooltip';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from "next-themes"


export default function Nav() {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const gearRef = useRef(null)
  const pathname = usePathname()
  const isActive = (path: string) => {
    // console.log(`pathname: ${pathname.split('/')}`)
    return pathname?.split('/')[1] === path
  }
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme


  const { data: session } = useSession();

  console.log('session', session)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
    console.log('Menu', showMenu)
  }

  const toggleDarkMode = () => {
    // setTheme('light')
    currentTheme === "dark" 
      ? setTheme('light')
      : setTheme('dark')
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        // if (ref.current && !ref.current.contains(event.target) && !ref.current.contains(gearRef)) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowMenu(false)
          // console.log("You clicked outside of me!");
          // console.log(`showMenu`, showMenu)
          // console.log('ref.current.contains(gearRef)', ref.current)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(menuRef)

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
        {/* <Tooltip message={"Settings"}> */}
          <Cog6ToothIcon
            className="h-8 w-8 cursor-pointer text-gray-900 dark:text-quaternary"
            onClick={() => (toggleMenu())}
            ref={gearRef}
          />
        {/* </Tooltip> */}
        {showMenu && (

          <ul 
            className={`absolute top-20 flex flex-col justify-end border border-black rounded-lg p-2 space-y-3 z-[99] bg-white`}
            ref={menuRef}
            // onBlur={() => (toggleMenu())}
          >
            {/* <li><DarkModeButton /></li> */}
            <li className="hover:cursor-pointer">
              <label className="relative flex justify-between items-center text-black hover:text-secondary hover:cursor-pointer">
                <input type="checkbox" checked={currentTheme === "dark"} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" onClick={() => (toggleDarkMode())}/>
                <span className="w-8 h-5 flex items-center flex-shrink-0 mr-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-2"></span>
                Dark Mode
              </label>
            </li>
            <li className="text-black text-end">
              {session?.user
                ? <button
                    onClick={() => signOut()} 
                    className={`hover:text-secondary transition ease-in-out ${isActive('')}`}
                  >
                    Sign out
                  </button>
                :  <NavLink href="/login" onClick={() => setShowMenu(false)} className={`hover:text-secondary transition ease-in-out ${isActive('')}`}>
                    Sign In
                  </NavLink>
              }
            </li>
          </ul>
        )}
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