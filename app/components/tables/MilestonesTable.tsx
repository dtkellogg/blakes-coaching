import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DeleteMilestoneButton from "../buttons/DeleteMilestoneButton";
import Tooltip from "../Tooltip";

const commitActionColors = [
  '#33CA59',
  '#507D7F', 
  '#33CCFB', 
  '#FFD586', 
  '#EB6153', 
  '#A8A1DB', 
  '#817E99',
  '#181C1E'
]

export default async function Milestones({ milestones }) {

  return (
    <div>
      {milestones && milestones
        .sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
        .map(({ _id, deadline, description }: any, i: any) => (
        <section 
          key={_id}
          className={`bg-white dark:bg-gray-100 text-primary border dark:text-black my-3 px-2 py-3 rounded`}
          style={{border: `1px solid ${commitActionColors[i % 8]}`}}
        >
          <div>
            <span>By </span><span className="font-semibold">{new Date(`${deadline}`).toUTCString().split(" 00:")[0].split(', ')[1]}:</span>
          </div>
          <div>
            {description}
          </div>
          <div className="flex">
            <Tooltip message={"Delete"}>
              <DeleteMilestoneButton id={_id} />
            </Tooltip>
            <Link href={`/tasks/editMilestone/${_id}?deadline=${deadline}&description=${description}`}>
              <Tooltip message={"Edit"}>
                <PencilSquareIcon className="h-6 w-6 cursor-pointer text-green-600" />
              </Tooltip>
            </Link>
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
