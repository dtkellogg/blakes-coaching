import Link from "next/link";
// import ActionItemsList from '@/app/components/ActionItemsList'
import ActionItemsTable from '@/app/components/tables/ActionItemsTable'
import ActionItemsTable2 from '@/app/components/tables/ActionItemsTable2'
import Calendar from '@/app/components/Calendar'
import ReasonsToCelebrate from "../components/tables/ReasonsToCelebrateTable";
import IncompleteOrLate from "../components/tables/IncompleteOrLateTable";
import Milestones from "../components/tables/MilestonesTable";

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

const getMilestones = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/milestones", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Milestones");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading Milestones: ", error);
  }
};

export default async function Tasks() {
  const { actionItems } = await getActionItems()
  const { milestones } = await getMilestones(),
    today = new Date();

  const actionItemsToCelebrate = actionItems.filter(actionItem => actionItem.completed),
    actionItemsIncompleteOrLate = actionItems.filter(actionItem => new Date(actionItem.deadline).getTime() < today && !actionItem.completed),
    actionItemsUpcoming = actionItems.filter(actionItem => new Date(actionItem.deadline).getTime() > today && !actionItem.completed)

  return (
    <main className="flex flex-col">
      <h1 className="header-primary mb-4">Tasks</h1>

      <section className="grid grid-cols-[15rem_1fr_15rem]">
        <section className="flex flex-col pl-4 pr-2 items-center mb-4">
          <div className="flex flex-col">
            <h2 className="header-tertiary mb-4 leading-7">Reasons to Celebrate:</h2>
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
        </section>

        <section className="px-2">
          {/* <ActionItemsList /> */}
          {/* <ActionItemsTable actionItems={actionItems} /> */}
          {/* <div className="border border-black rounded-lg"> */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="header-tertiary">Upcoming:</h2>
            <Link href="/tasks/createActionItem">
              <button className="btn-primary-small">
                Create Action Item
              </button>
            </Link>
          </div>
          <div className="overflow-hidden overflow-y-scroll border border-black rounded-md mb-6 max-h-[310px]">
            <ActionItemsTable2 actionItems={actionItemsUpcoming} />
          </div>
          <Calendar actionItems={actionItems} />
        </section>

        {/* <div className="flex flex-col px-3">
          <h1 className="header-tertiary">Milestones</h1>
        </div> */}
        <section className="pl-2 pr-4">
          <div className="flex items-start mb-4 justify-between">
            <h2 className="header-tertiary">Milestones:</h2>
            <Link href="/tasks/createMilestone">
              <button className="btn-primary-small">
                Create Milestone
              </button>
            </Link>
          </div>
          <div className="mb-6 max-h-[67.25rem] overflow-y-scroll">
          {/* <div className="mb-6"> */}
            <Milestones milestones={milestones} />
          </div>
        </section>
      </section>
    </main>
  )
}