import './styles.scss';
import React from 'react';
import useVisualMode from "../../hooks/useVisualMode";

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Saving from './Saving.js';
import Confirm from './Confirm.js';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function onAdd() {
    transition(CREATE);
  }

  function onCancel() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function cancelInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETE);

    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onCancel={onCancel}
          onConfirm={cancelInterview}
        />)}

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SAVING && <Saving message={"Saving"} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          on
        />
      )}
    </article>

  );
}


// message={"Are you sure you want to delete?"}
// onCancel={onCancel}
// onConfirm={deleteInterview}