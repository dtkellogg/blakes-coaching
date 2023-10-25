import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteActionItemButton from "../buttons/DeleteActionItemButton";
import Tooltip from "../Tooltip";
import CompletedActionItemButton from "../buttons/CompletedActionItemButton";

export default async function ActionItemsTable({ actionItems }) {

  return (
    <table className="table-fixed border-separate border-spacing-0.5 border border-slate-500">
      <caption className="caption-bottom text-quaternary">
        Table 1: All Action Items sorted by deadline.
      </caption>
      <thead>
        <tr className="bg-gray-400 text-black">
          <th className="border border-slate-600">Title</th>
          <th className="border border-slate-600" style={{width: '145px'}}>Deadline</th>
          <th className="border border-slate-600">Description</th>
          <th className="border border-slate-600" style={{width: '100px'}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {actionItems && actionItems
          .sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
          .map(({ _id, title, deadline, description, completed }: any, i: number) => (
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
                    <PencilSquareIcon className="h-8 w-8 cursor-pointer text-green-600" />
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
