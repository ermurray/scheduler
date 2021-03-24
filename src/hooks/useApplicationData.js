import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
    // const updateSpots = function(day, days, appointments){
    //   console.log("inside updateSpots",appointments)
    //   const selectedDay = days.find(elm => elm.name === day )
    //   const apptArrByDay = selectedDay.appointments
    //   const apptsAvailable = apptArrByDay.map(id => appointments[id].interview).filter(elm => elm ===null)
    //   console.log('appointments available ', apptsAvailable)
    //   const currentSpots =  apptsAvailable.length
    //     return currentSpots;
    // };
    const updateSpots = function(spot) {
      const selectedDay = state.days.find(day => day.name === state.day);
      const dayID = selectedDay.id;
      const updateDays = [...state.days];
      updateDays.forEach(day => day.id === dayID ? day.spots += spot : day);
      return updateDays;
    };

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day});
  const cancelInterview = function(id, interview) {
    const appointment = { 
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = updateSpots(1)
    
    return axios.delete(`api/appointments/${appointment.id}`, appointment)
    .then( (res) => {
      
      const status = res.status
      setState(prev =>({
        ...prev,
        appointments,
        days
      }));
      return status;
    })    
  }
  const bookInterview = function(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = mode === "EDIT"? updateSpots(0) : updateSpots(-1)
    return axios.put(`api/appointments/${appointment.id}`, appointment).then((res) => {
      const status = res.status
      setState(prev => ({
        ...prev,
        appointments,
        days
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