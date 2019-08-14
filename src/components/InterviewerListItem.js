import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames";

export default function InterviewierListItem(props) {
  //Styles interviewer items based on if selected
  const interviewerListItemClass = classnames("interviewers__item", {
    interviewers__item: true,
    "interviewers__item--selected": props.selected
  });
  //Styles interviewer avatar based on if selected
  const interviewerImageClass = classnames("interviewers__item-image", {
    "interviewers__item-image": true,
    "interviewers__item--selected-image": props.selected
  });
  //Displays name of interviewer if selected
  const showInterviewerName = props.selected ? props.name : null;

  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {showInterviewerName}
    </li>
  );
}
