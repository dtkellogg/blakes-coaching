import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Tooltip from './Tooltip';
export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
export const  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default function CalendarHeader() {
  const [date, setDate] = useState(new Date())
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const handleBackwards = () => {
    handleChangeCalendarMonth('backwards', date, month, year)
  }
  const handleForwards = () => {
    handleChangeCalendarMonth('forwards', date, month, year)
  }

  const handleChangeCalendarMonth = (type) => {
    try {
      let newDate

      if(type === 'forwards') {
        let nextMonth = (month === 11) ? 0 : month + 1
        newDate = month !== 11 
          ? new Date(year, nextMonth)
          : new Date(year + 1, nextMonth)
      } else if(type === 'backwards') {
        let previousMonth = (month === 0) ? 11 : month - 1
        newDate = month !== 0 
          ? new Date(year, previousMonth)
          : new Date(year - 1, previousMonth)
      }
      setDate(newDate)
      setMonth(newDate.getMonth())
      setYear(newDate.getFullYear())
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    }
  }

  return (
    <div className="flex justify-between row-span-1 row-start-1 col-span-full px-32 border border-black text-xl items-center bg-gray-300 ">
      <Tooltip message={"Previous Month"}>
        <ChevronLeftIcon
          width={35}
          height={35}
          className="btn__calendar text-secondary fill-secondary cursor-pointer"
          onClick={() => handleBackwards()}
        />
      </Tooltip>
      <div className="header__calendar">{`${months[month]} ${year}`}</div>
      <Tooltip message={"Next Month"}>
        <ChevronRightIcon
          width={35}
          height={35}
          className="btn__calendar text-secondary fill-secondary cursor-pointer"
          onClick={() => handleForwards()}
        />
      </Tooltip>
    </div>
  )
}