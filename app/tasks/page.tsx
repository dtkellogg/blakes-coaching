import Link from "next/link";
import ActionItemsList from '@/app/components/ActionItemsList'

export default function Tasks() {

  return (
    <div className="flex flex-col">
      <h1 className="header-primary">Tasks Page</h1>
      <ActionItemsList />
      <Link href="/tasks/createActionItem">
        <button className="btn-primary mt-10 w-full">
          Create Action Item
        </button>
      </Link>
    </div>
  )
}