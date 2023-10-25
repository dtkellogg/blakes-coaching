import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteActionItemButton from "../buttons/DeleteActionItemButton";
import Tooltip from "../Tooltip";
import CompletedActionItemButton from "../buttons/CompletedActionItemButton";

export default async function Milestones({ milestones }) {

  return (
    <div>
      {milestones && milestones
        .sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
        .map(({ _id, deadline, description, completed }: any) => (
        <section key={_id} className="bg-gray-100 text-black my-3 px-2 py-3 rounded">
          <div>
            <span>By </span><span className="font-semibold">{new Date(`${deadline}`).toUTCString().split(" 00:")[0].split(', ')[1]}:</span>
          </div>
          <div>
            {description}
          </div>
        </section>
      ))}
    </div>



    // <table className="table-fixed divide-y divide-gray-200 w-full">
    //   <thead>
    //     <tr className="bg-gray-300 text-black">
    //       <th className="font-semibold text-left" style={{width: '145px'}}>Deadline</th>
    //       <th className="font-semibold text-left">Description</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {milestones && milestones
    //       .sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
    //       .map(({ _id, title, deadline, description, completed }: any, i: number) => (
    //       <tr key={i} className="bg-gray-100 text-black" style={{height: '100%'}}>
    //         <td className="border-y-2 border-slate-700">{new Date(`${deadline}`).toUTCString().split(" 00:")[0]}</td>
    //         <td className="border-y-2 border-slate-700"><Tooltip message={description}><span className="line-clamp-1">{description}</span></Tooltip></td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  )
}
