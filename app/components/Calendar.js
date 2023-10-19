"use client"

import React, { useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux";

// prop-types
import PropTypes from "prop-types";

// components
import CalendarBody from "./CalendarBody";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import CalendarHeader from './CalendarHeader'

export const  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(m, y) {
  // months in JavaScript start at 0 so decrement by 1 e.g. 11 = Dec
  // if month is Sept, Apr, Jun, Nov return 30 days
  if( /8|3|5|10/.test( m ) ) return 30;
  // if month is not Feb return 31 days
  if( m !== 1 ) return 31;
  // To get this far month must be Feb ( 1 )
  // if the year is a leap year then Feb has 29 days
  if( ( y % 4 === 0 && y % 100 !== 0 ) || y % 400 === 0 ) return 29;
  // Not a leap year. Feb has 28 days.
  return 28;
}

export const setCalendarDays = (date) => {
  try {
    date = new Date(date)

    const month = date.getMonth(),
      year = date.getFullYear()
      // { userLogin : { userInfo } } = getState(),
      // { appointmentList: {loading, error, appointments} } = getState()
      let appointments = []

    let daysInThisMonth = getDaysInMonth(month, year),
      daysInLastMonth = getDaysInMonth(month - 1, year),
      daysInLastMonthToShow = new Date(year, month, 1).getDay(),
      arrayDaysCurrentMonth = [],
      arrayDaysLastMonth = [],
      arrayDaysNextMonth = []
    
    for (let i = daysInLastMonth; i > daysInLastMonth - daysInLastMonthToShow; i--) {
      arrayDaysLastMonth.unshift({ num: i, month: months[month - 1], year: year, appts: [] })
    }
    for (let i = 1; i < 43 - (daysInThisMonth + daysInLastMonthToShow); i++) {
      arrayDaysNextMonth.push({ num: i, month: months[month + 1], year: year, appts: [] })
    }
    for (let i = 1; i < daysInThisMonth + 1; i++) {
      arrayDaysCurrentMonth.push({ num: i, month: month, year: year, appts: [] })
    }
  
    let arrayAllDays = [...arrayDaysLastMonth, ...arrayDaysCurrentMonth, ...arrayDaysNextMonth],
        allDaysWithAppts = []

    // if(userInfo) {
      arrayAllDays.forEach((calDay) => {
        appointments
          .filter((appt) => appt.student === userInfo.name)
          .forEach((appt) => {
            const apptDate = appt.date.split("T")[0].split("-");
            const apptDay = parseInt(apptDate[2]);
            const apptMonth = months[apptDate[1] - 1];
  
            if (apptDay === calDay.num && apptMonth === calDay.month) {
              calDay.appointments.push(appt);
            }
          });
  
        allDaysWithAppts.push(calDay);
      })
    // }
    return arrayAllDays
  } catch (error) {
    return error.response && error.response.data.message
          ? error.response.data.message
          : error.message
  }
}


export default function Calendar({ type }) {
  const calendarDays = setCalendarDays(new Date())

  console.log(calendarDays)

  return (
    <div className="bg-white border border-black grid grid-cols-7 grid-rows-[3rem_2rem_repeat(6,_1fr)] mb-10 text-black h-[45rem]">
      <CalendarHeader />
      <CalendarDaysOfWeek />
      <CalendarBody calendarDays={calendarDays}/>
    </div>
  )
}

Calendar.propTypes = {
  type: PropTypes.string
}