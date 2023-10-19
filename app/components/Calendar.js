"use client"

import React, { useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux";

// prop-types
import PropTypes from "prop-types";

// components
import CalendarBody from "./CalendarBody";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import CalendarHeader from './CalendarHeader'

// actions
// import { listAppointments } from "../../actions/appointmentActions"
// import { subheader } from "../../actions/subheader"
// import { setCalendarDays } from "../../actions/calendarActions";
// import { SET_CALENDAR_DATE_RESET } from "../../constants/calendarConstants";


export default function Calendar({ type }) {
  // const dispatch = useDispatch()

  // const appointmentList= useSelector((state) => state.appointmentList);
  // const { appointments, loading, error, success } = appointmentList;

  // useEffect(() => {
  //   if(!appointments) {
  //     dispatch(subheader("Loading..."))
  //     dispatch(listAppointments())
  //     dispatch(setCalendarDays(new Date()))
  //   } else {
  //     dispatch(subheader(""))
  //   }

  //   return () => {
  //     dispatch({type: SET_CALENDAR_DATE_RESET})
  //   }
  // }, [appointments, loading, success, error])

  return (
    <div className={type === "home" ? "container__calendar--home" : "container__screen--sidebar"}>
      <div className="container__calendar">
        <CalendarHeader />
        <CalendarDaysOfWeek />
        <CalendarBody />
      </div>
    </div>
  )
}

Calendar.propTypes = {
  type: PropTypes.string
}