import { useEffect, useReducer } from "react";
import axios from "axios";

export function useApplicationData() {
  //Actions for updating state in reducer dispatch
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
    switch (action.type) {
      // State updating through a switch - no breaks are used as return statements kill the switch- {} are used to scope each block and keep variable names local
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
        // I have piggy-backed on the state being updated here to update spots remaining- dayFromForm refers to state.day being passed up from the 'Form' and 'Confirm' components the const edit is how I validate that the form is being edited rather than creating a new interview to prevent the spots remaining for being updated on an edit
        const days = state.days.map(dayObj => {
          const edit = state.appointments[id].interview;

          if (dayObj.name === dayFromForm && !edit) {
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
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  // All axios calls to set initial state
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

  // Books an interview and makes the axios call to update the db
  function bookInterview(id, interview, dayFromForm) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios
      .put(`http://localhost:3001/api/appointments/${id}`, appointment)
      .then(() =>
        dispatch({ type: SET_INTERVIEW, id, interview, dayFromForm })
      );
  }
  // deletes an interview and makes axios request to update db
  const removeInterview = (id, dayFromForm) => {
    return axios
      .delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() =>
        dispatch({ type: SET_INTERVIEW, id, interview: null, dayFromForm })
      );
  };
  return { state, setDay, bookInterview, removeInterview };
}
