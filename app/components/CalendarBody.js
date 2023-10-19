import React from 'react'
// import { useSelector } from "react-redux";

// hooks
// import useFormatAMPM from "../../hooks/useFormatAMPM";

// uuid
// const { v4: uuid } = require("uuid");


function AMPMTime(time) {
  return useFormatAMPM(time);
}


export default function CalendarBody() {
  // const { calendarDays } = useSelector((state) => state.calendarDays),
  //   calendarDate = useSelector((state) => state.calendarDate),
    // { date } = calendarDate;

  if(calendarDays) {
    const day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear()
        
    return (
      <ul className="calendar__row--numDays">
        {calendarDays.map((calendarSquare) => {
          if (calendarSquare.month !== month) {
            if (calendarSquare.appts.length !== 0) {
              return (
                <li
                  className="calendar__row--element-with-appts"
                  style={{ color: "var(grey-5)" }}
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
                    className="calendar__row--appt"
                    style={{
                      color: "var(--old-blue-2)",
                    }}
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
                  className="calendar__row--element"
                  style={{ color: "var(--grey-5)" }}
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
                  className="calendar__row--element-with-appts"
                  style={{ color: "var(--old-blue-2)" }}
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
                    className="calendar__row--appt"
                    style={{
                      color: "var(--old-blue-2)",
                    }}
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
                  className="calendar__row--element"
                  style={{ color: "var(--old-blue-2)" }}
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
                    className="calendar__row--appt"
                    style={{
                      color: "var(--old-blue-2)",
                    }}
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
                className="calendar__row--element"
                style={{ color: "var(--black)" }}
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