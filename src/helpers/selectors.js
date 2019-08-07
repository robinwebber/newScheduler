export function getAppointmentsForDay(state, day) {

  // get appointment numbers from the day property of state
  let daysAppointmentsArray = [];

  for (let daysObj of state.days) {
    if (daysObj.name === day) {
      daysAppointmentsArray = daysObj.appointments;
    }
  }

  // get the appoint objects from the state using the appointment numbers
  const appointmentsObjects = daysAppointmentsArray.map(app => state.appointments[app])

  return appointmentsObjects;

};