import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment(props) {
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
  };
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={(EMPTY) => transition(CREATE)}/>}
       {mode === CREATE && <Form
          interviewers={props.interviewers}
          onCancel={(CREATE) => back()}
          onSave={save}
       />} 
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
    
  );
};
