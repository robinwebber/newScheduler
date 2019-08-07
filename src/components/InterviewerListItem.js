import React from "react";

import "components/InterviewerListItem.scss";

import classnames from 'classnames';

export default function InterviewierListItem(props) {

  const interviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item": true,
    "interviewers__item--selected": props.selected 
  });

  const interviewerImageClass = classnames("interviewers__item-image", {
    "interviewers__item-image": true,
    "interviewers__item--selected-image": props.selected
  });

  const isItSelected = props.selected ? props.name : null;

  // console.log(props);
  return (
    <li className={interviewerListItemClass} onClick={ props.setInterviewer } >
      <img
        className={interviewerImageClass} 
        src={props.avatar}
        alt={props.name}
      />
      {isItSelected}
</li>
  )
}