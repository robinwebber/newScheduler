import { useEffect, useReducer } from "react";

const axios = require("axios");

export function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    const {
      day,
      days,
      appointments,
      interviewers,
      id,
      interview,
      dayFromForm
    } = action;
    // console.log("inside reducer", state);
    switch (action.type) {
      case SET_DAY:
        return { ...state, day };
      case SET_APPLICATION_DATA:
        return { ...state, days, appointments, interviewers };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: (interview && { ...interview }) || null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = state.days.map(dayObj => {
          if (dayObj.name === dayFromForm && interview) {
            return { ...dayObj, spots: dayObj.spots - 1 };
          } else if (dayObj.name === dayFromForm && action.interview === null) {
            return { ...dayObj, spots: dayObj.spots + 1 };
          } else {
            return { ...dayObj };
          }
        });
        return { ...state, appointments, days };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} // <--- this might be wrong
  });

  const setDay = day => dispatch({ type: SET_DAY, day });
  // const setDays = days => dispatch({ ...state, days });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers")
    ]).then(result => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: result[0].data,
        appointments: result[1].data,
        interviewers: result[2].data
      });
    });
  }, []);

  // const appointments = getAppointmentsForDay(state, state.day);
  // const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview, dayFromForm) {
    console.log("inside bookinterview", dayFromForm);

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
        dispatch({ type: SET_INTERVIEW, id, interview, dayFromForm })
      );
  }

  const removeInterview = (id, dayFromForm) => {
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
        dispatch({ type: SET_INTERVIEW, id, interview: null, dayFromForm })
      );
  };
  return { state, setDay, bookInterview, removeInterview };
}
