import React from "react";
import "components/DayListItem.scss";
// const classNames = require('classnames');
import classnames from "classnames";

const formatSpots = function(spots) {
  if (spots > 1) {
    return `${spots} spots remaining`;
  } else if (spots === 1) {
    return `${spots} spot remaining`;
  } else {
    return `no spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}
