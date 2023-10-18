import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default async function ActionItemsTable() {
  // const router = useRouter();

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

  // const removeTopic = async (id: string) => {
  //   // const confirmed = confirm("Are you sure?");
  //   const confirmed = false

  //   if (confirmed) {
  //     const res = await fetch(`http://localhost:3000/api/actionItems?id=${id}`, {
  //       method: "DELETE",
  //     });

  //     if (res.ok) {
  //       router.refresh();
  //     }
  //   }
  // };

  const { actionItems } = await getActionItems()

  return (
    <table className="table-auto border-separate border-spacing-0.5 border border-slate-500">
      <caption className="caption-bottom">
        Table 1: All Action Items sorted by deadline.
      </caption>
      <thead>
        <tr className="bg-gray-400 text-black">
          <th className="border border-slate-600">Title</th>
          <th className="border border-slate-600">Deadline</th>
          <th className="border border-slate-600">Description</th>
          <th className="border border-slate-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {actionItems && actionItems.map((actionItem: any, i: number) => (
          <tr key={i} className="bg-gray-100 text-black">
            <td className="border border-slate-700">{actionItem.title}</td>
            <td className="border border-slate-700">{new Date(`${actionItem.deadline}`).toDateString()}</td>
            <td className="border border-slate-700">{actionItem.description}</td>
            <td className="border border-slate-700 flex">
              {/* <button onClick={removeTopic(actionItem._id)} className="text-red-400"> */}
                <TrashIcon className="h-8 w-8 cursor-pointer" style={{color: "red"}} />
              {/* </button> */}
              <span>
                <PencilSquareIcon className="h-8 w-8 cursor-pointer" style={{color: "green"}} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
