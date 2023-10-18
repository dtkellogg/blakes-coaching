import Image from "next/image";
import NavLink from "next/link";

export default function Nav() {
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
        <NavLink href="/tasks" className="hover:text-secondary transition ease-in-out">
          Tasks
        </NavLink>
        <NavLink href="/video" className="hover:text-secondary transition ease-in-out">
          Video
        </NavLink>
        <NavLink href="/" className="hover:text-secondary transition ease-in-out">
          Sign In
        </NavLink>
      </section>
    </div>
  )
}