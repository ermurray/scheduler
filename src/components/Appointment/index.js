import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from '../../hooks/useVisualMode';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "Saving";
const DELETE = "DELETE";
const DELETING = "Deleting";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
export default function Appointment(props) {
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    if (interview.student && interview.interviewer){
      transition(SAVING)
      props.bookInterview(props.id, interview).then((res) => {
      if( res === 204){
        transition(SHOW);
      }
    })
    .catch((error) =>{
      console.log(error);
      transition(ERROR_SAVE, true)

    });
    }
  };
  const deleteAppt = function(name, interviewer) {
      const interview = null
    transition(DELETING)
    props.cancelInterview(props.id, interview).then((res) =>{
      if(res === 204) {
        transition(EMPTY, true)
      }

    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
    });

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
       {mode ===SAVING && 
        <Status 
          message={SAVING}
        />}
        {mode === DELETING &&
          <Status 
            message={DELETING}
          />
        }
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={(SHOW)=> transition(DELETE)}
          onEdit={(SHOW) => transition(EDIT)}
        />
        )}
        {mode === EDIT && <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={(SHOW)=> back()}
          onSave={save}
        />}
        {mode === DELETE && 
        <Confirm 
          message={"Are you sure you would like to delete?"}
          onCancel={(CONFIRM) => back()}
          onConfirm={deleteAppt}
        />}
        {mode === ERROR_SAVE && 
        <Error
          onClose={(ERROR_SAVE)=> back()}
        />}
        {mode === ERROR_DELETE && 
        <Error
          onClose={(ERROR_DELETE)=> back()}
        />
        }
    </article>
    
  );
};
