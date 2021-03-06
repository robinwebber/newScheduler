import React from "react";
import { useApplicationData } from "hooks/useApplicationData";

import "components/Application.scss";
import Appointment from "components/Appointment/index";
import DayList from "./DayList";
import getAppointmentsForDay, {
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

export default function Application(props) {
  //destructing helper functions from custom useApplicationData hook
  const {
    state,
    setDay,
    bookInterview,
    removeInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  //Creates the listItems for rendering
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        removeInterview={removeInterview}
        day={state.day}
        // spots={state.days.spots}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList days={state.days} day={state.day} setDay={setDay} />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
