import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteActionItemButton from "./DeleteActionItemButton";
import Tooltip from "./Tooltip";
import CompletedActionItemButton from "./CompletedActionItemButton";

export default async function ActionItemsTable({ actionItems }) {

  // const getActionItems = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/actionItems", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch Action Items");
  //     }

  //     return res.json();
  //   } catch (error) {
  //     console.log("Error loading Action Items: ", error);
  //   }
  // };

  // const { actionItems } = await getActionItems()

  return (
    <table className="table-fixed border-separate border-spacing-0.5 border border-slate-500">
      <caption className="caption-bottom">
        Table 1: All Action Items sorted by deadline.
      </caption>
      <thead>
        <tr className="bg-gray-400 text-black">
          <th className="border border-slate-600">Title</th>
          <th className="border border-slate-600" style={{width: '135px'}}>Deadline</th>
          <th className="border border-slate-600">Description</th>
          <th className="border border-slate-600" style={{width: '100px'}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {actionItems && actionItems.map(({ _id, title, deadline, description, completed }: any, i: number) => (
          <tr key={i} className="bg-gray-100 text-black" style={{height: '100%'}}>
            <td className="border border-slate-700"><Tooltip message={title}><span className="line-clamp-1">{title}</span></Tooltip></td>
            <td className="border border-slate-700">{new Date(`${deadline}`).toUTCString().split(" 00:")[0]}</td>
            <td className="border border-slate-700"><Tooltip message={description}><span className="line-clamp-1">{description}</span></Tooltip></td>
            <td className="border border-slate-700 flex" style={{height: '100%'}}>
              <div className="flex">
                <Tooltip message={"Delete"}>
                  <DeleteActionItemButton id={_id} />
                </Tooltip>
                <Link href={`/tasks/editActionItem/${_id}?title=${title}&deadline=${deadline}&description=${description}`}>
                  <Tooltip message={"Edit"}>
                    <PencilSquareIcon className="h-8 w-8 cursor-pointer" style={{color: "green"}} />
                  </Tooltip>
                </Link>
                <Tooltip message={completed ? "Mark as Incomplete" : "Mark as Complete"}>
                  <CompletedActionItemButton id={_id} title={title} deadline={deadline} description={description} completed={completed} />
                </Tooltip>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
