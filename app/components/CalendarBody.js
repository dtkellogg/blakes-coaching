import React from 'react'

// uuid
const { v4: uuid } = require("uuid");

function AMPMTime(time) {
  return useFormatAMPM(time);
}


export default function CalendarBody({calendarDays}) {
  // const { calendarDays } = useSelector((state) => state.calendarDays),
  //   calendarDate = useSelector((state) => state.calendarDate),
    // { date } = calendarDate;

  // const calendarDays = []
  const date = new Date()

  if(calendarDays) {
    const day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear()
        
    return (
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
              >
                {calendarSquare.num}
              </li>
            );
          }
        })}
      </ul>
    )
  } else return null
}