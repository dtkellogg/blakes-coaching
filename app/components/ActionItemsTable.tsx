import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteActionItemButton from "./DeleteActionItemButton";

export default async function ActionItemsTable() {

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

  const { actionItems } = await getActionItems()

  return (
    <table className="table-fixed border-separate border-spacing-0.5 border border-slate-500">
      <caption className="caption-bottom">
        Table 1: All Action Items sorted by deadline.
      </caption>
      <thead>
        <tr className="bg-gray-400 text-black">
          <th className="border border-slate-600">Title</th>
          <th className="border border-slate-600">Deadline</th>
          <th className="border border-slate-600">Description</th>
          <th className="border border-slate-600" style={{width: '30px'}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {actionItems && actionItems.map(({ _id, title, deadline, description }: any, i: number) => (
          <tr key={i} className="bg-gray-100 text-black">
            <td className="border border-slate-700">{title}</td>
            <td className="border border-slate-700">{new Date(`${deadline}`).toUTCString().split(" 00:")[0]}</td>
            <td className="border border-slate-700">{description}</td>
            <td className="border border-slate-700 flex">
              <DeleteActionItemButton id={_id} />
              <Link href={`/tasks/editActionItem/${_id}?title=${title}&deadline=${deadline}&description=${description}`}>
                <PencilSquareIcon className="h-8 w-8 cursor-pointer" style={{color: "green"}} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
