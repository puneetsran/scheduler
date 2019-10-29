export function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  if (filteredDays.length === 0) return [];
  return filteredDays[0].appointments.map(appointment => state.appointments[appointment]);
}