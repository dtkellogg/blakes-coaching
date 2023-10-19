import Link from "next/link";
import ActionItemsList from '@/app/components/ActionItemsList'
import ActionItemsTable from '@/app/components/ActionItemsTable'
import Calendar from '@/app/components/Calendar'

export default function Tasks() {

  return (
    <div className="flex flex-col">
      <h1 className="header-primary mb-4">Tasks</h1>
      {/* <ActionItemsList /> */}
      <Calendar />
      <ActionItemsTable />
      <Link href="/tasks/createActionItem">
        <button className="btn-primary mt-10 w-full">
          Create Action Item
        </button>
      </Link>
    </div>
  )
}