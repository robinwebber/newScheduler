import React from "react";

import "components/DayListItem.scss";

import classnames from "classnames";

export default function DayListItem(props) {
  // Message for day indicating how many spots remain
  const noSpot = props.spots === 0 ? "no spots remaining" : null;
  const oneSpot = props.spots === 1 ? "1 spot remaining" : null;
  const manySpots = props.spots ? `${props.spots} spots remaining` : null;

  // Applies the proper styling to the day depending on how many spots remain
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h1>{props.name}</h1>
      <h2>{noSpot || oneSpot || manySpots}</h2>
    </li>
  );
}
