import React from "react";
import InterviewerListItem from './InterviewerListItem.js';
import 'components/InterviewerList.scss';
// import classnames from 'classnames';

export default function InterviewerList({ onChangeInterviewer, value, interviewers }) {
  const interviewerListItems = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value} // interviewer.name??
        setInterviewer={event => onChangeInterviewer(interviewer.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}