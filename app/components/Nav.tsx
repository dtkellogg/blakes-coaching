import Image from "next/image";

export default function Nav() {
  return (
    <div className="bg-red-500 flex content-center margin-auto">
      <h1>
        Nav
      </h1>
      <Image
        src="/action-manager.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </div>
  )
}