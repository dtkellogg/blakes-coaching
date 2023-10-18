"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function EditActionItemForm() {
  const params = useParams()
  const searchParams = useSearchParams()
  const deadlineFromParams = searchParams.get('deadline')

  const [title, setTitle] = useState(searchParams.get('title'))
  const [deadline, setDeadline] = useState(new Date(deadlineFromParams).toISOString().split("T")[0])
  const [description, setDescription] = useState(searchParams.get('description'))
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log(`tile: ${title}, description: ${description}, deadline: ${new Date(deadline)}`)

    const res = await fetch(`../../api/actionItems/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        deadline,
        description
      })
    })

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setTitle("");
      setDeadline("");
      setDescription("");
      router.push('/tasks')
    }

    console.log(msg)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="py-4 my-4 border-t flex flex-col gap-5">
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