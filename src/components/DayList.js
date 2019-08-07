import React from "react";

import "components/DayListItem.scss";

import DayListItem from './DayListItem';

export default function DayList(props) {

  const { days } = props;
  const dayList = days.map((day) =>
    < DayListItem selected={day.name === props.day} name={day.name} spots={day.spots} setDay={props.setDay} />
  )

  return (
    <ul>
      {dayList}
    </ul>
  );
}