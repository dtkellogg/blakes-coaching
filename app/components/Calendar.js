"use client"

import React, { useState } from "react"
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Tooltip from './Tooltip';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const { v4: uuid } = require("uuid");

function AMPMTime(time) {
  return useFormatAMPM(time);
}

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

export const makeCalendar = (date) => {
  try {
    date = new Date(date)

    const month = date.getMonth(),
      year = date.getFullYear()
      let appointments = []

    let daysInThisMonth = getDaysInMonth(month, year),
      daysInLastMonth = getDaysInMonth(month - 1, year),
      daysInLastMonthToShow = new Date(year, month, 1).getDay(),
      arrayDaysCurrentMonth = [],
      arrayDaysLastMonth = [],
      arrayDaysNextMonth = []

    console.log(`daysInThisMonth: ${daysInThisMonth}, daysInLastMonth: ${daysInLastMonth}, daysInLastMonthToShow: ${daysInLastMonthToShow}`)
    
    for (let i = daysInLastMonth; i > daysInLastMonth - daysInLastMonthToShow; i--) {
      arrayDaysLastMonth.unshift({ num: i, month: months[month - 1], year: year, appts: [] })
    }
    for (let i = 1; i < 43 - (daysInThisMonth + daysInLastMonthToShow); i++) {
      arrayDaysNextMonth.push({ num: i, month: months[month + 1], year: year, appts: [] })
    }
    for (let i = 1; i < daysInThisMonth + 1; i++) {
      arrayDaysCurrentMonth.push({ num: i, month: month, year: year, appts: [] })
    }

    // console.log(`arrayDaysCurrentMonth`)
    // console.log(arrayDaysCurrentMonth)
    // console.log(`arrayDaysLastMonth`)
    // console.log(arrayDaysLastMonth)
    // console.log(`arrayDaysNextMonth`)
    // console.log(arrayDaysNextMonth)
    
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


export default function Calendar() {
  // const calendarDays = makeCalendar(new Date())
  
  const [calendarDays, setCalendarDays] = useState(makeCalendar(new Date()))
  const [date, setDate] = useState(new Date())
  const [day, setDay] = useState(new Date().getDate())
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
      setCalendarDays(makeCalendar(newDate))
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
    <div className="bg-white border border-black grid grid-cols-7 grid-rows-[3rem_2rem_repeat(6,_1fr)] mb-10 text-black h-[45rem]">

      {/* --- header: --- */}

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

      <CalendarDaysOfWeek />

      {/* --- body --- */}

      <ul className="grid grid-cols-7 grid-rows-6 justify-center items-start col-span-full" style={{gridRow: '3/-1'}}>
        {calendarDays.map((calendarSquare) => {
          if (calendarSquare.month !== month) {
            if (calendarSquare.appts.length !== 0) {
              return (
                <li
                  className="calendar__row--element-with-appts text-gray-500"
                  key={uuid()}
                >
                  <div
                    style={{
                      display: "block",
                      color: "var(--grey-5)",
                      alignSelf: "flex-end",
                    }}
                  >
                    {calendarSquare.num}
                  </div>
                  <br />
                  <div
                    className="calendar__row--appt text-secondary"
                  >
                    {calendarSquare.appts.map((appt) => {
                      return (
                        <div key={uuid()}>
                          <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            } else
              return (
                <li
                  key={uuid()}
                  className="h-full w-full flex items-start border border-black justify-end p-1 text-gray-500"
                  style={{borderWidth: '0.5px'}}
                >
                  {calendarSquare.num}
                </li>
              );
          } else if (
            calendarSquare.num === day &&
            calendarSquare.month === (new Date()).getMonth() &&
            calendarSquare.year === year
          ) {
            if (calendarSquare.appts.length !== 0) {
              return (
                <li
                  className="calendar__row--element-with-appts text-secondary"
                  key={uuid()}
                >
                  <div
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      alignSelf: "flex-end",
                    }}
                  >
                    {calendarSquare.num}
                  </div>
                  <br />
                  <div
                    className="calendar__row--appt text-secondary"
                  >
                    {calendarSquare.appts.map((appt) => {
                      return (
                        <div key={uuid()} className="calendar__appt">
                          <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            } else
              return (
                <li
                  key={uuid()}
                  className="h-full w-full flex items-start border border-black justify-end p-1 text-secondary"
                  style={{borderWidth: '0.5px'}}
                >
                  {calendarSquare.num}
                </li>
              );
          } else {
            if (calendarSquare.appts.length !== 0) {
              return (
                <li
                  key={uuid()}
                  className="calendar__row--element-with-appts"
                >
                  <div style={{ display: "block", alignSelf: "flex-end" }}>
                    {calendarSquare.num}
                  </div>
                  <br />
                  <div
                    className="calendar__row--appt text-secondary"
                  >
                    {calendarSquare.appts.map((appt) => {
                      return (
                        <div key={uuid()} className="calendar__appt">
                          <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            } else return (
              <li
                key={uuid()}
                className="h-full w-full flex items-start border border-black justify-end p-1 text-black"
                style={{borderWidth: '0.5px'}}
              >
                {calendarSquare.num}
              </li>
            );
          }
        })}
      </ul>
    </div>
  )
}