const getAppointmentsForDay = function(state, day) {
  let aptForDay = [];
  const { days, appointments } = state;
  let aptArr = [];
  days.forEach(elm => {
    if(elm.name === day){
        aptArr = [...elm.appointments]
    }
  });

  for (const appointment in appointments) {
    if(aptArr.includes(Number(appointment))){
      aptForDay.push(appointments[appointment]);
    }
  };
  return aptForDay;
};
const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  };
  let interviewerID = interview.interviewer
    return {
      student: interview.student,
      interviewer: state.interviewers[interviewerID]
    };


}
export {getAppointmentsForDay, getInterview}