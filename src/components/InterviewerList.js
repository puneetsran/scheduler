import React from "react";
import InterviewerListItem from './InterviewerListItem.js';
import 'components/InterviewerList.scss';
// import classnames from 'classnames';

export default function InterviewerList(props) {
  const interviewerListItems = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.name === props.interviewer}
        setInterviewer={props.setInterviewer(interviewer.id)}
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
