import './styles.scss';
import React from 'react';
import useVisualMode from "../../hooks/useVisualMode";

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

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
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={onCancel}
        />
      )}

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>

  );
}

