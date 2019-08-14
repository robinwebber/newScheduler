import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers } = props;

  // generates the list of interviews for the day, 'mentor' was used in map function to reduce how many things are called interviewer
  const interviewerList = interviewers.map(mentor => (
    <InterviewerListItem
      key={mentor.id}
      selected={props.value === mentor.id}
      name={mentor.name}
      avatar={mentor.avatar}
      setInterviewer={() => props.onChange(mentor.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewerList} </ul>
    </section>
  );
}
