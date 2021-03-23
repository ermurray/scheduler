import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {



  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day});
  const cancelInterview = function(id, interview) {
    console.log(id)
    console.log(state.appointments[id].interview)
    const appointment = { 
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`api/appointments/${appointment.id}`, appointment)
    .then( (res) => {

      const status = res.status
      setState(prev =>({
        ...prev,
        appointments
      }));
      return status;
    })    
  }
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
  return axios.put(`api/appointments/${appointment.id}`, appointment).then((res) => {
    const status = res.status
      setState(prev => ({
        ...prev,
        appointments
      }));
      return status;
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ])
    .then((all) => {
      // console.log(all[0].data)
      // console.log(all[1].data)
      // console.log(all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      
    })
  }, []);

 return { state, setDay, bookInterview, cancelInterview}
}