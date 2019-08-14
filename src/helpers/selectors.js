// Selects the correct appointments from database according to the day ("Monday", "Tuesday", etc.)
export default function getAppointmentsForDay(state, day) {
  let daysAppointmentsArray = [];

  for (let daysObj of state.days) {
    if (daysObj.name === day) {
      daysAppointmentsArray = daysObj.appointments;
    }
  }

  const appointmentsObjects = daysAppointmentsArray.map(
    app => state.appointments[app]
  );

  return appointmentsObjects;
}
// Populates the correct interview for the time-slot
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
  };
  return interviewObj;
}
// Selects the correct interviewers from database according to the day ("Monday", "Tuesday", etc.)
export function getInterviewersForDay(state, day) {
  let daysInterviewersArray = [];

  for (let daysObj of state.days) {
    if (daysObj.name === day) {
      daysInterviewersArray = daysObj.interviewers;
    }
  }

  const interviewersObjects = daysInterviewersArray.map(
    app => state.interviewers[app]
  );

  return interviewersObjects;
}
