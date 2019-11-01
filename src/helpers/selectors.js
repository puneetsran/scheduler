export function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  if (filteredDays.length === 0) return [];
  return filteredDays[0].appointments.map(
    appointment => state.appointments[appointment]
  );
}

export function getInterview(state, interview) {
  if (interview)
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  return null;
}

export function getInterviewersForDay(state, name) {
  const found = state.days.filter(day => day.name === name);
  if (found.length === 0 || found === undefined) return [];
  return found[0].interviewers.map(id => state.interviewers[id]);
}
