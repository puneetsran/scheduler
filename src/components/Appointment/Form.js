import React, { useState } from "react";
import './styles.scss';
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function save(e) {
    setName(e.target.value);
    props.onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChangeInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
