"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";


export default function CreateActionItemForm() {
  const { data: session } = useSession();

  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [assignedBy, setAssignedBy] = useState('')
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('../api/actionItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        deadline,
        description,
        assignedBy,
        assignedTo
      })
    })

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setTitle("");
      setDeadline("");
      setDescription("");
      router.refresh()
      router.push('/tasks')
    }

    console.log(msg)
  }

  useEffect(() => {
    setAssignedTo(session?.user.email)
    setAssignedBy(session?.user.email)
  }, [session])

  return (
    <>
      <form onSubmit={handleSubmit} className="py-4 my-4 border-t flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="label">Title:</label>
          <input type="text" id="title" name="title" placeholder="Title" className="input" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="deadline" className="label">Deadline:</label>
          <input type="date" id="deadline" name="deadline" placeholder="Deadline" className="input" onChange={(e) => setDeadline(e.target.value)} value={deadline} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="label">Description:</label>
          <textarea id="description" name="description" placeholder="Description" className="input h-32" onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>
        <button
          className="btn-primary mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e, i) => (
            <div
              key={i}
              className={`${
                success ? "text-green-800" : "text-red-600"
              } px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>
    </>
  )
}