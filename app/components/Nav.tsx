import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex items-center justify-between pr-10 margin-auto">
      <Image
        src="/action-manager.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      <section className="space-x-10">
        <Link href="/tasks">
          Tasks
        </Link>
        <Link href="/video">
          Video
        </Link>
        <Link href="/signIn">
          Sign In
        </Link>
      </section>
    </div>
  )
}