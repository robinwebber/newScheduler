import React from "react";

import "components/DayListItem.scss";

import classnames from 'classnames';

export default function DayListItem(props) {


  const noSpot = props.spots === 0 ? 'no spots remaining' : null;
  const oneSpot = props.spots === 1 ? '1 spot remaining' : null;
  const manySpots = props.spots ? `${props.spots} spots remaining` : null;

  const dayListItemClass = classnames("day-list__item", {
    "day-list__item": true,
    "day-list__item--selected": props.selected, // find out
    "day-list__item--full": props.spots === 0 // copied from hans
  });

  return (
    <li className={dayListItemClass} onClick={() =>props.setDay(props.name)}>
      <h1>{props.name}</h1>
      <h2>{ noSpot || oneSpot || manySpots }</h2>
    </li>
  );
}