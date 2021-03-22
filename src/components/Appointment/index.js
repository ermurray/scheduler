import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
export default function Appointment(props) {
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    if (interview.student && interview.interviewer){
      transition(SAVE)
      props.bookInterview(props.id, interview).then((res,error) => {console.log(res);
      if( res === 204){
        transition(SHOW);
      }
    });
    }
  };
  const deleteAppt = function() {
    console.log('attempting to delete')
  }
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
       {mode ===SAVE && <Status />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppt}
        />
      )}
    </article>
    
  );
};
