import Link from "next/link";
// import ActionItemsList from '@/app/components/ActionItemsList'
import ActionItemsTable from '@/app/components/ActionItemsTable'
import ActionItemsTable2 from '@/app/components/ActionItemsTable2'
import Calendar from '@/app/components/Calendar'

const getActionItems = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/actionItems", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Action Items");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading Action Items: ", error);
  }
};

export default async function Tasks() {

  const { actionItems } = await getActionItems()

  return (
    <main className="px-60 pb-4 mb-auto">
      <h1 className="header-primary mb-4">Tasks</h1>
      {/* <ActionItemsList /> */}
      <div className="overflow-hidden border border-black rounded-lg mb-12">
        <ActionItemsTable2 actionItems={actionItems} />
      </div>
      <ActionItemsTable actionItems={actionItems} />
      <Link href="/tasks/createActionItem">
        <button className="btn-primary my-10 w-full">
          Create Action Item
        </button>
      </Link>
      <Calendar actionItems={actionItems} />
    </main>
  )
}