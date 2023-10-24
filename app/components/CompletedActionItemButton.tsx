"use client"

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { revalidatePath } from 'next/cache'
import { useRouter } from "next/navigation";

export default function CompletedActionItemButton({ id, title, deadline, description, completed }: any) {
  const [error, setError] = useState([]);
  const [status, setStatus] = useState(false);
  const router = useRouter()

  const toggleCompleted = async (id: string) => {
    completed = !completed

    const res = await fetch(`api/actionItems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        deadline,
        description,
        completed
      })
    })

    // await fetch("http://localhost:3000/api/actionItems", {
    //     cache: "no-store",
    //   });

    // revalidatePath('/actionItems')

    router.refresh()

    const res2 = await res.json();
    const { msg, status } = res2;
    setError(msg);
    setStatus(status);

    console.log(res2)
    console.log(`msg: ${msg}, status: ${status}`)
    console.log(msg)
  };

  return (
    <button onClick={() => toggleCompleted(id)}>
      {
        completed 
          ? <CheckCircleIcon className="h-8 w-8 cursor-pointer" style={{color: "gold"}} />
          : <XCircleIcon className="h-8 w-8 cursor-pointer" style={{color: "grey"}} />
      }
    </button>
  )
}