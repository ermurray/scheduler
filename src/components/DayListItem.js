import React from "react";
import classNames from 'classnames/bind';
import "components/DayListItem.scss"

export default function DayListItem(props) {
  const formatSpots = function(props) {
    if(props === 1){
      return `${props} spot remaining`;
    }
    if (props === 0) {
      return `no spots remaining`;
    }
    return `${props} spots remaining` 
  }
  const dayClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
