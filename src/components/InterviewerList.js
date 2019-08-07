import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {

  console.log('------', props)
  const { interviewers } = props;
  // console.log('expect null', interviewers);
  const interviewerList = interviewers.map((mentor) =>
    < InterviewerListItem key={mentor.id} selected = { props.value === mentor.id } name = { mentor.name } avatar = { mentor.avatar } setInterviewer = {() => props.onChange(mentor.id)} />)

return (
  <section class="interviewers">
    <h4 class="interviewers__header text--light">Interviewer</h4>
    <ul class="interviewers__list"> {interviewerList} </ul>
  </section>
);
}