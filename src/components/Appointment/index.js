import './styles.scss';
import React from 'react';
import useVisualMode from "../../hooks/useVisualMode";

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";

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

  function edit() {
    transition(EDIT);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log('testing hugjfhjgfjh', interview);
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

  // if (SHOW) console.log('HERE!!!', props.interview);

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
          onCancel={onCancel} // back
          onConfirm={cancelInterview}
        />)}

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          onChangeInterviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={onCancel}
        />)}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
    </article>
  );
}