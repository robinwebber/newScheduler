import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from 'components/Appointment/index'
import DayList from "./DayList";
import getAppointmentsForDay from "helpers/selectors";

const axios = require('axios');



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//   id: 3,
//   time: "2pm",
//   interview: {
//     student: "Billy Bill-Bob",
//     interviewer: {
//       id: 2,
//       name: "Serge Gainsbourgh",
//       avatar: "https://i.imgur.com/twYrpay.jpg",
//     }
//   }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Lucy Lamour",
//       interviewer: {
//         id: 3,
//         name: "Brigitte Bardot",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//     }
// ];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: null // <--- this might be wrong
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });


  useEffect(() => {

    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers")      
    ]).then((result) => {
      setState(prev => ({...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data}))
    })
  }, []);

  console.log('interviewers', state.interviewers);

  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentMaker =  appointments.map((appointment) => <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />)
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentMaker}
      </section>
    </main>
  );
}

