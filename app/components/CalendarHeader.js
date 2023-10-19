// react
import React from 'react'
// import { useSelector, useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


// actions
// import { handleChangeCalendarMonth, setCalendarDays } from '../../actions/calendarActions';

// lists
export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
export const  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const handleChangeCalendarMonth = (type) => async (dispatch, getState) => {
  try {
    const { calendarDate: { date } } = getState(),
      month = date.getMonth(),
      year = date.getFullYear()

    let newDate = null

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

    return newDate
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
}

export default function CalendarHeader() {
  
  // const dispatch = useDispatch()

  // const calendarDate = useSelector((state) => state.calendarDate);
  // const { date } = calendarDate;

  const date = new Date()

  const month = date.getMonth()
  const year = date.getFullYear()

  // const handleBackwards = () => {
  //   dispatch(handleChangeCalendarMonth('backwards'))
  // }

  // const handleForwards = () => {
  //   dispatch(handleChangeCalendarMonth('forwards'))
  // }

  // React.useEffect(() => {
  //   dispatch(setCalendarDays(date))
  // }, [date])

  return (
    <div className="flex justify-between row-span-1 row-start-1 col-span-full px-32 border border-black text-xl items-center bg-gray-300 ">
      <ChevronLeftIcon
        width={35}
        height={35}
        fill="var(--old-blue-2)"
        className="btn__calendar"
        onClick={() => handleBackwards()}
      />
      <div className="header__calendar">{`${months[month]} ${year}`}</div>
      <ChevronRightIcon
        width={35}
        height={35}
        fill="var(--old-blue-2)"
        className="btn__calendar"
        onClick={() => handleForwards()}
      />
    </div>
  )
}