"use client"

import React, { useEffect, useState } from "react"
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Tooltip from './Tooltip';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const { v4: uuid } = require("uuid");

// function AMPMTime(time) {
//   return useFormatAMPM(time);
// }

// function useFormatAMPM(date) {
//   var hours = date.split(":")[0];
//   var minutes = date.split(":")[1];
//   var ampm = hours >= 12 ? "pm" : "am";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   var strTime = hours + ":" + minutes + ampm;

//   return strTime;
// }

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

export const makeCalendar = (date, actionItems) => {
  try {
    date = new Date(date)

    const month = date.getMonth(),
      year = date.getFullYear()
      // let appointments = []

    let daysInThisMonth = getDaysInMonth(month, year),
      daysInLastMonth = getDaysInMonth(month - 1, year),
      daysInLastMonthToShow = new Date(year, month, 1).getDay(),
      arrayDaysCurrentMonth = [],
      arrayDaysLastMonth = [],
      arrayDaysNextMonth = []

    // console.log(`daysInThisMonth: ${daysInThisMonth}, daysInLastMonth: ${daysInLastMonth}, daysInLastMonthToShow: ${daysInLastMonthToShow}`)
    
    for (let i = daysInLastMonth; i > daysInLastMonth - daysInLastMonthToShow; i--) {
      arrayDaysLastMonth.unshift({ num: i, month: months[month - 1], year: year, appts: [] })
    }
    for (let i = 1; i < 43 - (daysInThisMonth + daysInLastMonthToShow); i++) {
      arrayDaysNextMonth.push({ num: i, month: months[month + 1], year: year, appts: [] })
    }
    for (let i = 1; i < daysInThisMonth + 1; i++) {
      arrayDaysCurrentMonth.push({ num: i, month: months[month], year: year, appts: [] })
    }
    
    let arrayAllDays = [...arrayDaysLastMonth, ...arrayDaysCurrentMonth, ...arrayDaysNextMonth],
        allDaysWithAppts = []

    // console.log(actionItems)

    arrayAllDays.forEach((calDay) => {
      actionItems
        // .filter((item) => item.student === userInfo.name)
        .forEach((item) => {
          // console.log(`item`)
          // console.log(item)
          const itemDate = item.deadline.split("T")[0].split("-");
          const itemDay = parseInt(itemDate[2]);
          const itemMonth = months[itemDate[1] - 1];
          const itemYear = itemDate[0];

          // console.log(`itemYear: ${typeof itemYear}`)
          // console.log(`calDay.year: ${typeof calDay.year}`)
          // console.log(`itemYear === calDay.year: ${itemYear === calDay.year.toString()}`)

          if (itemDay === calDay.num && itemMonth === calDay.month && itemYear === calDay.year.toString()) {
            // console.log('calDay')
            // console.log(calDay)
            calDay.appts.push(item);
          }
        });
      allDaysWithAppts.push(calDay);
    })

    // console.log(arrayAllDays)

    return arrayAllDays
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
}


export default function Calendar({ actionItems }) {
  // const calendarDays = makeCalendar(new Date())
  
  const [calendarDays, setCalendarDays] = useState(makeCalendar(new Date(), actionItems))
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
  const handleReset = () => {
    handleChangeCalendarMonth('reset', date, month, year)
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
      } else if(type === 'reset'){
        newDate = new Date(new Date().getFullYear(), new Date().getMonth())
      }
      // console.log('Hello')
      // console.log(actionItems)
      setCalendarDays(makeCalendar(newDate, actionItems))
      setDate(newDate)
      setMonth(newDate.getMonth())
      setYear(newDate.getFullYear())
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    }
  }

  useEffect(() => {
    setCalendarDays(makeCalendar(date, actionItems))
  }, [actionItems])

  // console.log('CALENDAR DAYS')
  // console.log(calendarDays)

  return (
    <div className="overflow-hidden border border-black rounded-md mb-10">
      <div className="bg-white grid grid-cols-7 grid-rows-[3rem_2rem_repeat(6,_1fr)] text-black h-[45rem]">

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
          <div className="header__calendar relative flex">
            <span>{`${months[month]} ${year}`}</span>
            {(month !== new Date().getMonth() || year !== new Date().getFullYear()) && 
              <div className="translate-x-4">
                <Tooltip message={"Reset Calendar"}>
                  <button onClick={() => handleReset()} className="btn-primary-small">
                    Today
                  </button>
                </Tooltip>
              </div>
            }
          </div>
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

        <ul className="grid grid-cols-7 grid-rows-6 justify-center items-start col-span-full border-x-[1px] border-b-[1px] border-black" style={{gridRow: '3/-1'}}>
          {calendarDays.map((calendarSquare) => {
            if (calendarSquare.month !== months[month]) {
              if (calendarSquare.appts.length !== 0) {
                return (
                  <li
                    className="text-gray-500 h-full w-full flex items-start border border-black justify-start flex-col p-1"
                    style={{borderWidth: '0.5px'}}
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
                    <div
                      className="text-secondary"
                    >
                      {calendarSquare.appts.map((appt) => {
                        return (
                          <div key={uuid()}>
                            <span className="">{appt.title}</span>
                            {/* <span className="">{appt.title}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)}  */}
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
              calendarSquare.month === months[(new Date()).getMonth()] &&
              calendarSquare.year === year
            ) {
              if (calendarSquare.appts.length !== 0) {
                return (
                  <li
                    className="text-secondary h-full w-full flex items-start border border-black justify-start flex-col p-1"
                    style={{borderWidth: '0.5px'}}
                    key={uuid()}
                  >
                    <div className="ml-auto">
                      <Tooltip message={"Today"}>
                        <span className="p-1 text-white bg-secondary rounded-full px-2">
                          {calendarSquare.num}
                        </span>
                      </Tooltip>
                    </div>
                    {/* <div
                      className="p-1 text-white bg-secondary rounded-full px-2"
                      style={{
                        display: "block",
                        alignSelf: "flex-end",
                      }}
                    >
                      {calendarSquare.num}
                    </div> */}
                    <div
                      className="text-secondary overflow-scroll"
                    >
                      {calendarSquare.appts.map((appt, i) => {
                        return (
                          <div key={uuid()} className="">
                            <span className="line-clamp-1">{i+1}. {appt.title}</span>
                            {/* <span className="">{appt.title}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)}  */}
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
                    className="h-full w-full flex items-start border border-black justify-end p-1"
                    style={{borderWidth: '0.5px'}}
                  >
                    <Tooltip message={"Today"}>
                      {/* <span className="p-1 text-white bg-secondary rounded-full px-2"> */}
                      <span className="p-1 text-white bg-secondary rounded-full px-2">
                        {calendarSquare.num}
                      </span>
                    </Tooltip>
                  </li>
                );
            } else {
              if (calendarSquare.appts.length !== 0) {
                return (
                  <li
                    key={uuid()}
                    className="h-full w-full flex items-start border border-black justify-start flex-col p-1"
                    style={{borderWidth: '0.5px'}}
                  >
                    <div style={{ display: "block", alignSelf: "flex-end" }}>
                      {calendarSquare.num}
                    </div>
                    <div
                      className="text-secondary overflow-scroll"
                    >
                      {calendarSquare.appts.map((appt, i) => {
                        return (
                          <div key={uuid()} className="">
                            <span className="line-clamp-1 text-xs">{i+1}. {appt.title}</span>
                            {/* <span className="">{appt.title}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)}  */}
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
    </div>
  )
}