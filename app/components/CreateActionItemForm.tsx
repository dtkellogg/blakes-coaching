"use client"

import { redirect, useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateActionItemForm() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('api/actionItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        date,
        description
      })
    })

    const { msg } = await res.json()

    console.log(msg)

    router.push('/')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="py-4 my-4 border-t flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="label">Title:</label>
          <input type="text" id="title" name="title" placeholder="Title" className="input" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="label">Due Date:</label>
          <input type="date" id="date" name="date" placeholder="Due Date" className="input" onChange={(e) => setDate(e.target.value)} value={date} />
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

      <div>
        <div>Error Message:</div>
      </div>
    </>
  )
}