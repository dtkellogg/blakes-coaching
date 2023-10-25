"use client"

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function DeleteActionItemButton({ id }) {
  const router = useRouter();

  const removeActionItem = async (id: string) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/actionItems?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh()
      }
    }
  };

  return (
    <button onClick={() => removeActionItem(id)}>
      <TrashIcon className="h-6 w-6 cursor-pointer text-red-600" />
    </button>
  )
}