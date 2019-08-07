export default function getAppointmentsForDay(state, day) {

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

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  let interviewerId = interview.interviewer;

  let interviewObj = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interviewerId].id,
      name: state.interviewers[interviewerId].name,
      avatar: state.interviewers[interviewerId].avatar
    }
  }
  return interviewObj;

};