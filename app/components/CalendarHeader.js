// react
import React from 'react'
// import { useSelector, useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


// actions
// import { handleChangeCalendarMonth, setCalendarDays } from '../../actions/calendarActions';

// lists
export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
export const  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


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
    <div className="calendar__row--header">
      <ChevronRightIcon
        size={30}
        fill="var(--old-blue-2)"
        className="btn__calendar"
        onClick={() => handleBackwards()}
      />
      <div className="header__calendar">{`${months[month]} ${year}`}</div>
      <ChevronLeftIcon
        size={30}
        fill="var(--old-blue-2)"
        className="btn__calendar"
        onClick={() => handleForwards()}
      />
    </div>
  )
}