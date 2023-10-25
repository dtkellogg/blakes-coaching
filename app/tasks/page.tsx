import Link from "next/link";
// import ActionItemsList from '@/app/components/ActionItemsList'
import ActionItemsTable from '@/app/components/tables/ActionItemsTable'
import ActionItemsTable2 from '@/app/components/tables/ActionItemsTable2'
import Calendar from '@/app/components/Calendar'
import ReasonsToCelebrate from "../components/tables/ReasonsToCelebrateTable";
import IncompleteOrLate from "../components/tables/IncompleteOrLateTable";

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

  const { actionItems } = await getActionItems(),
    today = new Date();

  const actionItemsToCelebrate = actionItems.filter(actionItem => new Date(actionItem.deadline).getTime() < today && actionItem.completed),
    actionItemsIncompleteOrLate = actionItems.filter(actionItem => new Date(actionItem.deadline).getTime() < today && !actionItem.completed),
    actionItemsUpcoming = actionItems.filter(actionItem => new Date(actionItem.deadline).getTime() > today)

  console.log('today', today)

  return (
    <main className="flex flex-col">
      <h1 className="header-primary mb-4">Tasks</h1>

      <section className="grid grid-cols-[15rem_1fr_15rem]">
        <div className="flex flex-col px-3">
          <div className="flex flex-col">
            <h2 className="header-tertiary mb-4">Reasons to Celebrate:</h2>
            <div className="overflow-hidden border border-black rounded-md mb-6">
              <ReasonsToCelebrate actionItems={actionItemsToCelebrate}/>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="header-tertiary mb-4">Incomplete or Late:</h2>
            <div className="overflow-hidden border border-black rounded-md mb-6">
              <IncompleteOrLate actionItems={actionItemsIncompleteOrLate}/>
            </div>
          </div>
        </div>

        <div>
          {/* <ActionItemsList /> */}
          {/* <ActionItemsTable actionItems={actionItems} /> */}
          {/* <div className="border border-black rounded-lg"> */}
          <div className="flex items-center mb-4 space-x-6">
            <h2 className="header-tertiary">Upcoming:</h2>
            <Link href="/tasks/createActionItem">
              <button className="btn-primary-small">
                Create Action Item
              </button>
            </Link>
          </div>
          <div className="overflow-hidden border border-black rounded-md mb-6">
            <ActionItemsTable2 actionItems={actionItemsUpcoming} />
          </div>
          <Calendar actionItems={actionItems} />
        </div>

        <div className="flex flex-col px-3">
          <h1 className="header-tertiary">Milestones</h1>
        </div>
      </section>
    </main>
  )
}