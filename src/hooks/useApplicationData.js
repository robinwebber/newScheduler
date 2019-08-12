import React, { useState, useEffect } from "react";

const axios = require("axios");

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} // <--- this might be wrong
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers")
    ]).then(result => {
      setState(prev => ({
        ...prev,
        days: result[0].data,
        appointments: result[1].data,
        interviewers: result[2].data
      }));
    });
  }, []);

  // const appointments = getAppointmentsForDay(state, state.day);
  // const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`http://localhost:3001/api/appointments/${id}`, appointment)
      .then(() =>
        setState(state => ({
          ...state,
          appointments
        }))
      );
  }

  const removeInterview = id => {
    // state.appointments[id].interview = null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() =>
        setState(state => ({
          ...state,
          appointments
        }))
      );
  };
  return { state, setDay, bookInterview, removeInterview };
}
