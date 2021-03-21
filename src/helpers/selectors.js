//selector for appointments by day
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
//selector for interview
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

//selector for interviewers

const getInterviewersForDay = function(state, day) {
  let interviewerForDay = [];
  const { days, interviewers } = state;
  let intArr = [];
  days.forEach(elm => {
    if(elm.name === day){
        intArr = [...elm.interviewers]
    }
  });

  for (const interviewer in interviewers) {
    if(intArr.includes(Number(interviewer))){
      interviewerForDay.push(interviewers[interviewer]);
    }
  };
  return interviewerForDay;

}


export {getAppointmentsForDay, getInterview, getInterviewersForDay}