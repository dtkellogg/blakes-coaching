import Link from "next/link";

export default function Tasks() {
  return (
    <main className="">
      <h1 className="header-primary">Tasks Page</h1>
      <Link href="/createActionItem" className="btn-primary">Create Action Item</Link>
    </main>
  )
}