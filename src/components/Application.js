import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from 'components/Appointment/';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors';

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day});
  // const setDays = (days) => setState(prev => ({...prev, days});
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
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const listAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview} 
      cancelInterview={cancelInterview}
      
      />
    )
  });
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
  }, [])
  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {listAppointments}
          <Appointment key="last" time="5pm"/>
        </ul>
      </section>
    </main>
  );
}
