import React from 'react'
const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]


export default function CalendarDaysOfWeek() {
  return (
    <ul className="h-full w-full col-span-full flex justify-evenly items-center">
      {days.map((day) => (
        <li key={day} className="border border-black p-1 w-full h-full flex justify-center items-center" style={{borderWidth: '0.5px'}}>
          {day}
        </li>
      ))}
    </ul>
  )
}