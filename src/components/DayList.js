import React from "react";

import "components/DayListItem.scss";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days } = props;
  // Creates the daylist on the side bar
  const dayList = days.map(day => (
    <DayListItem
      key={Math.random() * 100}
      selected={day.name === props.day}
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayList}</ul>;
}
