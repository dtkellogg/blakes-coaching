"use client"

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function DeleteActionItemButton({ id }) {
  const router = useRouter();

  const removeActionItem = async (id: string) => {
    // const confirmed = confirm("Are you sure?");
    console.log(id);
    const confirmed = true

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/actionItems?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh()
        router.push('/tasks/?undefined')
        router.refresh()
        // router.replace(router.asPath)
        // console.log('DELETED !!!')
      }
    }
  };

  return (
    <button onClick={() => removeActionItem(id)} className="text-red-400">
      <TrashIcon className="h-8 w-8 cursor-pointer" style={{color: "red"}} />
    </button>
  )
}