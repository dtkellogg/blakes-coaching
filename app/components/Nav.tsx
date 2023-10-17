import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex items-center justify-between pr-10 margin-auto">
      <Link href="/">
        <Image
          src="/action-manager.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </Link>
      <section className="space-x-10">
        <Link href="/tasks" className="hover:text-secondary transition ease-in-out">
          Tasks
        </Link>
        <Link href="/video" className="hover:text-secondary transition ease-in-out">
          Video
        </Link>
        <Link href="/" className="hover:text-secondary transition ease-in-out">
          Sign In
        </Link>
      </section>
    </div>
  )
}